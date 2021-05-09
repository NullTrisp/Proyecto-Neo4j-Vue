<template>
  <v-row>
    <v-col cols="2"><Nav /></v-col>
    <v-col cols="8"><Form id="form" /></v-col>
    <v-col cols="2">oli</v-col>
  </v-row>
</template>

<script>
import Nav from "../components/NavDrawer";
import Form from "../components/SimulationForm";

export default {
  components: {
    Form,
    Nav,
  },
};
</script>

<style scoped>
#form {
  margin-top: 8em;
  margin-left: 20em;
}
</style>
