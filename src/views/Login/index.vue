<template>
  <div class="login">
    <!-- 登录界面 -->
    <van-nav-bar title="登录" left-icon="smile-o" @click-left="$router.back()">
      <!-- 登录界面左侧icon的设置 -->
      <template #left>
        <van-icon name="cross" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 手机和验证码输入框的结构 ref设置是为了下面的表单检验规则设置 -->
    <van-form @submit="onSubmit" ref="form">
      <!-- 设置name属性后面短信验证请求数据参数需要对应这个name -->
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
        <template #left-icon> <MyIcon name="shouji"></MyIcon> </template
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
          <MyIcon name="yanzhengma"></MyIcon>
        </template>
        <template #button>
          <!-- 计时器组件van-count-down 跟发送短信验证的按钮互斥 设置一个默认变量为false先让计时器组件隐藏
          点击按钮的时候 根据定时器的@finish事件来改变控制互斥的变量的值-->
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- 发送验证码按钮 native-type类型需要设置为button 让按钮只触发发送短信功能 不触发表单的submit提交事件 -->
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
import { getSmsCode, login } from '@/api/use.js' // 导入发送验证码与获取token的请求接口
export default {
  data () {
    return {
      mobile: '15088704590', // 手机号13911111111
      code: '246810', // 短信验证码
      time: 6 * 1000, // 验证码倒计时 单位是毫秒
      isCountDownShow: false // 默认倒计时隐藏
    }
  },
  methods: {
    async onSubmit (values) { // 表单的submit事件函数 形参values对应的是表单内所有的提交内容
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data) // 请求回来的token保存在vuex的state中的setUser里
        this.$router.push('my')
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      console.log('submit', values)
    },
    async onSendSms () { // 发送短信验证的函数
      try {
        await this.$refs.form.validate('mobile') // 手机号格式验证 验证通过返回值是undefined 不会执行后面的catch事件
        this.isCountDownShow = true // 验证通过改变互斥变量值切换到发送验证码计时器组件
        try {
          const res = await getSmsCode(this.mobile) // 发起验证码数据请求
          this.$toast.success('发送成功') // this.$toast是vue内置的轻提示方法
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
