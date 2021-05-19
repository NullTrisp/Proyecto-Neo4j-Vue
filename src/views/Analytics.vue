<template>
  <LineChart
    caption="Infected per day"
    yaxisname="Infected in day"
    :data="data"
  />
</template>

<script>
import axios from "axios";
import LineChart from "@/components/LineGraph.vue";
export default {
  name: "Analytics",

  components: {
    LineChart,
  },

  data() {
    return {
      data: [],
    };
  },

  async beforeMount() {
    try {
      const res = (
        await axios({
          method: "get",
          url: "http://localhost:4000/analytics",
          headers: {},
        })
      ).data.records;

      this.data = res.map((el) => {
        return {
          label: "day " + el.day.low,
          value: el.infected_people_num.low,
        };
      });
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style></style>
