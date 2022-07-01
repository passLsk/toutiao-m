<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: { // home父组件传来的channel_id
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    // 给滚动条pullrefresh绑定滚动事件 在滚动的时候记住最新的滚动位置
    // 组件最终渲染成html dom ,$el就是渲染好的根标签
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    // 在每次进入home页面的时候，把滚动条从最上面0位置滚动到上一次记录的位置
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(), // 发起axios请求需要传的参数
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log('art', res)
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) { // 没有更多数据的时候时间戳会变成null 这时候要把finished的值改为true 停止加载更多
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        this.loading = false // 防止还有剩余的数据没有被加载完
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      setTimeout(() => {
        // 清空列表数据
        this.finished = false

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = false
        this.timestamp = Date.now()
        this.getArticleList()
      }, 1000)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  // 内容被上面两个固定定位盖住了 所以用外边距挤开
  margin-top: 174px;
}
</style>
