import Ember from 'ember';

export default Ember.Component.extend({
  locationManager: Ember.inject.service('location-manager'),
  insertMap: function() {
    let locationManager = this.get('locationManager')
    console.log(locationManager.allLocations)
    let lat = this.get('latitude')
    let lng = this.get('longitude')
    let container = this.$('.map-canvas')[0]
    let options = {
      center: new window.google.maps.LatLng(lat, lng),
      zoom: 10
    }
    new window.google.maps.Map(container, options)
  }.on('didInsertElement')
});
