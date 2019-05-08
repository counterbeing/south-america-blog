<template>
  <main id="inspector" v-if="destination">
    <div class="body">
      <h1>{{ a.city }}, {{ a.country }}</h1>
      <div v-html="a.body"></div>
    </div>
    <div v-if="this.a">
      <figure v-for="photo in photos" :key="photo.taken">
        <photo :photo="photo" />
        <figcaption>{{ photo.description }}</figcaption>
      </figure>
    </div>
  </main>
</template>
<script>
import Photo from './Photo'
import { mapState } from 'vuex'
export default {
  components: { Photo },
  data: () => ({}),
  computed: {
    ...mapState(['current', 'destination']),
    a() {
      if (!this.destination.data) return {}
      return this.destination.data.attributes
    },
    photos() {
      if (!this.a['flickr-cache']) return {}
      return this.a['flickr-cache'].photos
    },
  },
}
</script>

<style lang="scss" scoped>
#inspector {
  position: fixed;
  right: 0;
  top: 0;
  width: 60%;
  height: 100vh;
  text-align: left;
  overflow-y: scroll;
}
.body {
  padding: 5rem;
  font-size: 1.4rem;
}

figure {
  text-align: center;
}
</style>
