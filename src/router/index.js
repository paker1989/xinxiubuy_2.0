import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/generalView'
import productDetail from 'components/productDetail'
import productUploader from 'components/productUploader'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/upload', name: 'productUploader',component: productUploader},
 {path: '/product/:id',name: 'productDetail', component: productDetail},
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})
