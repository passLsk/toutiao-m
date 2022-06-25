<template>
  <div class="login">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field name="用户名" placeholder="请输入手机号" />
      <van-field type="password" name="密码" placeholder="密码" />
      <div style="margin: 16px">
        <van-button class="col" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '',
      sms: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">
// .van-nav-bar {
//   background-color: #3296fa;
// }
// /deep/.van-nav-bar__title {
//   color: #fff;
//   }
</style>
