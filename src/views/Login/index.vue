<template>
  <div class="login">
    <van-nav-bar title="登录" left-icon="smile-o">
      <template #left>
        <van-icon name="cross" color="#fff" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请输入正确格式的手机号',
          },
        ]"
      >
        <template #left-icon> <i class="toutiao toutiao-shouji"></i> </template
      ></van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            native-type="button"
            color="#999"
            class="yzm"
            type="primary"
            v-else
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
        ></van-field
      >
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/use.js'
export default {
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码
      time: 6 * 1000,
      isCountDownShow: false // 默认倒计时隐藏
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data) // 请求回来的token保存在vuex的state中
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      console.log('submit', values)
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          const res = await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送短信失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机格式不正确')
      }
    }
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 37px !important;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #1989fa;
  border-radius: 10px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 18px;
  bottom: 1080px;
}
.yzm {
  position: fixed;
  right: 10px;
  bottom: 1080px;
}
</style>
