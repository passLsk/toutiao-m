import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login', name: 'Login', component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children:
      [
        { path: '/home', name: 'Home', component: () => import('@/views/Home') },
        { path: '/video', name: 'Video', component: () => import('@/views/Video') },
        { path: '/question', name: 'Question', component: () => import('@/views/Question') },
        { path: '/my', name: 'My', component: () => import('@/views/My') }
      ]
  }
]
const router = new VueRouter({
  routes
})
export default router
