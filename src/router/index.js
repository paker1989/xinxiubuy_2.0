import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/generalView'
import productDetail from 'components/productDetail'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/product/:id',name: 'productDetail', component: productDetail},
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})
