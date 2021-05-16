<template>
  <div>
    <People v-if="toggle" />
    <Locations v-if="!toggle" />
  </div>
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