<template>
  <div id="inspector">
    {{ destination }}
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data: () => ({}),
  computed() {
    ...mapGetters('destinations'),
  }
};
</script>
<style lang="scss" scoped></style>
