import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Simulation from "../views/Simulation.vue";
import Analytics from "../views/Analytics.vue";
import Data from "../views/Data.vue";
import Person from "../views/Person.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/simulation",
    name: "Simulation",
    component: Simulation,
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
  },
  {
    path: "/data",
    name: "Data",
    component: Data,
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
