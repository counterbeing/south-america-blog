import Ember from 'ember'

const {
  Service,
  inject: { service }
} = Ember

export default Service.extend({
  store: service(),

  init() {
    let store = this.get('store')
    this.set('allLocations', store.findAll('destination'))
    this._super(...arguments)
  },

  setLocation(location) {
    this.set('currentlySelectedLocation', location)
  }
})
