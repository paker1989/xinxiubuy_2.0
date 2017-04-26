<template>
  <div class="userWishList">
   <div class="wishItemContainer">
    <transition-group name="availableCats" tag="div" class="availableCatWraper">
     <productCard class="productWraper" v-for="item in displayList"
                 :product="item" :limitedText="50"/> 
    </transition-group>
     <div class="more right" v-if="displayRightArrow" @click="goRight">
       <circleStep :dir="'right'"/></circleStep>
     </div> 
     <div class="more left" v-if="displayLeftArrow" @click="goLeft">
       <circleStep :dir="'left'"/></circleStep>
     </div>
   </div><!--wishItemContainer end-->
  </div>
</template>

<script>
import ProductCard from 'components/productCard'
import CircleStep from 'components/custTag/circleStep'

export default {
  name: 'userWishList', 

  props:['displayAll'],

  data() {
    return {
     wishList         : [],
     displayList      : [],
     timer            : null,
     offset           : 0,
     displayLeftArrow : true,
     displayRightArrow:true
    }
  },

  components: {
   ProductCard,CircleStep
  },

  created() {
    let user = JSON.parse(sessionStorage.getItem('authenticatedUser'))

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
      this.resizeWindow()
    })  
  },

  methods: {
    resizeWindow(event) {
      if(this.timer) clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        let containerWidth = $('.wishItemContainer').innerWidth(),
            itemOuterWidth = $('.productWraper').outerWidth(true)|| 228,
            eleNumber      = Math.floor(containerWidth/itemOuterWidth)

            this.offset = 0
            this.displayList = this.wishList.slice(0,Math.min(this.wishList.length,eleNumber))
            this.setArrowStatus()
          },100)

    },

    goRight() {
      let currentShowNb    = this.displayList.length,
          lastDisplayIndex = this.offset+currentShowNb-1, 
          maxIndex         = this.wishList.length - 1, 
          toOffset         = (maxIndex-lastDisplayIndex)>currentShowNb?currentShowNb:(maxIndex-lastDisplayIndex)

      this.offset += toOffset
      this.displayList = this.wishList.slice(this.offset,this.offset+currentShowNb)
      this.setArrowStatus()
    },

    goLeft() {
      let currentShowNb = this.displayList.length,
          toOffset      = this.offset>currentShowNb?currentShowNb:this.offset

      this.offset -= toOffset
      this.displayList = this.wishList.slice(this.offset,this.offset+currentShowNb)   
      this.setArrowStatus()
    },

    setArrowStatus() {
      this.displayRightArrow = this.offset+this.displayList.length != this.wishList.length
      this.displayLeftArrow  = this.offset != 0
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
    justify-content: center;

    & .more{
     position:absolute;
     top:50%;
     transform: translatey(-50%);
    }

    & .more.right{
      right:0;
    }

    & .more.left{
      left:0;
    }
  }/*end wishItemContainer*/
 }
 
</style>  