<template>
  <div id="sigmacontainer"></div>
</template>

<script>
import sigma from "sigma";
export default {
  name: "Graph",

  props: ["graph"],

  data() {
    return {
      canvas: {},
    };
  },

  mounted() {
    this.canvas = new sigma({
      renderer: {
        container: document.getElementById("sigmacontainer"),
        type: "canvas",
      },
      settings: {
        minEdgeSize: 0.1,
        maxEdgeSize: 2,
        minNodeSize: 1,
        maxNodeSize: 8,
      },
    });

    this.canvas.graph.read(this.graph);
    this.canvas.refresh();
  },
};
</script>

<style scoped>
#sigma-container {
  width: 100%;
  height: 100%;
}
</style>