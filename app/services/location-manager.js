import Ember from 'ember'

export default Ember.Service.extend({
  // allLocations: undefined,
  currentlySelectedLocation: undefined,
  store: Ember.inject.service(),
  allLocations: Ember.computed(function () {
    console.log('running find destination')
    let store = this.get('store')
    debugger
    return store.findAll('destination')
  }).readOnly(),

  // allLocations() {
  //   console.log('running find destination')
  //   let store = this.get('store')
  //   return store.findAll('destination')
  // },

  setCurrentlySelectedLocation: (location) => {
    this.set( 'currentlySelectedLocation', location )
  },
})
