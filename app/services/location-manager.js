import Ember from 'ember'

const {
  Service,
  inject: { service }
} = Ember

export default Service.extend({
  store: service(),

  init() {
    let store = this.get('store')
    let result = store.findAll('destination')
    this.set('allLocations', result)
    this._super(...arguments)
  },

  setLocation(location) {
    this.set('currentLocation', location)
  },

  numberOfLocations: Ember.computed('allLocations', function() {
    return this.get('allLocations.length')
  }),

  next: Ember.computed('currentLocation', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')

    let index = null
    locations.find((location, thisIndex) => {
      index = thisIndex
      return location.id == current
    })
    if(!index) { return null }

    let lastIndex = (locations.get('length') - 1)
    let plusOne = (index + 1)
    let nextIndex = (plusOne >= lastIndex) ? 0 : plusOne
    return locations.objectAt(nextIndex).id
  })
})
