<template>
  <div class="userWishList">
   <div class="wishItemContainer">
     <productCard class="productWraper" v-for="item in displayList"
                 :product="item" :limitedText="50"/> 
   </div><!--wishItemContainer end-->
  </div>
</template>

<script>
import ProductCard from 'components/productCard'
import { debounce } from '../../util'

export default {
  name: 'userWishList', 

 // props:['userId'],

  data() {
    return {
     wishList    : [],
     displayList : [],
     timer       : null
    }
  },

  components: {
   ProductCard
  },

  created() {
   // console.log(this.user.wishedList)
    let user = JSON.parse(sessionStorage.getItem('authenticatedUser'))
    //console.log(user.wishedList.length)
    user.wishedList.forEach( productId => {
      this.$http.post('/getProductById',{ id : productId}).then( res => {
        if(res.body.product){
           this.wishList.push(res.body.product)
          this.displayList.push(res.body.product)         
        }

      })
    }) 
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize',this.resizeWindow)
    //  this.resizeWindow()
    })  
  },

  methods: {
    resizeWindow(event) {
      //console.log('wishItemContainer : '+$('.wishItemContainer').innerWidth())
      //console.log('item : '+$('.productWraper').outerWidth(true))
      if(this.timer) clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        let containerWidth = $('.wishItemContainer').innerWidth(),
            itemOuterWidth = $('.productWraper').outerWidth(true)|| 228,
            eleNumber      = Math.floor(containerWidth/itemOuterWidth) 

            this.displayList = this.wishList.slice(0,eleNumber)
          },100)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .userWishList{
  width: 100%;

  & .productWraper{
    width:220px;
    height:300px;
    border:1px solid darken(#eaebec,4%);
    margin:2px 4px;
  }

  & .wishItemContainer{
    position: relative;
    display: flex;
    flex-wrap:wrap;
    width: 100%;
    justify-content: flex-start;
  }
 }
 
</style>  