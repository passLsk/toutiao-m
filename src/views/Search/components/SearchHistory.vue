<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isdelete">
        <span @click="$store.commit('delAllHistory')">全部删除</span
        >&nbsp;&nbsp;
        <span @click="isdelete = false">完成</span>
      </template>
      <van-icon name="delete" @click="isdelete = true" v-else />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistoryList"
      :key="index"
      :title="item"
      @click="$emit('search',item)"
    >
      <van-icon
        name="close"
        v-if="isdelete"
        @click.stop="$store.commit('delHistory', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isdelete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
