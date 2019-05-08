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
    SET_CURRENT(state, current) {
      state.current = current
    },

    SET_DESTINATION(state, destination) {
      state.destination = destination
    },
  },
  actions: {
    async getDestination({ commit, state }) {
      const response = await fetch(
        '/destinations/' + state.current.id + '.json'
      )
      commit('SET_DESTINATION', await response.json())
    },
    setCurrent: (context, payload) => {
      const current = context.state.destinations.find(dest => {
        return dest.id === payload
      })
      context.commit('SET_CURRENT', current)
      context.dispatch('getDestination')
    },
  },
  getters: {},
})
