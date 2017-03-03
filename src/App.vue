<template>
  <div id="app">
    <SiteHeader/>
    <div class="title">
     <h1 class="text-title grand-title">秀秀巴黎购</h1>
     <h3 class="text-tag">母婴用品,化妆品,包包</h3>
    </div><!-- title -->
    <navbar/><!-- nav bar-->
    <router-view></router-view>
  </div>
</template>

<script>
  import SiteHeader from './components/siteHeader'
  import Navbar from './components/navbar'

  export default {
    name: 'app',

    components: {
     SiteHeader,Navbar
    },

    data() {
     return {
    
     }
    },

    methods: {

    },

    mounted() {
     $('.dropdown').dropdown()
     
     /* only fire the displayNavHelper function when scroll stops*/
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
  min-height: 600px;

  & .title {
    margin: 60px auto;

    & > * {
     margin: 6px auto;
    }

    & .grand-title {
    font-size:20px;
    font-weight:900;
   }
  }
  /* end title*/
}
</style>

    
<!--
    <div id="test">
     <icon name="facebook" scale="2" spin flip="vertical"></icon>
    </div>


      console.log('windows height = '+$(window).height())
      console.log('scroll top = '+$(window).scrollTop())
      console.log('ele offset top = '+$(eles[1]).offset().top)
      console.log('ele height = '+$(eles[1]).height())

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


-->
