import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload) // 把每一项搜索记录添加到数组前面 payload对应的是searchindexvue里传来的数据
      arr = [...new Set(arr)] // 对数据进行去重
      state.searchHistoryList = arr // 去重之后赋值
    },
    delHistory (state, index) { // 搜索历史记录根据id删除单个历史记录
      state.searchHistoryList.splice(index, 1)
    },
    delAllHistory (state) { // 搜索历史记录 根据函数名删除所有搜索历史记录
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
