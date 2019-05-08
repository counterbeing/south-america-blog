<template>
  <img :alt="photo.title" :src="source" />
</template>
<script>
const bucket = 'https://s3.amazonaws.com/south-america-blog/'
const formats = ['Small 320', 'Medium 640', 'Medium 800', 'Large', 'Large 1600']

export default {
  props: ['photo'],
  data: () => ({}),
  methods: {},
  computed: {
    versions() {
      return this.photo.versions.filter(v => formats.includes(v.label))
    },
    source() {
      const version = this.versions[0]
      return [bucket, version.path.replace(/^tmp\//, '')].join('')
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
