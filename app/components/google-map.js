import Component from '@ember/component'
import { observer } from '@ember/object'
import { inject as service } from '@ember/service'
import { once } from '@ember/runloop'

export default Component.extend({
  locationManager: service(),
  store: service(),
  map: null,

  init() {
    this._super(...arguments)
    this.get('locationManager.numberOfLocations')
  },

  locations() {
    return this.get('locationManager.allLocations')
  },

  insertMap: function() {
    let lat = this.get('destination.latitude')
    let lng = this.get('longitude')
    let container = this.$('.map-canvas')[0]
    let options = {
      center: new window.google.maps.LatLng(lat, lng),
      zoom: 4,
    }
    this.set('locationManager.map', new window.google.maps.Map(container, options))
    this.get('locationManager').setLocation(this.get('id'))
  }.on('didInsertElement'),

  observeForPolyline: observer(
    'locationManager.numberOfLocations',
    function() {
      once(this, '_drawPolylines')
    }.on('init')
  ),

  observeCurrent: observer( 'locationManager.currentLocation', function() {
      let position = this.get('locationManager.destination.position')
      this.get('locationManager.map').panTo(position)
  }),

  _drawPolyline(pointA, pointB, map) {
    if(!pointA || !pointB) { return }
    new window.google.maps.Polyline({
      path: [pointA, pointB],
      strokeColor: '#FF62CC',
      map: map,
      strokeOpacity: 0.5,
      strokeWeight: 4
    })
  },

  _drawPolylines() {
    let map = this.get('locationManager.map')
    this.locations().forEach((locationA, index, array) => {
      let locationB = array.objectAt(index + 1)
      if(!locationB) { return }
      let pointB = locationB.get('position')
      let pointA = locationA.get('position')
      this._drawPolyline(pointA, pointB, map)
    })
  },
})
