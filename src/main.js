import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VueFusionCharts from "vue-fusioncharts";
import FusionCharts from "fusioncharts";

Vue.config.productionTip = false;

Vue.use(VueFusionCharts, FusionCharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
