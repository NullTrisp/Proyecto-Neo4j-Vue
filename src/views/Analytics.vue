<template>
  <LineChart
    caption="Infected per day"
    yaxisname="Infected in day"
    style="margin-top: 4em"
  />
</template>

<script>
import LineChart from "@/components/LineGraph.vue";
export default {
  name: "Analytics",

  components: {
    LineChart,
  },
};
</script>

<style></style>
