import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import MyIcon from '@/components/MyIcon.vue'
import FollowUser from '@/components/FollowUser.vue'
import 'vant/lib/index.less'
import './styles/theme.less'
import '@/styles/index.less'
import * as obj from '@/filters'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('MyIcon', MyIcon)
Vue.component(FollowUser.name, FollowUser)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
