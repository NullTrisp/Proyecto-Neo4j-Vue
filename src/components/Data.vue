<template>
  <v-container style="width: 100em; padding-right: 20em">
    <v-btn @click="toggle = !toggle"> Change table </v-btn>
    <People v-if="toggle" />
    <Locations v-if="!toggle" />
  </v-container>
</template>

<script>
import People from "./People";
import Locations from "./Locations";
export default {
  components: {
    People,
    Locations,
  },
  data() {
    return {
      toggle: true,
    };
  },
};
</script>

<style>
</style>