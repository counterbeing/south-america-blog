import Ember from 'ember'
import Model from 'ember-data/model'
import attr from 'ember-data/attr'

export default Model.extend({
  latitude: attr(),
  longitude: attr(),
  date: attr(),
  city: attr(),
  country: attr(),
  flickrLink: attr(),
  body: attr(),
  flickrCache: attr(),

  locationManager: Ember.inject.service(),

  position: Ember.computed('latitude', 'longitude', function() {
    return {
      lat: this.get('latitude'),
      lng: this.get('longitude')
    }
  }),

  color: Ember.computed('locationManager.currentLocation', function(){
    let id = this.get('id')
    let currentlySelectedId = this.get('locationManager.currentLocation')
    let markerIsCurrent = id == currentlySelectedId
    return markerIsCurrent ? 'yellow' : 'red'
  }),

  icon: Ember.computed('locationManager.currentLocation', function(){
    return {
      url: `/${this.get('color')}-marker.png`,
      size: new window.google.maps.Size(62, 62),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 30),
      scaledSize: new window.google.maps.Size(30, 30),
    }
  }),

  marker: Ember.computed('position', 'icon', function(){
    return new window.google.maps.Marker({
      position: this.get('position'),
      map: this.get('locationManager.map'),
      icon: this.get('icon'),
    })
  }),
})
