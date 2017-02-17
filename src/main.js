// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//bxu1: import semantic ui
import '../node_modules/semantic-ui-css/semantic.min.css'
import semantic from '../node_modules/semantic-ui-css/semantic.min.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
