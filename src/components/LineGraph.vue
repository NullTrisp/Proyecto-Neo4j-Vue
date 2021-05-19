<template>
  <fusioncharts
    :type="type"
    :width="width"
    :height="height"
    :dataFormat="dataFormat"
    :dataSource="dataSource"
  ></fusioncharts>
</template>

<script>
export default {
  props: {
    caption: String,
    yaxisname: String,
  },
  data: () => ({
    type: "spline",
    width: "70%",
    height: "80%",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "",
        yaxisname: "",
        anchorradius: "5",
        plottooltext: "Infected people on $label is <b>$dataValue</b>",
        showhovereffect: "1",
        showvalues: "0",
        numbersuffix: "",
        theme: "fusion",
        anchorbgcolor: "#72D7B2",
        palettecolors: "#72D7B2",
      },
      data: [],
    },
  }),

  mounted() {
    this.dataSource.chart.caption = this.caption;
    this.dataSource.chart.yaxisname = this.yaxisname;
    this.dataSource.data = this.$store.state.graphData;
  },

  updated() {
    this.dataSource.data = this.$store.state.graphData;
  },
};
</script>

<style></style>
