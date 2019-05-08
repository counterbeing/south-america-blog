<template>
  <main id="inspector" v-if="destination">
    <div class="body">
      <h1>{{ a.city }}, {{ a.country }}</h1>
      <time :datetime="date">{{ a.date | formatDate }}</time>
      <div v-html="a.body"></div>
    </div>
    <div v-if="this.a">
      <figure v-for="photo in photos" :key="photo.taken + photo.title">
        <photo :photo="photo" />
        <figcaption>{{ photo.description }}</figcaption>
      </figure>
    </div>
  </main>
</template>
<script>
import moment from 'moment'
import Photo from './Photo'
import { mapState } from 'vuex'
export default {
  components: { Photo },
  data: () => ({}),
  computed: {
    ...mapState(['current', 'destination']),
    date() {
      return moment(this.a.date).format('YYYY-MM-DD')
    },
    a() {
      if (!this.destination.data) return {}
      return this.destination.data.attributes
    },
    photos() {
      if (!this.a['flickr-cache']) return {}
      return this.a['flickr-cache'].photos
    },
  },
  metaInfo() {
    return {
      title: `${this.a.city}, ${this.a.country}`,
      titleTemplate: "%s - Cory Logan's South America Motorcycle Trip",
      htmlAttrs: {
        lang: 'en',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
#inspector {
  text-align: left;
  overflow-y: scroll;
}
.body {
  padding: 3rem 5rem;
  font-size: 1.4rem;
}

figure {
  text-align: center;
}

@media only screen and (max-width: 800px) {
  .body {
    padding: 2rem;
    font-size: 1.4rem;
  }
}
</style>
