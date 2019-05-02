import Vue from "vue";
import Vuex from "vuex";
import Destinations from "./data/destinations.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDestination: Destinations[Destinations.length - 1]
  },
  mutations: {
    setDestination(state, destination) {
      state.currentDestination = destination;
    }
  },
  actions: {
    setDestination: (context, payload) =>
      context.commit("setDestination", payload)
  },
  getters: {
    destination: state =>
      Destinations.find(s => state.currentDestination === s.id)
  }
});
