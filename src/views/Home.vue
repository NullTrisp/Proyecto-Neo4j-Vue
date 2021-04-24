<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  beforeMount() {
    axios
      .get("http://localhost:4000/location/infected")
      .then((res) => {
        console.log(res.data.records);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>
