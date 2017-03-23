import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/views/generalView'
import productDetailWraper from 'components/views/productDetailWraper'
import productUploader from 'components/wraper/uploader'
import orders from 'components/views/orders'
import orderWraper from 'components/views/orderWraper'
import xinxiuRecCats from 'components/views/xinxiuRecCats'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/upload', name: 'productUploader',component: productUploader},
 {path: '/product/:id',name: 'productDetailWraper', component: productDetailWraper},
 {path: '/order/:id?',name: 'orderWraper', component: orderWraper},
 {path: '/orders',name: 'orders', component: orders,meta: {keepAlive:true}},
 {path: '/xinxiuRecCats',name: 'xinxiuRecCats', component: xinxiuRecCats},
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})

