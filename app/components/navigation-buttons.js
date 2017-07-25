import Ember from 'ember';

export default Ember.Component.extend({
  locationManager: Ember.inject.service(),

  next: Ember.computed('locationManager.next', function() {
    console.log('computing next in nav button ' + this.get('locationManager.next'))

    return this.get('locationManager.next')
  }),

  // next: Ember.computed.alias('locationManager.next'),
  previous: Ember.computed.alias('locationManager.previous'),
})
