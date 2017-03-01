import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/generalView'
import productDetail from 'components/productDetail'
import productUploader from 'components/productUploader'
import itemList from 'components/itemList'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/upload', name: 'productUploader',component: productUploader},
 {path: '/product/:id',name: 'productDetail', component: productDetail},
 {path: '/itemList',name: 'itemList', component: itemList},
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})
