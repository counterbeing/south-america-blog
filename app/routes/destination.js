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

  model(params) {
    return this.store.findRecord(
      'destination',
      params.destination_id,
      { reload: true }
    )
  },

  titleToken(model) {
    let country = model.get('country')
    let city = model.get('city')
    return `${city}, ${country} | South America Motorcycle Tour`
  },

  afterModel(destination) {
    if(!destination) { return }
    this.get('locationManager').setLocation(destination.id)
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
