<template>
  <div class="myspace">    
    <div class="jumbtron" :style="jumbtronBg"></div>
    <div class="header">
     <div class="welcomeContainer">
      <span style="font-size:30px;" class="inline">遇到你真美好, <i style="font-size:18px;">{{user.username}}</i></span>
     </div><!--welcomeContainer-->
     <div class="menuContainer">
       <span :class="{'item clickable':true,'active':currentChild == 'wishes'}"
             @click="toChild('wishes')">收藏
       </span>
     <!--
       <span :class="{'item clickable':true,'active':currentChild == 'orders'}" 
              @click="toChild('orders')">订单
       </span>
      -->
       <span :class="{'item clickable':true,'active':currentChild == 'profile'}"
             @click="toChild('profile')">简介
       </span>
     </div><!--menuContainer-->
    </div><!-- header -->
    <div class="content">
     <keep-alive>
       <router-view></router-view>
     </keep-alive>   
    </div><!--end content-->
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'myspace',

  beforeRouteEnter(to,from,next) {
     Vue.http.get('/authenticatedUser').then(res => {
     if(res.body.user){
      sessionStorage.setItem('authenticatedUser',JSON.stringify(res.body.user))
      next()
     }
     else{
      next('/')
      //next({ path : '/upload' })
     }

  //   console.log(sessionStorage.getItem('authenticatedUser'))
   })
  },
 
  data() {
   return {
    currentChild : 'wishes',
    user         :  JSON.parse(sessionStorage.getItem('authenticatedUser'))
   }
  },

  created() {

  },

  methods: {  
   toChild(childName) {
    this.currentChild = childName
    this.$router.replace('/myspace/'+childName)
   }
  },

  computed: {
   jumbtronBg() {
    return {
     backgroundImage: 'url('+'\''+'/static/jumbtron/jumbtron3.png'+'\')'
    }
   }
  }
}
</script>

<style lang="scss" scoped>
 .myspace{
  position: relative;
  width: 100%;
  
  & > * {
   width: 100%;
   position:relative;
  }

  & a{
   color:black;
  }

  & .jumbtron{
    min-height: 25vh;
    background-size: cover;
  }/* end jumbtron */

  & .header{
   background-color:hsla(0, 0%, 93.3%, .6);

   & .welcomeContainer{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left:100px;

   }/*end welcomeContainer*/

   & .menuContainer{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left:100px;

    & .item{
     position:relative;
     margin-right: 6em;
     padding:0 .7em .7em .7em;
     font-size: 1.2em;
     opacity: .8;
    /* border-bottom: 3px solid #ff5722;*/
    }

    & .item:after{
     content: '';
     position:absolute;
     border-bottom:3px solid #ff5722;
     transform: scale(0);
     width: 100%;
     left: 0;
     bottom: 0;
     transition: transform .2s linear;     
    }

    & .item.active:after{
     transform:scale(1);
     transform-origin: center;
    }
   }/*end menuContainer*/

  }/*end header*/

  & .content{
   position:relative;
   width: 100%;
  }
 }
</style>

