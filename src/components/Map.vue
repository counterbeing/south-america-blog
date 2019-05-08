<template>
  <div id="map" ref="map"></div>
</template>
<script>
import gmapsInit from '@/utils/gmaps'
import { mapState } from 'vuex'

export default {
  name: 'Map',
  data: () => ({
    map: null,
  }),
  computed: {
    ...mapState(['current', 'destinations']),
    jinkies() {
      return 'hi'
    },
  },
  methods: {
    createMapMarker(latLng) {
      var pinColor = '#F31'
      var pinSVGFilled =
        'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z'
      var markerImage = {
        path: pinSVGFilled,
        anchor: new window.google.maps.Point(12, 22),
        fillOpacity: 0.7,
        fillColor: pinColor,
        strokeWeight: 2,
        strokeColor: 'white',
        scale: 1.5,
      }
      new window.google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: markerImage,
      })

      // let parent = this
      // marker.addListener('click', function() {
      // parent.get('locationManager').setLocation(parent.get('id'))
      // })
    },
    drawPolyLine: function(pointA, pointB) {
      if (!pointA || !pointB) {
        return
      }
      new window.google.maps.Polyline({
        path: [pointA, pointB],
        strokeColor: '#FF62CC',
        map: this.map,
        strokeOpacity: 0.5,
        strokeWeight: 4,
      })
    },
    extractLatLng(d) {
      return {
        lat: d.attributes.latitude,
        lng: d.attributes.longitude,
      }
    },
    drawPolyLines() {
      this.destinations.forEach(function(destinationA, index, array) {
        let destinationB = array[index + 1]
        if (!destinationB) return
        const pointA = this.extractLatLng(destinationA)
        this.createMapMarker(pointA)
        const pointB = this.extractLatLng(destinationB)
        this.drawPolyLine(pointA, pointB, this.map)
      }, this)
    },
    async drawMap() {
      const google = await gmapsInit()
      const lat = this.current.attributes.latitude
      const lng = this.current.attributes.longitude
      this.map = new google.maps.Map(this.$el, {
        zoom: 4,
        center: { lat, lng },
      })
    },
  },
  async mounted() {
    try {
      await this.drawMap()
      this.drawPolyLines()
    } catch (error) {
      console.error(error)
    }
  },
}
</script>
<style lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
