// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filter'

import VueResource from 'vue-resource'

//bxu1: import semantic ui
import '../node_modules/semantic-ui-css/semantic.min.css'
import semantic from '../node_modules/semantic-ui-css/semantic.min.js'

//bxu1: import vue awsome
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';

import Icon from 'vue-awesome/components/Icon.vue';

Vue.use(VueResource)
Vue.component('icon', Icon)

//sync(store,router)

Object.keys(filters).forEach(key => {
	Vue.filter(key,filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, store,
  template: '<App/>',
  components: { App }
})
