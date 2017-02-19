<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="title">
     <h1 class="text-title grand-title">秀秀巴黎购</h1>
     <h3 class="text-tag">母婴用品,化妆品,包包</h3>
    </div><!-- title -->
    <div class="navbar">
      <router-link to="/foo" class="text-nav">首页</router-link>
      <router-link to="/foo" class="text-nav">About me</router-link>
      <router-link to="/foo" class="text-nav">上传产品</router-link>
      <router-link to="/foo" class="text-nav">文章</router-link>
      <router-link to="/foo" class="text-nav">库存</router-link>
    </div><!-- navbar : menu in big screen -->
    
    <div class="device-navbar-wraper">
      <div class="ui compact menu">
          <div class="ui dropdown item">
          <icon name="bars" class="icon icon-gray"></icon>
           <span class="text-title">菜单</span>
          <div class="menu">
            <router-link to="/foo" class="item text-nav">首页</router-link>
            <router-link to="/foo" class="item text-nav">About me</router-link>
            <router-link to="/foo" class="item text-nav">上传产品</router-link>
            <router-link to="/foo" class="item text-nav">文章</router-link>
            <router-link to="/foo" class="item text-nav">库存</router-link>
          </div>
        </div>
      </div>
    </div> <!-- menu in small screen -->


    <div style="display:none">
      <span class="text-nav">首页</span>
      <span class="text-title">共享此文章：</span>
      <span class="text-title">暖冬 小田原</span>
      <span class="text-tag">span basic 打扫</span>
      <span class="text-content">我还接受以下工作订单：
      1.平面设计（LOGO，宣传页，海报，菜单等）
      2.摄影摄像（美食，人像，生活方式，旅行跟拍等）
      3.专栏写作（生活方式，极简主义等）
      4.中文日文互译（资料翻译，文章翻译等）
      5.日语会话练习（提供基础日语的入门教课，和中高级日语的会话练习）
      6.猎书，代购图书（帮助寻找原版，绝版的日文书籍）
      </span>
      <div class="action-btn">发表</div>
    </div>
    
    <!-- product collection by categories -->
   
     <ProductCol :category="'化妆品'"/>
     <ProductCol :category="'母婴用品'"/>
     <ProductCol :category="'未分类'"/>

    <!--- end product collection ->
    
<!--
    <div id="test">
     <icon name="facebook" scale="2" spin flip="vertical"></icon>
    </div>
  -->


    <router-view></router-view>
  </div>
</template>

<script>
  import ProductCol from './components/productCollection' 

  export default {
    name: 'app',

    components: {
     ProductCol
    },

    mounted() {
     $('.dropdown').dropdown()
    }
  }
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  & .title {
    margin: 40px auto;

    & > * {
     margin: 6px auto;
    }

    & .grand-title {
    font-size:20px;
    font-weight:900;
   }
  }
  /* end title*/

  & .navbar {
    @media
    only screen and (max-width: 500px)
   /* only screen and (max-device-width: 320px) */
     {
     display: none;
    }

    @media
    only screen and (min-width: 500px)
   /* only screen and (min-device-width:320px) */
   {
     margin: 0 auto;
     display: flex;
     justify-content: center;
     flex-wrap: nowrap;
     flex-direction: row;

      & a {
       margin: 0 2em;

       &:hover {
        color:black;
        font-weight: bold;
        transform: scale(1.2);
        transition: all .2s linear;
       }
      }

    }

  }
  /* end navbar */

  & .device-navbar-wraper {
   
    @media only screen and (min-width: 500px) {
     display: none;
    }
  
  & .ui.menu {
   border: none;
   box-shadow:none;
  } 

  & .icon-gray {
   color: #999999;
   margin-right: .3em;
  }

  }

}
 




</style>
