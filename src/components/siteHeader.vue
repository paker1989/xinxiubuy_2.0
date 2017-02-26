<template>
  <div class="header">
   <div class="defaultHeader" v-if="!displayFixedHeader">
    <p class="logo">秀秀巴黎购</p>
    <p class="login"><icon name="user" class="icon"></icon><span>登录</span></p>
   </div>
   <div :class="{'popHeader':true,'active':displayFixedHeader}">
    <p class="logo">秀秀巴黎购</p>
    <p class="login"><icon name="user" class="icon"></icon><span>登录</span></p>
   </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
     displayFixedHeader:false
    }
  },

  computed: {

  },

  mounted() {
   let timer,scrollTop


   $(window).bind('scroll',() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        scrollTop = $(window).scrollTop()
        this.displayFixedHeader = scrollTop>50?true:false
        console.log(this.displayFixedHeader)
      },150)
   })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $headerHeight : 40px;

 @mixin basicStyle{
    width: 100%;
    top:0;
    /*background: lighten(black,20%);*/
    /*background:darken(#ff5722,29%);*/
    background:darken(#eee,60%);
 }

 .header{
  & .defaultHeader{
    @include basicStyle
    position: absolute;
    height: $headerHeight;
  }
  
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

  & .login{
   display: block;  
   position:absolute;
   right:10%;
   top:$headerHeight/4;
   color:white;
   cursor: pointer;
   letter-spacing: 5px;

   & > * {
   display: inline;
   font-size: 13px;
   }

   & .icon{
    color:white;
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
   color:white;
   cursor: pointer;
   letter-spacing: 5px; 
  }

 }
</style>
