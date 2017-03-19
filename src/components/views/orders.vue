<template>
  <div class="orders">
 <!--
    <custInput :type="'input'" :placeholder="'姓名'" />
    <custInput :type="'input'" :placeholder="'姓名'" :cusWidth="'400'"/>
    <custInput :type="'textarea'" :placeholder="'姓名'" :cusWidth="'400'"/>
    <custCheckbox :tag="tag"/>
  -->
   <div class="newOrderContainer">
     <icon name="plus" class="icon icon-green"  aria-hidden="true"/>
     <label class="text-nav">新建订单</label>
   </div>
   <div class="orderSearchContainer">
     <label class="text-nav">你的订单</label>
     <div class="inline-block">
      <CustInput  :placeholder="'搜索订单号，用户名，产品名'" 
                  :cusWidth="'250'" 
                  :icon="'search'"
                  v-on:modelEmited="searchOrder"/>
     </div>
   </div>
   <div class="orderContainer">
     <table class="ui celled table">
      <thead>
         <tr>
           <td class="header-class">用户</td>
           <td class="header-class">电话</td>
           <td class="header-class">订单数量</td>
           <td class="header-class">归档订单</td>
           <td class="header-class">操作</td>
         </tr>
      </thead>
      
       <transition-group name="matchedItems" tag="tbody">
        <tr v-for="item in userMatchedItems" v-bind:key="item" mode="outer-in">
          <td>{{item.userName}}</td>
          <td>{{item.phone}}</td>
          <td><router-link class="clickable" :to="'/order/'+item.userId">{{item.nbCurrentOrders}}</router-link></td>
          <td><router-link class="clickable" :to="'/order/'+item.userId">{{item.nbArchiveOrders}}</router-link></td>
          <td>
           <span class="text-nav text-edit">编辑</span>
           <span class="text-nav text-remove">移除</span>
          </td>
        </tr>
       </transition-group>
   
     </table>
   </div>
  </div>
</template>

<script>
import CustInput from 'components/rawHtmlComponent/custInput'
import CustCheckbox from 'components/rawHtmlComponent/CustCheckbox'

import staticOrderJson from 'assets/orders'

export default {
  name: 'orders',

  data() {
   return {
    tag              : {tagName : '示例标签'},
    inSearch         : false,
    orders           : [],
    userItems        : [],
    userMatchedItems : []
   }
  },

  components: {
   CustInput, CustCheckbox
  },

  created() {
    //wrap all in orders
    staticOrderJson.forEach( order => {
     let orderObj = {}
     orderObj.userId = order.userId
     orderObj.userName = order.userName
     orderObj.phoneNumber = order.phoneNumber
     orderObj.coordonnee = order.coordonnee   

     if(order.orders){
      orderObj.orders = new Array()
      order.orders.forEach( perOrder => {
 	     let orderDetail = {}
	     orderDetail.orderNumber = perOrder.orderNumber
	     orderDetail.orderDate = perOrder.orderDate
	     orderDetail.payStatus = perOrder.payStatus
	     
	     if(order.payStatus == 1){
	      orderDetail.payType = perOrder.payType
	     }

	     if(perOrder.orderedProducts){
	      orderDetail.orderedProducts = new Array()
	      perOrder.orderedProducts.forEach( product => {
	       let orderedItem = {}
           orderedItem.productName = product.productName
           orderedItem.picturePath = product.picturePath?product.picturePath:''
           orderedItem.orderedNumber = product.orderedNumber
           orderedItem.price = product.price

           orderDetail.orderedProducts.push(orderedItem)
	      })
	     }
	     orderObj.orders.push(orderDetail)
      })
     }
     this.orders.push(orderObj)

    //wrap user items
    if(this.userItems.find( user => {return user.userName == order.userName}) == undefined){
      this.userItems.push({
       userId          : order.userId,
       userName        : order.userName,
       phone           : order.phoneNumber,
       nbCurrentOrders : order.orders?order.orders.filter( order => { return order.payStatus == 1}).length:0,
       nbArchiveOrders : order.orders?order.orders.filter( order => { return order.payStatus == 2}).length:0
      })
    }

   })
   this.userMatchedItems = this.userItems.slice(0)
  },

  computed() {
  },

  methods: {
   toggleSearch() {
    this.inSearch = !this.inSearch
   },

   searchOrder(keyWord) {
    if(keyWord.trim().length==0){
     this.userMatchedItems = this.userItems.slice(0)
     return
    }
    keyWord = keyWord.replace(/^\s+|\s+$/g,'')
    
    let matchedOrder = this.orders.filter( order => { 
      let matchedFlag = false
      if(order.userName.includes(keyWord)) matchedFlag = true
      if(order.orders){
        order.orders.forEach( item => {
         if(item.orderNumber.includes(keyWord)) matchedFlag = true
         if(item.orderedProducts){
          item.orderedProducts.forEach( product => {
           if(product.productName.includes(keyWord)) matchedFlag = true
          })
         }
        })
      }
      return matchedFlag
     })
     .map( order => {return order.userName})
     
     if(matchedOrder == undefined || matchedOrder.length == 0){
      this.userMatchedItems = []
      return      
     }

     this.userMatchedItems = this.userItems.filter( item => {
      let isMatch = false
      matchedOrder.forEach( matchedUserName => {
       if(matchedUserName == item.userName) isMatch = true
      })
      return isMatch
     })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .orders{
  margin-top: 20px;
  width: 100%;
  position: relative;

  & .icon{
   vertical-align: text-bottom;
   color: lighten(black,40%);
   margin:0 3px;
   cursor: pointer;

   &:hover{
    color: black;
   }
  }

  & .icon-green{
   color:#6ba045;
  }

  & .newOrderContainer,& .orderSearchContainer, & .orderContainer{
   position:relative;
   margin: 0 auto 30px auto;
   width: 60%;
   text-align: left;
  }

  & .orderContainer{
   & .header-class{
    background: #eee;
    color:lighten(black,40%);
    letter-spacing: 2px;
    font-weight: 600;
   }

   & .text-edit{
    color:#6ba045;
   }

   & .text-remove{
    color: lighten(red,10%);
   }

   & .clickable{
    color:black;
    text-decoration:underline;
    font-size:16px;
    cursor: pointer;
   }
  }
  
  & .matchedItems-enter-active, .matchedItems-leave-active{
      transition : all .4s ease;
  }

  & .matchedItems-enter, .matchedItems-leave-active{
      transform: scaleY(0);
      transform-origin:top;
  }

  & .matchedItems-move{
   transition: transform 1s;
  }
  
 }
</style>
