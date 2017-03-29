<template>
  <div class="orderWraper">
   <div class="header">
    <div class="backToOrdersContainer">
     <icon name="chevron-left" class="icon"/>
     <router-link :to="'/orders'" class="text-nav clickable">回到订单</router-link>
    </div><!--end backToOrdersContainer--> 
    <div class="orderStatusContainer">
      <span :class="{'orderstatus':true, 'clickable':true, 'actived':selectedOrderStatus==1}"
             @click="selectedOrderStatus=1">当前订单</span>
      <span :class="{'orderstatus':true, 'clickable':true, 'actived':selectedOrderStatus==2}"
             @click="selectedOrderStatus=2">已结束</span>
    </div><!--end backToOrdersContainer--> 
   </div><!--header-->
   <div class="content">
    <div class="userProfile">
     <userProfile :delegateUser="currentUser" v-on:userUpdatedOrCreated="setCurrentUser"/>
    </div><!--end userProfile read-only-->
    <div class="remindWraper" v-if="!currentUser">
      <span class="remindMessage edit">
       <icon name="hand-o-left" class="text-icon" scale="2"/>
       先建用户哦~~
      </span>
    </div>
    <div class="orderContainer" v-if="currentUser">
     <div class="newOrderWraper" >
     	<span class="text-nav bold edit clickable" v-show="!isCreateNewOrder" @click="isCreateNewOrder = true">新建订单</span>
      <span class="text-nav bold edit clickable" v-show="isCreateNewOrder" @click="validStat = 2">保存订单</span>
      <span class="text-nav bold cancel clickable" v-show="isCreateNewOrder" @click="validStat = 3">取消操作</span>
     </div>
     <transition name="fade">
      <!--新建订单-->
      <orderCollapse :collapse="false" v-show="isCreateNewOrder" 
                     :validStat="validStat"
                     v-on:validRes="resumeSave"
                     v-on:resumeCancel="cancelNewOrder"/>
     </transition>
     <!--订单-->
     <orderCollapse :collapse="true" :order="order" v-show="currentUser && selectedOrderStatus==1" 
                    :key="order.uuid" v-for="(order,index) in inProcessOrders"
                    v-on:updateOrder="updateOrder"/>
     <orderCollapse :collapse="true" :order="order" v-show="currentUser && selectedOrderStatus==2" 
                    :key="order.uuid" v-for="(order,index) in endedOrders"
                    v-on:updateOrder="updateOrder"/>
    </div><!--end orderContainer-->
   </div><!--content-->
   </div>
  </div>
</template>

<script>
import UserProfile from 'components/userProfileForOrder'
import OrderCollapse from 'components/orderCollapse'


export default {
  name: 'orderWraper',

  components: {
   UserProfile,OrderCollapse
  },

  data () {
    return {
      selectedOrderStatus     : 1,// 1 for 当前订单 2 for 已归档
      isCreateNewOrder        : false,
      currentUserId           : this.$route.params.id || -1,
      currentUser             : undefined,
      validStat               : 1,//set as 2 to trigger validation, set as 3 to cancel
      inProcessOrders         : [],
      endedOrders             : []
    }
  },

  created() {
   this.currentUser = this.currentUserId == -1?undefined
                    : this.$store.getters.selectedManualUser(this.currentUserId)

    this.updatedOrders()
  },

  methods: {
    resumeSave(newOrder) {
     if(!this.currentUser.orders) this.currentUser.orders = []
     this.currentUser.orders.unshift(newOrder)
   
     this.$store.dispatch('SAVE_OR_UPDATE_ORDER',{user:this.currentUser,order:newOrder}).then((data) => {
      this.updatedOrders()
      this.validStat = 1
      this.isCreateNewOrder = false
     })
    },

    updateOrder(updatedOrder) {
     let findedOrder = this.currentUser.orders.find(order => {return order.uuid == updatedOrder.uuid})
     if(findedOrder){
      findedOrder = updatedOrder
      this.$store.dispatch('SAVE_OR_UPDATE_ORDER',{user  : this.currentUser,
                                                   order : findedOrder,
                                                   update: true})
     }

     this.updatedOrders()
    },

    cancelNewOrder() {
      this.validStat = 1
      this.isCreateNewOrder = false
    },

    setCurrentUser(newOrUpdateUser) {
     this.currentUser = newOrUpdateUser
    },

    updatedOrders() {
     if(!this.currentUser) return
     if(!this.currentUser.orders) this.currentUser.orders = [] 

     this.inProcessOrders = this.currentUser.orders.filter(order => {return order.payStatus == 1}) || []
     this.endedOrders = this.currentUser.orders.filter(order => {return order.payStatus == 2}) || []
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .orderWraper{
  position:relative;
  width: 80%;
  margin:10px auto;
  padding:30px 0;
  border-radius:5px;
  border:1px solid #eee;
  box-shadow: 0 0 10px rgba(0,0,0,.3);

  & .icon{
   vertical-align: text-bottom;
   color: lighten(black,40%);
   margin:0 5px;
   cursor: pointer;
  }

  & .header{
    position:relative;
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom:1px solid #eee;
    padding:0 10px;

   & .backToOrdersContainer,& .orderStatusContainer{
     position:relative;
     text-align: left;  
     display: flex;
     align-items:center;
   }

   & .backToOrdersContainer{
    width: 40%;
   }

   & .orderStatusContainer{
    width: 60%;

    & .orderstatus{
     position:relative;
     margin: 0 20px;
     line-height: 30px;
     transition:all 1s linear; 
    }

    & .actived:after{
      content: '';
      border-top:3px solid #ff5722;
      width: 100%;
      position:absolute;
      bottom:-5px;
      left:0;
    }
   }
  }/*header end*/

  & .content{
   position:relative;
   display: flex;

   & .remindWraper{
    position:relative;
    width: 70%;
    height: 40vh;
    
   & .remindMessage{
    position:absolute;
    top:50%;
    left:50%;
    font-size:30px;
    letter-spacing: .3em;
    font-weight:100;
    transform: translate3d(-50%,-50%,0);
   }
   }

   & .userProfile{
    position:relative;
    width: 30%;
   }

   & .orderContainer{
    position:relative;
    width: 70%;
    padding:20px 50px 0 50px;

    & .newOrderWraper{
      width: 93%;
      text-align: left;
      margin:0 auto 30px auto;
      & > * {
        margin-right: 10px;
      }
    }/* end new order wraper*/
   }/* end orderContainer*/
  }/* end content*/

  & .fade-enter{
    opacity: 0;
    transform: translatey(-10px);
  }

  & .fade-enter-active{
    transition:all .4s linear;
  }
 }
</style>
