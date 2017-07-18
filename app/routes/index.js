import Ember from 'ember'

export default Ember.Route.extend({
  locationManager: Ember.inject.service('location-manager'),
})
