/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import VueRouter from 'vue-router'
import Vue from "vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/Home.vue')
  },
  {
    path: '/about',
    component: () => import('@/About.vue')
  }
]
export default new VueRouter({
  //mode: 'history', // 去掉url中的#
  routes: routes
})