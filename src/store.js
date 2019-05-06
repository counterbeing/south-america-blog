import Vue from 'vue'
import Vuex from 'vuex'
import Destinations from './data/destinations.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    destinations: Destinations,
    current: Destinations[Destinations.length - 1],
    destination: {},
  },
  mutations: {
    SET_DESTINATION(state, destination) {
      state.destination = destination
    },
  },
  actions: {
    async getDestination({ commit, state }) {
      const response = await fetch(
        '/destinations/' + state.current.id + '.json'
      )
      // console.log(response.json())
      commit('SET_DESTINATION', await response.json())
    },
    setDestination: (context, payload) =>
      context.commit('SET_CURRENT', payload),
  },
  // getters: {
  //   destination: state => state.destinations[0]
  // }
})
