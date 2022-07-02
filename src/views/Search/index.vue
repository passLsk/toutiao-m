<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
        @search="onSearch"
        autofocus
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchSuggest
        v-if="isSearch === false"
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
      <SearchResult v-else :searchText="searchText"></SearchResult>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false // 默认没有按下回车
    }
  },
  methods: {
    onSearch (str) {
      this.isSearch = true
      this.searchText = str
      this.$store.commit('setSearchHistoryList', str) // 搜索历史数据持久化 store里面
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchSuggest, SearchResult }
}
</script>

<style scoped lang='less'>
.van-search {
  background-color: skyblue;
}
</style>
