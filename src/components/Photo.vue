<template>
  <img
    :alt="photo.title"
    v-lazy="source"
    :data-srcset="srcset"
    sizes="(min-width: 800px) 40vw, 100vw"
  />
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
    srcset() {
      return this.versions
        .map(v => {
          const path = [bucket, encodeURIComponent(v.path)].join('')
          const width = v.width + 'w'
          return [path, width].join(' ')
        })
        .join(',')
    },
    source() {
      const version = this.versions[0]
      return [bucket, encodeURIComponent(version.path)].join('')
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
