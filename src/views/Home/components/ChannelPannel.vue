<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          size="small"
          round
          plain
          type="warning"
          @click="isShow = !isShow"
          >{{ isShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <div class="channels">
        <van-row>
          <van-col
            span="6"
            v-for="(item, index) in channelsList"
            :key="item.id"
          >
            <div
              @click="onclick(index, item.id)"
              class="inner"
              :style="{ color: index === active ? 'red' : '' }"
            >
              {{ item.name }}
              <van-icon name="close" v-show="isShow" v-if="index !== 0" />
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <div class="channels">
        <van-row>
          <van-col
            span="6"
            v-for="(obj, index) in recommendChannels"
            :key="index"
          >
            <div
              class="inner van-ellipsis"
              @click="addFn(obj.id)"
              :style="{ color: 'skyblue' }"
            >
              +{{ obj.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  props: {
    channelsList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      recommendChannels: [],
      isShow: false
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        // 筛选掉两个数组中相同的元素 把剩下的不同的元素留下
        // this.recommendChannels = res.data.data.channels.filter(item => this.channelsList.every(item1 => item1.id !== item.id))
        // 用lodash中的数组方法differenceBy 实现筛选掉第一个数组中与第二个数组中共有的元素 第三个参数是数组中共有的属性值
        this.recommendChannels = _.differenceBy(res.data.data.channels, this.channelsList, 'name')
      } catch (err) {
        console.log(err)
      }
    },
    addFn (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id) // 获取this.recommendChannels点击的该项索引
      this.channelsList.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    // delChannelsFn (id) {
    //   const index = this.channelsList.findIndex(item => item.id === id)
    //   this.recommendChannels.push(this.channelsList[index])
    //   this.channelsList.splice(index, 1)
    // },
    onclick (id, ind) {
      if (this.isShow) {
        if (id === 0) return // 索引0 项不能删除
        // 删除
        const index = this.channelsList.findIndex(item => item.id === ind)
        this.recommendChannels.push(this.channelsList[index])
        this.channelsList.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1) // 处理bug删除我的频道高亮项前面的时候 高亮会跳位到原高亮项的后面一位 子传父这个新的高亮项的索引 赋值给父组件的active
        }
      } else {
        this.$emit('change-active', id) // 子传父把点击我的频道的索引传给父组件 根据index跳转高亮的元素
      }
    }
  },
  computed: {},
  watch: {
    channelsList: {
      deep: true,
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 未登录状态我的频道持久化设置
          console.log(456)
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  h3 {
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 2px;
    color: #333333;
  }
  .van-button {
    width: 103px;
    height: 48px;
    border-radius: 20px;
    color: #fa9292;
  }
}
.channels {
  padding: 15px;
  .inner {
    margin-bottom: 18px;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    text-align: center;
    line-height: 86px;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      left: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }
}
</style>
