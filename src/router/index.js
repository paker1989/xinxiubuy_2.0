import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/views/generalView'
import productDetailWraper from 'components/views/productDetailWraper'
import productUploader from 'components/wraper/uploader'
import wishItemList from 'components/views/wishItemList'
import xinxiuRecCats from 'components/views/xinxiuRecCats'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/upload', name: 'productUploader',component: productUploader},
 {path: '/product/:id',name: 'productDetailWraper', component: productDetailWraper},
 {path: '/itemList',name: 'itemList', component: wishItemList},
 {path: '/xinxiuRecCats',name: 'xinxiuRecCats', component: xinxiuRecCats},
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})

