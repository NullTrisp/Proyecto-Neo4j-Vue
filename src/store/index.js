import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    graph: {
      nodes: [],
      edges: [],
    },
  },

  mutations: {
    updateGraph(state, payload) {
      state.graph.nodes = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
