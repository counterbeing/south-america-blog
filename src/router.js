import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/20140625_uruguay_colonia',
    },
    {
      path: '/:destination_id/',
      name: 'destination',
      component: Layout,
    },
  ],
})
