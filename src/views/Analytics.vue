<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "Analytics",

  data() {
    return {
      totalLocations: 0,
      totalInfectedLocations: 0,
      totalPeople: 0,
      totalInfectedPeople: 0,
      data: [],
    };
  },

  computed: {
    infectPeopleRatio: function () {
      return Math.floor((this.totalInfectedPeople / this.totalPeople) * 100);
    },
    infectLocationRatio: function () {
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
      await this.getData();
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async getData() {
      this.data = (
        await axios({
          method: "get",
          url: "http://localhost:4000/analytics",
          headers: {},
        })
      ).data.records.map((el) => {
        return {
          day: el.day.low,
          infected_locations: el.infected_locations,
          infected_locations_num: el.infected_locations_num.low,
          infected_people: el.infected_people,
          infected_people_num: el.infected_people_num.low,
        };
      });
    },
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
