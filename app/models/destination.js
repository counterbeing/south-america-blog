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

  init() {
    this._super(...arguments);
    this.createMapMarker()
  },

  createMapMarker() {
    let marker = new window.google.maps.Marker({})
    let parent = this
    marker.addListener('click', function() {
      parent.get('locationManager').setLocation(parent.get('id'))
    })

    this.set('marker', marker)
  },

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

  icon: Ember.computed('color', function(){
    return {
      url: `/sa/${this.get('color')}-marker.png`,
      size: new window.google.maps.Size(62, 62),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(8, 30),
      scaledSize: new window.google.maps.Size(18, 30),
    }
  }),

  observer: Ember.observer('position', 'icon', function(){
    let marker = this.get('marker')
    marker.setIcon(this.get('icon'))
  }),

  initialObserver: Ember.observer('position', 'locationManager.map', function(){
    let marker = this.get('marker')
    let position = this.get('position')
    if(!position.lat) {return}
    marker.setPosition(position)
    marker.setIcon(this.get('icon'))
    marker.setMap(this.get('locationManager.map'))
  }).on('init'),
})
