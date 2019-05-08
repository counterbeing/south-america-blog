<template>
  <main id="inspector" v-if="destination">
    <div class="body">
      <h1>{{ a.city }}, {{ a.country }}</h1>
      <div v-html="a.body"></div>
    </div>
    <div v-if="this.a">
      <figure v-for="photo in photos" :key="photo.taken">
        <img :alt="photo.title" :src="source(photo)" />
        <figcaption>{{ photo.description }}</figcaption>
      </figure>
    </div>
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data: () => ({}),
  methods: {
    source(photo) {
      const bucket = 'https://s3.amazonaws.com/south-america-blog/'
      const version = photo.versions.find(v => v.label == 'Medium 800')
      return [bucket, version.path.replace(/^tmp\//, '')].join('')
    },
  },
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
img {
  width: 100%;
}
figure {
  text-align: center;
}
</style>
