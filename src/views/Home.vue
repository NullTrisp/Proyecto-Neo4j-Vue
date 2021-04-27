<template>
  <div>
    <Graph :graph="graph" />
  </div>
</template>

<script>
import axios from "axios";
import Graph from "../components/Graph";

export default {
  name: "Home",

  components: { Graph },

  data() {
    return {
      canvas: null,
      graph: {
        nodes: [
          // { id: "n0", label: "A node", x: 0, y: 0, size: 3, color: "#008cc2" },
          // {
          //   id: "n1",
          //   label: "Another node",
          //   x: 3,
          //   y: 1,
          //   size: 2,
          //   color: "#008cc2",
          // },
          // {
          //   id: "n2",
          //   label: "And a last one",
          //   x: 1,
          //   y: 3,
          //   size: 1,
          //   color: "#E57821",
          // },
        ],
        edges: [
          // {
          //   id: "e0",
          //   source: "n0",
          //   target: "n1",
          //   color: "#282c34",
          //   type: "line",
          //   size: 0.5,
          // },
          // {
          //   id: "e1",
          //   source: "n1",
          //   target: "n2",
          //   color: "#282c34",
          //   type: "curve",
          //   size: 1,
          // },
          // {
          //   id: "e2",
          //   source: "n2",
          //   target: "n0",
          //   color: "#FF0000",
          //   type: "line",
          //   size: 2,
          // },
        ],
      },
    };
  },

  beforeCreate() {
    axios
      .get("http://localhost:4000/person/infected")
      .then((res) => {
        let count = 0;
        const aux = res.data.records.map((el) => {
          return {
            id: count++,
            label: el._fields[0].properties.name,
            size: 3,
            color: "#E57821",
            x: 0,
            y: 0,
          };
        });
        this.$store.commit("updateGraph", aux);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>