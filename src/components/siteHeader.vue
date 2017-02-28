<template>
  <div class="header">
   <div :class="{'defaultHeader':true,'leaveTop':isLeaveTop}">
    <p class="logo">秀秀巴黎购</p>
    <p class="login"><icon name="user" class="icon"></icon><span>登录</span></p>  
   </div>
   <div :class="{'defaultHeader':true, 'initialHidden':true,'leaveTop':isLeaveTop}">
    <p class="logo">秀秀巴黎购</p>
    <p class="login"><icon name="user" class="icon"></icon><span>测试</span></p>
   </div> 
<!--
   <div :class="{'popHeader':true,'active':displayFixedHeader}">
    <p class="logo">秀秀巴黎购</p>
    <p class="login"><icon name="user" class="icon"></icon><span>登录</span></p>
   </div>
-->
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

  computed: {

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
    width: 100%;
    top:0;
    /*color:darken(#eee,40%);*/
    color:white;
    background: lighten(black,30%);
    /*background:darken(#ff5722,29%);*/
    /*background:white;*/
 }

 .header{
  position: fixed;
  @include basicStyle
  height: $headerHeight;
  overflow:hidden;
  z-index: 999;

  border:1px solid darken(#eee,5%);
  font-size: 15px;
  font-weight: 500;

  & .defaultHeader{
    position:relative;
    @include basicStyle
    height: $headerHeight;
    transition:top .2s linear;

   & .login{
     display: block;  
     position:absolute;
     right:10%;
     top:$headerHeight/4;
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
    }

    & .logo{
     display: block;  
     position:absolute;
     left:5%;
     top:$headerHeight/4;
     cursor: pointer;
     letter-spacing: 5px; 
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
