<template>
  <v-navigation-drawer permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          <h3>Covid 19 simulation</h3>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :href="item.route"
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
      { title: "Simulation", icon: "mdi-form", route: "/simulation" },
      { title: "Analitics", icon: "mdi-form", route: "/simulation" },
    ],
  }),
};
</script>
