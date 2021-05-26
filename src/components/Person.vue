<template>
  <v-container>
    <v-container style="padding-left: 20em; padding-top: 10em" v-if="!find">
      <v-card width="30em">
        <v-card-title>Dni: {{ this.$store.state.person.dni }}</v-card-title>
        <v-card-text> Name: {{ this.$store.state.person.name }} </v-card-text>
        <v-card-actions>
          <v-btn @click="find = !find">Find shortest path</v-btn>
        </v-card-actions>
      </v-card>

      <D3Network
        :net-nodes="nodes"
        :net-links="links"
        :options="options"
        v-on:node-click="setPerson"
      />
    </v-container>

    <v-container v-if="find" style="width: 100em; padding-right: 20em">
      <h1>People</h1>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
        @click:row="handleClick"
      ></v-data-table>
      <v-btn
        @click="
          find = !find;
          loadNodes();
        "
        >Cancel</v-btn
      >
      <D3Network :net-nodes="nodes" :net-links="links" :options="options" />
    </v-container>
  </v-container>
</template>

<script>
import D3Network from "vue-d3-network";
import axios from "axios";
export default {
  components: {
    D3Network,
  },
  data() {
    return {
      nodes: [],
      links: [],
      options: {
        nodeLabels: true,
        force: 1000,
        nodeSize: 20,
        linkWidth: 1,
        canvas: false,
      },
      find: false,
      search: "",
      headers: [
        {
          text: "DNI",
          align: "start",
          value: "dni",
        },
        { text: "Name", value: "name" },
        { text: "Last name", value: "last_name" },
        { text: "Infected", value: "infected" },
      ],
      items: [],
    };
  },

  async beforeMount() {
    try {
      await this.loadNodes();
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async setPerson(_payload, node) {
      this.$store.commit("setPerson", {
        dni: node.id,
        name: node.name.split(" ")[0],
        last_name: node.name.split(" ")[1],
      });
      await this.loadNodes();
    },
    async loadNodes() {
      this.nodes = (
        await axios({
          method: "get",
          url: `http://localhost:4000/person/related/${this.$store.state.person.dni}`,
          headers: {},
        })
      ).data.records.map((el) => {
        return el.infected
          ? { id: el.dni, name: el.name + " " + el.last_name, _color: "red" }
          : { id: el.dni, name: el.name + " " + el.last_name, _color: "green" };
      });
      this.items = await (
        await axios({
          method: "get",
          url: "http://localhost:4000/person",
          headers: {},
        })
      ).data.records;

      this.links = [];
    },
    async handleClick(row) {
      try {
        const res = (
          await axios({
            method: "post",
            url: "http://localhost:4000/person/shortestpath",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              init: this.$store.state.person.dni,
              end: row.dni,
            },
          })
        ).data;
        this.nodes = res.path.segments.map((el) => {
          return el.start.infected
            ? { id: el.start.dni, name: el.start.dni, _color: "red" }
            : { id: el.start.dni, name: el.start.dni, _color: "green" };
        });
        this.nodes.push(
          res.path.end.infected
            ? { id: res.path.end.dni, name: res.path.end.dni, _color: "red" }
            : {
                id: res.path.end.dni,
                name: res.path.end.dni,
                _color: "green",
              }
        );
        this.links = res.path.segments.map((el) => {
          return {
            sid: el.start.dni,
            tid: el.end.dni,
            _color: "red",
          };
        });
      } catch (err) {
        alert("There is no path to this person");
        console.error(err);
      }
    },
  },
};
</script>

<style>
tr {
  cursor: pointer;
}
</style>
