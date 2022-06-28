<template>
  <div>
    <van-nav-bar title="标题">
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab v-for="obj in channelsList" :key="obj.id" :title="obj.name">内容 1</van-tab>
      <template #nav-right>
        <div class="menu">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
export default {
  name: 'home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channelsList: []
    }
  },
  methods: {
    async getMyChannels () {
      try {
        const res = await getMyChannels()
        this.channelsList = res.data.data.channels
        console.log('res', res, this.channelsList)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background-color: rgba(249, 247, 247, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
  // unset去除组件的默认样式
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  background-color: #3296fa;
  width: 31px;
  height: 6px;
}
.menu {
  position: fixed;
  right: 0;
  width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 82px;
  font-size: 33px;
}
.menu1 {
  min-width: 100px;
  // flex布局设置宽度无效 就用min-width
  height: 82px;
  background-color: white;
}
</style>
