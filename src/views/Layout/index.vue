<template>
  <div>
    <!-- 让首页的组件tab栏选项固定在用户选择项上 没有加这个属性 用户切换组件tab栏会回到默认选项 -->
    <keep-alive :include="['home']">
      <router-view class="main" />
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item  to="/home" icon="home-o">
      首页 <i class="toutiao toutiao-shouye" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item  to="/video" icon="search">
      视频 <i class="toutiao toutiao-shipin" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item  to="/question" icon="home-o">
      问答 <i class="toutiao toutiao-wenda" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item  to="/my" icon="search">
      我的 <i class="toutiao toutiao-wode" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao[data-v-5d5a9732] {
    font-size: 40px;
}
/deep/ [data-v-5d5a9732] .van-tabbar-item__text {
  font-size: 20px;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
