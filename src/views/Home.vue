<template>
  <D3Network :net-nodes="nodes" :net-links="links" :options="options" />
</template>

<script>
import D3Network from "vue-d3-network";
import axios from "axios";
export default {
  name: "Home",

  components: {
    D3Network,
  },

  data() {
    return {
      nodes: [],
      links: [],
      options: {
        force: 10,
        nodeSize: 4,
        // nodeLabels: true,
        linkWidth: 0.5,
      },
    };
  },

  async beforeMount() {
    try {
      const data = (
        await axios({
          method: "get",
          url: "http://localhost:4000/person/related",
          headers: {},
        })
      ).data;

      this.nodes = data.startNodes.splice(0, 4000).map((el) => {
        return el.infected
          ? { id: el.dni, name: el.name + el.last_name, _color: "red" }
          : { id: el.dni, name: el.name + el.last_name, _color: "green" };
      });
      data.endNodes.splice(0, 4000).forEach((el) => {
        this.nodes.push(
          el.infected
            ? { id: el.dni, name: el.name + el.last_name, _color: "red" }
            : { id: el.dni, name: el.name + el.last_name, _color: "green" }
        );
      });

      this.links = data.relations.splice(0, 8000).map((el) => {
        return { sid: el.start, tid: el.end, _color: "red" };
      });
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
