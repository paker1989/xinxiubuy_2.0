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
     <userProfile/>
    </div>
    <div class="orderContainer"></div>
   </div><!--content-->
   </div>
  </div>
</template>

<script>
import UserProfile from 'components/userProfileForOrder'

export default {
  name: 'orderWraper',

  components: {
   UserProfile
  },

  data () {
    return {
      selectedOrderStatus : 1// 1 for 当前订单 2 for 已归档
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .orderWraper{
  position:relative;
  width: 70%;
  margin:10px auto;
  padding:30px 15px;
  border-radius:5px;
  border:1px solid #eee;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  

  & .icon{
   vertical-align: text-bottom;
   color: lighten(black,40%);
   margin:0 5px;
   cursor: pointer;
  }

  & .clickable:hover{
   cursor: pointer;
   font-weight:600;
  }

  & .header{
    position:relative;
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom:1px solid #eee;

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

   & .userProfile{
    position:relative;
    width: 30%;
   }

   & .orderContainer{
    position:relative;
    width: 70%;
   }
  }
 }
</style>
