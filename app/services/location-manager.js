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
    if(!location) { return }
    console.log('current location was set to: ' + location)
    this.set('currentLocation', location)
  },

  numberOfLocations: Ember.computed('allLocations', function() {
    return this.get('allLocations.length')
  }),

  next: Ember.computed('currentLocation', 'numberOfLocations', function() {
    console.log('computing next in location manager')
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')

    if(!current) { return null }

    var index = 0
    locations.find((location, thisIndex) => {
      index = thisIndex
      return location.id == current
    })

    if(!(index || index == 0)) { return null }
    console.log('    index exists')

    let lastIndex = (locations.get('length') - 1)
    let plusOne = (index + 1)
    let nextIndex = (plusOne >= lastIndex) ? 0 : plusOne

    console.log('   next index is ' + nextIndex)
    console.log('   object is ' + locations.objectAt(nextIndex))
    return locations.objectAt(nextIndex).id
  }),

  previous: Ember.computed('currentLocation','numberOfLocations', function() {
    let locations = this.get('allLocations')
    let current = this.get('currentLocation')

    if(!current) { return null }
    let index = null
    locations.find((location, thisIndex) => {
      index = thisIndex
      return location.id == current
    })
    if(!index) { return null }

    let lastIndex = (locations.get('length') - 1)
    let minusOne = (index - 1)
    let nextIndex = (minusOne <= 0) ? lastIndex : minusOne
    return locations.objectAt(nextIndex).id
  })
})
