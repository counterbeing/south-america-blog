import Vue from 'vue'
import Vuex from 'vuex'
import Destinations from './data/destinations.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    destinations: Destinations,
    current: {},
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
      const jsonPath = 'destinations/' + state.current.id + '.json'
      const u = process.env.BASE_URL + jsonPath
      const response = await fetch(u)
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
  getters: {
    next(state) {
      if (!state.current.id) return {}
      const ci = Destinations.findIndex(d => d.id === state.current.id)
      if (ci + 1 > Destinations.length - 1) {
        return Destinations[0]
      } else {
        return Destinations[ci + 1]
      }
    },
    previous(state) {
      if (!state.current.id) return {}
      const ci = Destinations.findIndex(d => d.id === state.current.id)
      if (ci - 1 < 0) {
        return Destinations[Destinations.length - 1]
      } else {
        return Destinations[ci - 1]
      }
    },
  },
})
