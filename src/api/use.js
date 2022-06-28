import request from '@/utils/request.js'
import store from '@/store' // this只能在组件里使用 所以想要用store里的数据需要手动导入store
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}
