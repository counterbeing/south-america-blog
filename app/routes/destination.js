import Ember from 'ember';

const {
  Route,
  observer,
  inject: { service }
} = Ember

export default Route.extend({
  init() {
    this._super(...arguments)
    this.get('locationManager.currentLocation');
  },

  locationManager: service(),

  // afterModel(one) {
    // this.locationManager.setLocation(one.id)
  // },

  destinationObserver: observer(
    'locationManager.currentLocation',
    function() {
      let id = this.get('locationManager.currentLocation')
      this.transitionTo('destination', id)
    }
  ),
})
