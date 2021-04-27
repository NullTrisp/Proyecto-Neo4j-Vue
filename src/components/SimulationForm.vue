<template>
  <v-form>
    <v-slider
      step="25"
      v-model="rangeValue"
      :label="rangeInput.label"
      :thumb-color="rangeInput.color"
      :min="min"
      :max="max"
      thumb-label="always"
    >
      <template v-slot:append>
        <v-text-field
          v-model="rangeValue"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-slider>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      rangeInput: {
        label: "Number of init infected people",
        color: "red",
      },
      rangeValue: 0,
      min: 0,
      max: 1000,
    };
  },
};
</script>