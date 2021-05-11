import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    days: 0,
    init: false,
  },

  mutations: {
    updateDays(state) {
      state.days += 1;
    },
    resetDays(state) {
      state.days = 0;
    },
    changeInit(state, payload) {
      state.init = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
