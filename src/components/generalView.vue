<template>
  <div class="generalView">    
    <!-- product collection by categories -->  
    <div class="filterBar">
     <FilterBar/>
    </div>
    <div class="productColWraper">
     <ProductCol :category="'化妆品'"/>
     <ProductCol :category="'母婴用品'"/>
     <ProductCol :category="'未分类'"/>
    </div>

    <!--- end product collection -->
    
    <navHelper :categories="invisibleCategories"/><!--nav helper-->
  </div>
</template>

<script>
  import ProductCol from './productCollection' 
  import NavHelper from './NavHelper'
  import FilterBar from './filterBar'

  export default {
    name: 'generalView',

    components: {
     ProductCol,NavHelper,FilterBar
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
     /* only fire the displayNavHelper function when scroll stops*/
     let timer
     $(window).bind('scroll', () => {
      clearTimeout(timer)
      timer = setTimeout(this.displayNavHelper,150)
     })

     this.displayNavHelper()
    },

    created() {
      this.displayNavHelper()
    }
  }
</script>

<style lang="scss" scoped>
 .generalView{
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: flex-start;

  & .filterBar{
    width: 15%;
   }

  & .productColWraper{
    width: 75%;
    border-left:1px solid #eee;
   }
 }
</style>

