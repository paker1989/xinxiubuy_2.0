<template>
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
</template>

<script>
export default {
  name: 'homePage',

  props: ['itemList'],

  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

   
</style>
