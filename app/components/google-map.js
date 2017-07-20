import Ember from 'ember';

const {
  Component,
  observer,
  inject: { service }
} = Ember

export default Component.extend({
  locationManager: service(),
  store: service(),
  map: null,

  locations() {
    return this.get('locationManager').allLocations
  },

  insertMap: function() {
    let lat = this.get('latitude')
    let lng = this.get('longitude')
    let container = this.$('.map-canvas')[0]
    let options = {
      center: new window.google.maps.LatLng(lat, lng),
      zoom: 4,
    }
    this.set('map', new window.google.maps.Map(container, options))
    // this.set('locationManager.currentLocation', this.get('id'))
    this.get('locationManager').setLocation(this.get('id'))
  }.on('didInsertElement'),

  addLocationsToMap() {
    // console.log('add locations to map triggered')

    let map = this.get('map')
    let currentID = this.get('id')
    let parent = this

    this.locations().then((locations) => {
      locations.forEach((location) => {
        let position = this._locationPosition(location)
        let markerIsCurrent = location.id == currentID
        let color = markerIsCurrent ? 'yellow' : 'red'
        let locationMarker = this._generateLocationMarker(color, position, map)
        let updateMapByMarker = this.get('_updateMapByMarker')
        locationMarker.addListener('click', function() {
          updateMapByMarker.call(parent,locationMarker)
        })

        let oldMarker = location.get('locationMarker')
        if (oldMarker) { oldMarker.setMap(null)}
        location.set('locationMarker', locationMarker)
      })
    })
    this._drawPolylines(this.locations(), map)
  },

  _updateMapByMarker(marker){
    let clickedLocation = this.locations().find(function(m) {
      return m.locationMarker == marker
    })
    this.get('locationManager').setLocation(clickedLocation.id)
    marker.setIcon(this._markerIcon('yellow'))
    marker.map.panTo(marker.getPosition())
  },

  observeDestinations: observer(
    'locationManager.{currentLocation,allLocations.@each}',
    function() {
      Ember.run.once(this, 'addLocationsToMap')
    }.on('init')
  ),

  _markerIcon(color) {
    return {
      url: `/${color}-marker.png`,
      size: new window.google.maps.Size(62, 62),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 30),
      scaledSize: new window.google.maps.Size(30, 30),
    }
  },

  _generateLocationMarker(color, position, map) {
    let icon = this._markerIcon(color)
    return new window.google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
    })
  },


  _locationPosition(location) {
    return {
      lat: location.get('latitude'),
      lng: location.get('longitude')
    }
  },

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

  _drawPolylines(locations, map) {
    locations.forEach((locationA, index, array) => {
      let locationB = array.objectAt(index + 1)
      if(!locationB) { return }
      let pointB = this._locationPosition(locationB)
      let pointA = this._locationPosition(locationA)
      this._drawPolyline(pointA, pointB, map)
    })
  },
})
