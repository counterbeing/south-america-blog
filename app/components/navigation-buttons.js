import Ember from 'ember';

export default Ember.Component.extend({
  locationManager: Ember.inject.service(),

  next: Ember.computed.alias('locationManager.next'),
  previous: Ember.computed.alias('locationManager.previous'),
})
