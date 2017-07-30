import Ember from 'ember'

export default Ember.Route.extend({
  locationManager: Ember.inject.service('location-manager'),

  init() {
    this.get('locationManager.allLocations')
    this._super(...arguments);
  },

  model() {
    return this.get('store').findAll('destination')
  },

  afterModel(destinations) {
    let firstDestination = destinations.get('firstObject')
    this.transitionTo('destination', firstDestination.id)
  }
})
