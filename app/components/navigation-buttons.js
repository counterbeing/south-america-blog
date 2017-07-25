import Ember from 'ember';

export default Ember.Component.extend({
  locationManager: Ember.inject.service(),

  next: Ember.computed('locationManager.next', function() {
    return this.get('locationManager.next')
  }),

  previous() {
    return "fuuuck"
  }

})
