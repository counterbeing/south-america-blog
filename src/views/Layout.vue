<template>
  <div id="layout">
    <Inspector />
    <div id="map-container">
      <Map />
    </div>
    <!-- <Navbar v-if="story" :story="story" class="desktop-hidden" /> -->
  </div>
</template>
<script>
import Inspector from '@/components/Inspector'
import Map from '@/components/Map'
// import Navbar from './micro/Navbar';
// import Stories from './stories.json';
import { mapActions } from 'vuex'

export default {
  data: () => ({}),
  components: { Inspector, Map },
  computed: {},
  methods: {
    ...mapActions(['setCurrent']),
  },
  watch: {
    $route(to) {
      this.setCurrent(to.params.destination_id)
    },
  },
  mounted() {
    // this.setCurrent(this.$route.params.id)
  },
}
</script>

<style>
#blog {
}
@media only screen and (max-width: 800px) {
  #map-container {
    width: 100vw;
    height: 50vh;
  }
}

@media only screen and (min-width: 800px) {
  .desktop-hidden {
    display: none !important;
  }

  #inspector {
    position: fixed;
    right: 0;
    top: 0;
    width: 60%;
    height: 100vh;
  }

  #map-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 40vw;
    height: 100vh;
  }
}
</style>
