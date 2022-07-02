<template>
  <div>
    <van-cell
      v-for="(obj, index) in list"
      :key="index"
      :title="obj"
      icon="search"
      @click="$emit('search',obj)"
    >
    <!-- 搜索关键字高亮 用到v-html -->
      <template #title>
        <span v-html="highLight(obj)"></span></template
    ></van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      reqiured: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 搜索关键字高亮 用正则表达式把全局的所有关键字替换成标签给样式
    highLight (str) {
      // 正则表达式 字面量写法 里面不能用变量 所以用完整写法
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            this.list = res.data.data.options
            console.log('suggest', res, this.list)
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
