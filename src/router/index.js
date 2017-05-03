import Vue from 'vue'
import Router from 'vue-router'
import generalView from 'components/views/generalView'
import productDetailWraper from 'components/views/productDetailWraper'
import productUploader from 'components/wraper/uploader'
import orders from 'components/views/orders'
import orderWraper from 'components/views/orderWraper'
import xinxiuRecCats from 'components/views/xinxiuRecCats'
import myspace from 'components/views/myspace/myspace'
import userWishes from 'components/views/myspace/childrens/userWishes/userWishes'
import userOrders from 'components/views/myspace/childrens/userOrders'
import userProfile from 'components/views/myspace/childrens/userProfile/userProfile'
import homepage from 'components/views/homepage/homepage'


//temp
import authentication from 'components/authentication'

Vue.use(Router)

const routes = [
 {path: '/', name: 'generalView',component: generalView},
 {path: '/upload/:id?', name: 'productUploader',component: productUploader},
 {path: '/product/:id',name: 'productDetailWraper', component: productDetailWraper},
 {path: '/order/:id?/orderStatus/:status?',name: 'orderWraper', component: orderWraper},
 {path: '/orders',name: 'orders', component: orders,meta: {keepAlive:true}},
 {path: '/xinxiuRecCats',name: 'xinxiuRecCats', component: xinxiuRecCats},
 {path: '/authentication',name: 'authentication', component: authentication},
 {path: '/homepage',name: 'homepage', component: homepage},
 {path: '/myspace',
  name: 'myspace', 
  component: myspace,
  children: [
   {path:'wishes',component:userWishes},
   {path:'orders',component:userOrders},
   {path:'profile',component:userProfile}
  ]
   },
 {path: '/foo', redirect:'/'}
]

export default new Router({
  routes
})

