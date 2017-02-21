<template>
  <div id="app">
    <div class="title">
     <h1 class="text-title grand-title">秀秀巴黎购</h1>
     <h3 class="text-tag">母婴用品,化妆品,包包</h3>
    </div><!-- title -->

    <navbar/><!-- nav bar-->
    
    <!-- product collection by categories -->  
     <ProductCol :category="'化妆品'"/>
     <ProductCol :category="'母婴用品'"/>
     <ProductCol :category="'未分类'"/>
    <!--- end product collection -->
    
    <navHelper :categories="invisibleCategories"/><!--nav helper-->

   <!-- style preview -->
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

    <router-view></router-view>
  </div>
</template>

<script>
  import ProductCol from './components/productCollection' 
  import Navbar from './components/navbar'
  import NavHelper from './components/NavHelper'
 // import { handleScroll } from './general'

  export default {
    name: 'app',

    components: {
     ProductCol,Navbar,NavHelper
    },

    data() {
     return {
      invisibleCategories:[]
     }
    },

    methods: {
     displayNavHelper() {
      let presetOffset = 500
      let eles = $('.category-info .text-title')
      this.invisibleCategories = []

      let windowHeight = $(window).height()
      let scrollTop = $(window).scrollTop()

      eles.each( category => {
        let item = $(eles[category])
        let eleTop = item.offset().top
        let eleHeight = item.height()
        let inVisible = ((windowHeight+scrollTop)<(eleTop+eleHeight) || (scrollTop>eleTop))

        if(inVisible === true){
          this.invisibleCategories.push({label:item.text(),eleTop:eleTop+eleHeight+presetOffset})
        }
      })   
     }
    },

    mounted() {
     $('.dropdown').dropdown()
     
     /* only fire the displayNavHelper function when scroll stops*/
     let timer
     $(window).bind('scroll', () => {
      clearTimeout(timer)
      timer = setTimeout(this.displayNavHelper,500)
     })

     this.displayNavHelper()
    },

    created() {
      this.displayNavHelper()
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

-->
