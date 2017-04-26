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
     <router-link class="text-nav clickable" :to="'/order/orderstatus/1'">新建客户</router-link>
   </div>
   <div class="orderSearchContainer">
     <label class="text-nav">你的客户</label>
     <div class="inline-block">
      <CustInput  :placeholder="'搜索订单号，用户名，产品名'" 
                  :cusWidth="'250'" 
                  :icon="'search'"
                  v-on:modelEmited="searchOrder"/>
     </div>
   </div>
   <div class="layoutContainer">
     <!-- 以后再做 -->
     <div class="inline-block" @click="isDisplayAsList=false"><icon name="th" class="icon" scale="1.1"/></div>
     <div class="inline-block" @click="isDisplayAsList=true"><icon name="list" class="icon" scale="1.1"/></div>
   </div>
   <div class="orderContainer">
     <table class="ui celled table" v-show="isDisplayAsList">
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
        <tr v-for="(item,index) in userMatchedItems" v-bind:key="index" mode="outer-in">
          <td>{{item.userName}}</td>
          <td>{{item.phoneNumber}}</td>
          <td><router-link class="order-clickable" :to="'/order/'+item.userId+'/orderstatus/1'">{{item.nbCurrentOrders}}</router-link></td>
          <td><router-link class="order-clickable" :to="'/order/'+item.userId+'/orderstatus/2'">{{item.nbArchiveOrders}}</router-link></td>
          <td>
           <router-link class="text-nav text-edit clickable" :to="'/order/'+item.userId+'/orderstatus/1'">编辑</router-link>
           <span class="text-nav text-remove clickable" @click="removeUser(index)">移除</span>
          </td>
        </tr>
        <tr v-bind:key="'defaultMessage'" v-if="userItems.length==0"><td class="defaultMessage" colspan="5">建立你的第一个客户吧~~</td></tr>
       </transition-group>
     </table><!--end table-->
     <div class="orderGridWraper" v-show="!isDisplayAsList">
       <div class="userOrderCard" v-for="(item,index) in userMatchedItems" @click="checkOutOrder(index)">
         <p class="text-title bold">{{item.userName}}</p>
         <p>{{item.phone}}</p>
       </div>
     </div><!--end orderGridWraper-->
   </div><!-- end order Container -->
  </div>
</template>

<script>
import CustInput from 'components/custTag/custInput'
import CustCheckbox from 'components/custTag/CustCheckbox'
import store from '../../store'

import staticOrderJson from 'assets/orders'

export default {
  name: 'orders',

  data() {
   return {
    tag              : {tagName : '示例标签'},
    inSearch         : false,
  //orders           : [],
    userItems        : [],
    userMatchedItems : [],
    isDisplayAsList  : true
   }
  },

  beforeRouteEnter(to,from,next) {
   store.dispatch('FETCH_MANUAL_USERS').then(() =>{
    next()
   }) 
  },

  components: {
   CustInput, CustCheckbox
  },

  created() {
    this.userItems = this.$store.getters.allManualUsers.map( user => {
     user.nbCurrentOrders = user.orders.filter(order => {return order.payStatus == 1}).length
     user.nbArchiveOrders = user.orders.length - user.nbCurrentOrders
     return user
    })

    this.userMatchedItems = this.userItems.slice(0)
  },

  computed() {
  },

  methods: {
   toggleSearch() {
    this.inSearch = !this.inSearch
   },

   checkOutOrder(index) {
    this.$router.replace('/order/'+this.userMatchedItems[index].userId)
   },

   searchOrder(keyWord) {
    if(keyWord.trim().length==0){
     this.userMatchedItems = this.userItems.slice(0)
     return
    }
    keyWord = keyWord.replace(/^\s+|\s+$/g,'')
    let matchedOrder = this.userItems.filter( order => { 
      let matchedFlag = false
      if(order.userName.includes(keyWord)) matchedFlag = true
      if(order.userItems){
        order.userItems.forEach( item => {
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
   },

   removeUser(index) {
    /* TO DO */
    console.log('to do : '+index)
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

  & .newOrderContainer,& .orderSearchContainer, & .orderContainer, & .layoutContainer{
   position:relative;
   margin: 0 auto 25px auto;
   width: 60%;
   text-align: left;
  }

  & .layoutContainer{
   text-align: right;
  }

  & .orderSearchContainer{
   margin-bottom: 0px;
  }

  & .orderContainer{
   & .header-class{
    background: #eee;
    color:lighten(black,40%);
    letter-spacing: 2px;
    font-weight: 600;
   }
   
   & .defaultMessage{
    text-align: center;
   }

   & .text-edit{
    color:#6ba045;
   }

   & .text-remove{
    color: lighten(red,10%);
   }

   
   & .order-clickable{
    color:black;
    text-decoration:underline;
    font-size:16px;
    cursor: pointer;
   }
   

   & .orderGridWraper{
    position:relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    & .userOrderCard{
      border:1px solid #dddddd;
      border-radius: 3px;
      padding:50px 20px;
      text-align:center;
      background:lighten(#dddddd,4%);
      margin:0 2em;


      &:hover{
       cursor: pointer;
       background:#dddddd;
       box-shadow:0px 13px 21px -5px rgba(0, 0, 0, 0.3);
      }
    }
   }
  }/* end order container*/
  
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
