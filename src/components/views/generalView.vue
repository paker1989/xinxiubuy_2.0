<template>
  <div class="generalView">    
    <!-- product collection by categories -->  
    <div class="filterBar">
     <FilterBar :usersCats="userCategories" v-on:updateCategory="updateCategory"/>
    </div>
    <div class="productColWraper">
      <transition-group name="productCols">
       <productCol v-for="category in userCategories" :category="category" :key="category"/>
      </transition-group>
    </div>

    <!--- end product collection -->
    
    <navHelper :categories="invisibleCategories"/><!--nav helper-->
  </div>
</template>

<script>
  import ProductCol from 'components/wraper/productCollection' 
  import NavHelper from 'components//NavHelper'
  import FilterBar from 'components/filterBar'
  import store from '../../store'
  import Vue from 'vue'

  export default {
    name: 'generalView',

    components: {
     ProductCol,NavHelper,FilterBar
    },

    data() {
     return {
      userCategories: [],
      invisibleCategories:[]
     }
    },

    beforeRouteEnter(to,from,next) {
     store.dispatch('FETCH_ITEM_FOR_TAG',{value:store.state.currentUser.selectedTags}).then(() =>{
      next()
     })
     
    },

    methods: {
     fetchCategories() {
       this.userCategories = []
       let currentUserSelectedTags = this.$store.state.currentUser.selectedTags
       for(let i=0;i<currentUserSelectedTags.length;i++){
        this.userCategories.push(currentUserSelectedTags[i])
       }
     },

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
     },

     updateCategory(tagName,isToAdd) {
      if(this.userCategories.indexOf(tagName)>-1 && isToAdd == false){
       this.userCategories.splice( this.userCategories.indexOf(tagName),1)
      }
      else if(this.userCategories.indexOf(tagName)<0 && isToAdd){
       this.userCategories.unshift(tagName)
      }
     }
    },

    mounted() {
     console.log('generalView mounted')
     this.fetchCategories()
     /* only fire the displayNavHelper function when scroll stops*/
     let timer
     $(window).bind('scroll', () => {
      clearTimeout(timer)
      timer = setTimeout(this.displayNavHelper,150)
     })

     this.displayNavHelper()
    },

    created() {
      console.log('generalView created')
      this.fetchCategories()
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

    & .productCols-enter-active{
     transition: all 1s linear;
    }
   
    & .productCols-enter{
     opacity: 0;
     transform:translateY(-50px);
    }

    & .productCols-move{
     transition: transform 1s;
    }

   }
 }
</style>

