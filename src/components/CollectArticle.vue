<template>
    <van-loading v-if="isLoading" size=".53333rem" />
    <van-icon
      v-else
      color="#777"
      :name="is_collected ? 'star' : 'star-o'"
      @click="onClick"
    />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: [Number, String],
      required: true
    }
  },
  name: 'CollectArticle',
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.is_collected) {
        try {
          await delCollect(this.art_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addCollect(this.art_id)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
