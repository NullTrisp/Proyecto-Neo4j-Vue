<template>
  <v-container>
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
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
      this.items = await (
        await axios({
          method: "get",
          url: "http://localhost:4000/person",
          headers: {},
        })
      ).data.records;
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    handleClick(row) {
      this.$store.commit("setPerson", row.dni);
      this.$router.push("/person");
    },
  },
};
</script>

<style>
</style>