import Service from '@ember/service'
import { inject as service } from '@ember/service'
import { computed } from '@ember/object'


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

  locationsPromise() {
    let store = this.get('store')
    return store.findAll('destination').then((destinations) => {
      let sorted = destinations.sortBy('id')
      this.set('allLocations', sorted)
    })
  },

  setLocation(location) {
    if(!location) { return }
    this.set('currentLocation', location)
  },

  numberOfLocations: computed('allLocations', function() {
    return this.get('allLocations.length')
  }),

  destination: computed('currentLocation', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')
    return locations.find((location) => {
      return location.id == current
    })
  }),

  next: computed('currentLocation', 'numberOfLocations', function() {
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

  previous: computed('currentLocation','numberOfLocations', function() {
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
