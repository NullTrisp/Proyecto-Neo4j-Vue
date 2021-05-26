<template>
  <D3Network
    :net-nodes="nodes"
    :net-links="links"
    :options="options"
    style="padding-top: 4em; padding-right: -2em"
    v-on:node-click="setPerson"
  />
</template>

<script>
import D3Network from "vue-d3-network";
import axios from "axios";
export default {
  name: "Graph",

  components: {
    D3Network,
  },

  data() {
    return {
      nodes: [],
      links: [],
      options: {
        force: 100,
        nodeSize: 10,
        linkWidth: 1,
        canvas: false,
      },
    };
  },

  async beforeMount() {
    try {
      const data = (
        await axios({
          method: "get",
          url: "http://localhost:4000/person/related",
          headers: {},
        })
      ).data;

      this.nodes = data.startNodes.map((el) => {
        return el.infected
          ? { id: el.dni, name: el.name + el.last_name, _color: "red" }
          : { id: el.dni, name: el.name + el.last_name, _color: "green" };
      });
      data.endNodes.forEach((el) => {
        this.nodes.push(
          el.infected
            ? { id: el.dni, name: el.name + el.last_name, _color: "red" }
            : { id: el.dni, name: el.name + el.last_name, _color: "green" }
        );
      });

      this.links = data.relations.map((el) => {
        return { sid: el.start, tid: el.end, _color: "red" };
      });
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    setPerson(_payload, node) {
      this.$store.commit("setPerson", {
        dni: node.id,
        name: node.name.split(" ")[0],
        last_name: node.name.split(" ")[1],
      });
      this.$router.push("/person");
    },
  },
};
</script>
