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
  }
]
const router = new VueRouter({
  routes
})
export default router
