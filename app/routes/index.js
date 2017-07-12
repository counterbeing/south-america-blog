import Ember from 'ember'

export default Ember.Route.extend({
  locationManager: Ember.inject.service('location-manager'),

  // firstDestination: Ember.computed(function() {
  //   return this.get("locationManager.allLocations");
  // }),

  // firstDestination() {
  //   console.log('running shit')
  //   debugger
  //   let locationManager = this.get('locationManager')
  //   let firstObject = locationManager.allLocations()
  //   console.log(firstObject)
  //   return firstObject
  // },


  // afterModel() {
  //   console.log(this.get('firstDestination')())
  //   this.get('firstDestination')()
  // }
  // afterModel(firstDestination) {
  //   this.transitionTo('destination', firstDestination)
  // }
  // beforeModel() {
  //   // this.replaceWith('destinations')
  //   let locationManager = this.get('locationManager')
  //   console.log(locationManager.allLocations())
  // }
})
