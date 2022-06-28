<template>
  <div>
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            round
            src="http://192.168.19.244:8080/#/my/assets/avatar.png"
          />
          <span>黑马头条号</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>8</p>
          <p>头条</p>
        </li>
        <li>
          <p>8</p>
          <p>头条</p>
        </li>
        <li>
          <p>8</p>
          <p>头条</p>
        </li>
        <li>
          <p>8</p>
          <p>头条</p>
        </li>
      </ul>
    </div>
    <!-- 两个互斥的页面 相同的样式用header 不同的样式用不同的类名 -->
    <div class="header header-notlogin" v-else>
      <div class="header-main" @click="$router.push({ name: 'login' })">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="单元格" is-link />
      <van-cell title="单元格" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background-color: rgb(50, 150, 250, 0.7);
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  .header-main {
    img {
      width: 132px;
      height: 132px;
      vertical-align: middle;
      margin-bottom: 15px;
    }
    p {
      width: 132px;
      height: 40px;
      font-family: MicrosoftYaHei;
      font-size: 28px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    margin-bottom: 55px;
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
      text-align: center;
      line-height: 33px;
      border-radius: 16px;
    }
    .left {
      display: flex;
      align-items: center;
      .van-image {
        width: 132px;
        height: 132px;
      }
      span {
        font-size: 30px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 1px;
        color: #ffffff;
        margin-left: 22px;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        font-weight: 400;
        color: #ffffff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.van-grid-item {
  .toutiao {
    font-size: 45px;
  }
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
  /deep/.van-grid-item__text {
    font-size: 28px;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
