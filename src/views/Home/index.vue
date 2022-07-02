<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="search">
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab v-for="obj in channelsList" :key="obj.id" :title="obj.name">
        <ArticleList :id="obj.id"></ArticleList
      ></van-tab>
      <template #nav-right>
        <div class="menu">
          <i class="toutiao toutiao-gengduo" @click="menuBtn"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPannelShow"
      closeable
      close-icon-position="left-top"
      position="bottom"
      :style="{ height: '92%', paddingTop: '1rem' }"
      ><ChannelPannel
        :channelsList="channelsList"
        :active="active"
        @change-active="
          active = $event;
          isChannelPannelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPannel
    ></van-popup>
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import ChannelPannel from './components/ChannelPannel.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  name: 'home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channelsList: [],
      isChannelPannelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channelsList = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channelsList = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    },
    menuBtn () {
      this.isChannelPannelShow = true
    }
  },
  components: { ArticleList, ChannelPannel },
  watch: {
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
/deep/.van-tabs__wrap {
  // 脱标的元素没有宽度 多余的内容实现不了滚动显示 只能给元素加个宽度解决
  width: 100%;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-popup__close-icon {
  position: absolute;
  left: 20px;
  top: 20px;
}
// 给每个van-list设置单独的滚动条 先把html的滚动条隐藏html { overflow: hidden; } 100vh-274px是削减去固定定位的部分 overflow: auto;给溢出的部分设置滚动条
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
