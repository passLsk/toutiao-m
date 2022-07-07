import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login', name: 'login', component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children:
      [
        { path: '/home', name: 'home', component: () => import('@/views/Home') },
        { path: '/video', name: 'video', component: () => import('@/views/Video') },
        { path: '/question', name: 'question', component: () => import('@/views/Question') },
        { path: '/my', name: 'my', component: () => import('@/views/My') }
      ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/Search') },
  // params 路由规则配置里设置props值为true 可以实现组件解耦 {{$route.params.article_id}} 简化为 {{article_id}}
  { path: '/article/:article_id', name: 'article', component: () => import('@/views/Article'), props: true }

]
const router = new VueRouter({
  routes
})
export default router
