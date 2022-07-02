<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        ><ArticleItem
          v-for="(obj, index) in searchResultList"
          :key="index"
          :article="obj"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResultListApi } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResultListApi()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      searchResultList: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async getSearchResultListApi () {
      try {
        const res = await getSearchResultListApi({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log('搜索结果', res, this.searchResultList)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.searchResultList.push(...res.data.data.results)
        this.loading = false
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResultListApi()
    },
    onRefresh () {
      this.searchResultList = []
      this.page = 1
      this.getSearchResultListApi()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
