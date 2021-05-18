<template>
  <v-navigation-drawer absolute permanent right>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title" style="padding: 2em 1em 2em 1em">
          Covid 19 Simulation
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        style="cursor: pointer"
        @click="$router.push(item.route)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "Simulation", icon: "mdi-gamepad", route: "/simulation" },
      { title: "analytics", icon: "mdi-chart-donut", route: "/analytics" },
      { title: "data", icon: "mdi-list", route: "/data" },
    ],
  }),
};
</script>
