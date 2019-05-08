<template>
  <div id="map" ref="map"></div>
</template>
<script>
import gmapsInit from '@/utils/gmaps'
import { mapState } from 'vuex'
import router from '@/router'

export default {
  name: 'Map',
  data: () => ({
    map: null,
    markers: {},
  }),
  computed: {
    ...mapState(['current', 'destinations']),
    jinkies() {
      return 'hi'
    },
  },
  methods: {
    icon(id) {
      const isCurrent = this.current.id === id
      var pinSVGFilled =
        'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z'
      return {
        path: pinSVGFilled,
        anchor: new window.google.maps.Point(12, 22),
        fillOpacity: 0.7,
        fillColor: isCurrent ? '#99F' : '#F31',
        strokeWeight: 2,
        strokeColor: 'white',
        scale: isCurrent ? 2 : 1.5,
      }
    },
    createMapMarker(latLng, id) {
      const marker = new window.google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: this.icon(id),
      })
      marker.addListener('click', function() {
        router.push({ path: id })
        // console.log(id)
      })
      this.markers[id] = marker
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
        const pointA = this.extractLatLng(destinationA)
        this.createMapMarker(pointA, destinationA.id)
        if (!destinationB) return
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
  watch: {
    current: function(newValue, oldValue) {
      if (!newValue) return
      const oldMarker = this.markers[oldValue.id]
      const newMarker = this.markers[newValue.id]
      if (!newMarker || !oldMarker) return
      newMarker.setIcon(this.icon(newValue.id))
      oldMarker.setIcon(this.icon(oldValue.id))
    },
  },
  async mounted() {
    try {
      await this.drawMap()
      this.drawPolyLines()
    } catch (error) {
      // eslint-disable-next-line no-console
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
