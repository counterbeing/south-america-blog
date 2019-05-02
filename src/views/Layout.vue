<template>
  <div id="blog">
    <Inspector />
    <!-- <Map /> -->
    <!-- <Navbar v-if="story" :story="story" class="desktop-hidden" /> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Inspector from "@/components/Inspector";
// import Map from './Map';
// import Navbar from './micro/Navbar';
// import Stories from './stories.json';

export default {
  data: () => ({}),
  // components: { Map, Inspector, Navbar },
  components: { Inspector },
  computed: {
    ...mapGetters(["destination"])
  },
  methods: {
    ...mapActions(["setDestination"])
  },
  watch: {
    $route(to) {
      this.setDestination(to.params.id);
    }
  },
  mounted() {
    this.setDestination(this.$route.params.id);
  }
};
</script>
<style>
#blog {
}

@media only screen and (min-width: 700px) {
  .desktop-hidden {
    display: none !important;
  }
}
</style>
