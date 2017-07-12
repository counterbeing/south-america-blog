import Ember from 'ember'

export default Ember.Service.extend({
  // allLocations: undefined,
  testProp: 'testpropppp',
  currentlySelectedLocation: undefined,
  store: Ember.inject.service(),
  allLocations: Ember.computed(function () {
    let store = this.get('store')
    console.log('running find destination')
    return store.findAll('destination')
  }).readOnly(),

  setCurrentlySelectedLocation: (location) => {
    this.set( 'currentlySelectedLocation', location )
  },

  // showSelectedStory: () => {
  //   if (this.get('currentlySelectedStory')) {
  //     console.log('Displaying: ' + this.get('currentlySelectedStory'))
  //   } else {
  //     console.log('select a damn story')
  //   }
  // }
})
