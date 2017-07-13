import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember

export default Component.extend({
  locationManager: service(),
  insertMap: function() {
    let lat = this.get('latitude')
    let lng = this.get('longitude')
    let container = this.$('.map-canvas')[0]
    let options = {
      center: new window.google.maps.LatLng(lat, lng),
      zoom: 4,
    }

    let locationManager = this.get('locationManager')
    locationManager.allLocations.then((locations) => {
      locations.forEach((location) => {
        let position = {
          lat: location.get('latitude'),
          lng: location.get('longitude')
        }
        // console.log(position)
        new window.google.maps.Marker({
          position: position,
          map: map,
        })
      })
    })
    let map = new window.google.maps.Map(container, options)

  }.on('didInsertElement')
});
