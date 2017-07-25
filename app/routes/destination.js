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

  afterModel(destination) {
    if(!destination) {
      console.log('could not get model from route, skipping')
      return
    }
    this.get('locationManager').setLocation(destination.id)
    console.log('fired aftermodel ' + destination.id)
  },

  locationManager: service(),

  destinationObserver: observer(
    'locationManager.currentLocation',
    function() {
      let id = this.get('locationManager.currentLocation')
      this.transitionTo('destination', id)
    }
  ),
})
