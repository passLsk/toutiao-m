<template>
  <div>
    <i class="toutiao" :class="'toutiao-' + name"></i>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
