import Ember from 'ember'

const {
  Service,
  inject: { service }
} = Ember

export default Service.extend({
  store: service(),

  init() {
    let store = this.get('store')
    store.findAll('destination').then((destinations) => {
      let sorted = destinations.sortBy('id')
      this.set('allLocations', sorted)
    })
    this._super(...arguments)
  },

  setLocation(location) {
    if(!location) { return }
    this.set('currentLocation', location)
  },

  numberOfLocations: Ember.computed('allLocations', function() {
    return this.get('allLocations.length')
  }),

  destination: Ember.computed('currentLocation', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')
    return locations.find((location) => {
      return location.id == current
    })
  }),

  next: Ember.computed('currentLocation', 'numberOfLocations', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')

    if(!current) { return null }

    var index = 0
    locations.find((location, thisIndex) => {
      index = thisIndex
      return location.id == current
    })

    if(!(index || index == 0)) { return null }

    let lastIndex = (locations.get('length'))
    let plusOne = index + 1
    let nextIndex = (plusOne >= lastIndex) ? 0 : plusOne

    return locations.objectAt(nextIndex).id
  }),

  previous: Ember.computed('currentLocation','numberOfLocations', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')

    if(!current) { return null }
    let currentIndex = null
    locations.find((location, thisIndex) => {
      currentIndex = thisIndex
      return location.id == current
    })
    if(!(currentIndex || currentIndex == 0)) { return null }

    let lastIndex = (locations.get('length') - 1)
    let minusOne = currentIndex - 1
    let desiredIndex = (minusOne < 0) ? lastIndex : minusOne
    return locations.objectAt(desiredIndex).id
  })
})
