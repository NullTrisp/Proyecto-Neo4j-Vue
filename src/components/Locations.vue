<template>
  <v-container>
    <h1>Locations</h1>
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
          text: "Zip code",
          align: "start",
          value: "zip_code",
        },
        { text: "Name", value: "name" },
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
          url: "http://localhost:4000/location",
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