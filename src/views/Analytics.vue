<template>
  <v-row>
    <v-col cols="4"><Nav /></v-col>
    <v-col cols="8">
      <v-container>
        <v-row>
          <v-col>
            <h2>Total locations: {{ totalLocations }}</h2>
          </v-col>
          <v-col>
            <h2>Total locations infected: {{ totalInfectedLocations }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Total people: {{ totalPeople }}</h2>
          </v-col>
          <v-col>
            <h2>Total people infected: {{ totalInfectedPeople }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>People infection ratio: {{ infectPeopleRatio }}%</h2>
          </v-col>
          <v-col>
            <h2>Location infection ratio: {{ infectLocationRatio }}%</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h2>Day: {{ this.$store.state.days }}</h2>
          </v-col>
          <v-col>
            <h2></h2>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import Nav from "../components/NavDrawer";
import axios from "axios";
export default {
  name: "Analytics",

  components: { Nav },

  data() {
    return {
      totalLocations: 0,
      totalInfectedLocations: 0,
      totalPeople: 0,
      totalInfectedPeople: 0,
    };
  },

  computed: {
    infectPeopleRatio: function() {
      return Math.floor((this.totalInfectedPeople / this.totalPeople) * 100);
    },
    infectLocationRatio: function() {
      return Math.floor(
        (this.totalInfectedLocations / this.totalLocations) * 100
      );
    },
  },

  async beforeMount() {
    try {
      await this.getTotalLocations();
      await this.getTotalInfectedLocations();
      await this.getTotalPeople();
      await this.getTotalInfectedPeople();
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async getTotalLocations() {
      this.totalLocations = (
        await axios({
          method: "get",
          url: "http://localhost:4000/location",
          headers: {},
        })
      ).data.total;
    },
    async getTotalInfectedLocations() {
      this.totalInfectedLocations = (
        await axios({
          method: "get",
          url: "http://localhost:4000/location/infected",
          headers: {},
        })
      ).data.total;
    },
    async getTotalPeople() {
      this.totalPeople = (
        await axios({
          method: "get",
          url: "http://localhost:4000/person",
          headers: {},
        })
      ).data.total;
    },
    async getTotalInfectedPeople() {
      this.totalInfectedPeople = (
        await axios({
          method: "get",
          url: "http://localhost:4000/person/infected",
          headers: {},
        })
      ).data.total;
    },
  },
};
</script>

<style></style>
