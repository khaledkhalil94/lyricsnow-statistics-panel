// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Error from './components/errors/'
import login from './components/login'
import Msgs from './components/messages/'
import VueRouter from 'vue-router'
import store from './store/'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App, name: 'stats' },
    { path: '/errors', component: Error, name: 'err' },
    { path: '/msgs', component: Msgs, name: 'msgs' },
    { path: '/login', component: login, name: 'login' }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') next()
  const { logged } = store.state
  logged ? next() : next('/login')
})

/* eslint-disable no-new */

new Vue({router, store}).$mount('#app')
