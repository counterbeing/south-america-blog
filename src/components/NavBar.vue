<template>
  <div class="parent">
    <router-link
      v-if="previous && previous.id"
      tag="div"
      class="child"
      :to="{ name: 'destination', params: { destination_id: previous.id } }"
    >
      Previous
    </router-link>
    <router-link
      v-if="next && next.id"
      tag="div"
      class="child"
      :to="{ name: 'destination', params: { destination_id: next.id } }"
    >
      Next
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['previous', 'next']),
  },
}
</script>
<style scoped>
.parent {
  display: flex;
  flex-wrap: no-wrap;
  align-content: space-evenly;
  padding: 0;
  text-align: center;
}
.child {
  background-color: #f4511e;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 1em;
  transition: 0.2s;
  width: 50%;
}

@media (pointer: fine) {
  .child:hover {
    color: #2c3e50;
    background-color: #fff;
  }
}
@media (pointer: coarse) {
  .child:active {
    color: #2c3e50;
    background-color: #fff;
  }
}
</style>
