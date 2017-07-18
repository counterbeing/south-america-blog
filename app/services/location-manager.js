import Ember from 'ember'

const {
  Service,
  inject: { service }
} = Ember

export default Service.extend({
  store: service(),
  currentLocation: null,
  allLocations: null,
  test: false,

  init() {
    let store = this.get('store')
    let result = store.findAll('destination')
    this.set('allLocations', result)
    this.set('test', true)
    this._super(...arguments)
  },

  setLocation(location) {
    this.set('currentLocation', location)
  }
})
