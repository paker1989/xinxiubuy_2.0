<template>
  <div class="header">
   <div :class="{'defaultHeader':true,'leaveTop':isLeaveTop}">
    <label class="logo">秀秀巴黎购</label>
    <label class="login"><icon name="user" class="icon"></icon>
     <router-link to="/authentication" class="text-nav">登录</router-link>
    </label>  
   </div>
   <div :class="{'newHeader':true, 'initialHidden':true,'leaveTop':isLeaveTop}">
    <div class="left-container">
      <router-link to="/foo" class="text-nav">首页</router-link>
      <router-link to="/foo" class="text-nav">About me</router-link>
      <router-link to="/upload" class="text-nav">上传产品</router-link>
      <router-link to="/itemList" class="text-nav">库存</router-link>
      <router-link to="/xinxiuRecCats" class="text-nav">店长推荐</router-link>
    </div>
    <div class="right-container">
       <router-link to="/authentication" class="text-nav">登录</router-link>
       <router-link to="/foo">
         <icon name="heart-o"  aria-hidden="true" scale="1"/>
         <!--
         <span v-if="nbWishes>0" :class="wishStatus">({{nbWishes}})</span>
         -->
       </router-link>
       <div>
         <icon name="search" aria-hidden="true" class="icon" scale="1"/></span>
       </div>   
    </div>
   </div> 
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
     isLeaveTop:false
    }
  },

  mounted() {
   let timer,scrollTop,navbarscrollTop

   $(window).bind('scroll',() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        scrollTop = $(window).scrollTop()
        navbarscrollTop = $(".screen-navbar").offset().top

        this.isLeaveTop = scrollTop>navbarscrollTop?true:false
      },150)
   })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $headerHeight : 46px;

 @mixin basicStyle{
    top:0;
    /*color:darken(#eee,40%);*/
    
    /*
    color:lighten(black,4%);
    background: white;
    */
   /* background:darken(#ff5722,8%);*/
    /*background:white;*/
    
    background: lighten(black,30%);
    color:white;
    
 }

 .header{
  position: fixed;
  @include basicStyle
  height: $headerHeight;
  width: 100%;
  overflow:hidden;
  z-index: 999;
  font-size: 14px;
  font-weight: 500;
    border-bottom:1px solid #eee;

  & .defaultHeader, & .newHeader{
    position:relative;
    top:0;
    height: $headerHeight;
    margin:0 auto;
    transition:top .2s linear;

   & .login{
     display: block;  
     position:absolute;
     right:10%;
     top:$headerHeight/3;
     cursor: pointer;
     letter-spacing: 5px;

     & > * {
     display: inline;
     }

     & .icon{
      display: inline;
      vertical-align: text-bottom;
      margin-right: 8px;
      }

     & .text-nav{
      color: white;
     }
    }

    & .logo{
     display: block;  
     position:absolute;
     left:5%;
     top:$headerHeight/3;
     cursor: pointer;
     letter-spacing: 5px; 
    }
  }

  & .defaultHeader{
   width: 100%;
   background: lighten(black,30%);
   color:white;
  }

  & .newHeader{
   background: white;
   color:lighten(black,40%);
   display:flex;
   justify-content: space-between;
   padding:0 10%;
   flex-wrap: nowrap;

   & > *{
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items:center;
    font-size: 13px;

    & a:hover{
     color: #ff5722;
     font-weight: 600;
    }
   }

   & .left-container{
    width: 35%;
   }

   & .right-container{
    width: 12%;

     &  * {
      vertical-align: text-bottom;
     }

    & a{
     color: black;   
    }
   }
  }

  & .initialHidden{
    top:$headerHeight;
  }
  
  /*
  & .popHeader{
    @include basicStyle;
    position:fixed;
    height: $headerHeight;
    z-index: 999;
    top:-$headerHeight;;

    &.active{
    top: 0;
    transition:top .2s ease-out;
    }
  }
  */
  & .leaveTop{
    top:-$headerHeight;
    transition:top .2s linear;
  }
 }
</style>
