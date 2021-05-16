<template>
  <v-container>
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
};
</script>

<style>
</style>