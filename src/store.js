import Vue from 'vue'
import Vuex from 'vuex'
import Destinations from './data/destinations.json'
import config from '../config'

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
      const u = config.publicPath + 'destinations/' + state.current.id + '.json'
      console.log(u)
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
  getters: {},
})
