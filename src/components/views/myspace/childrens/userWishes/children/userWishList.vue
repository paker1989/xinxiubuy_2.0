<template>
  <div class="userWishList">
   <div class="wishItemWraper">
    <div class="wishItemContainer">
     <productCard class="productWraper" v-for="item in displayList"
                 :product="item" :limitedText="50"/> 
     </div><!--end wishItemContainer-->
     <div class="more right" v-if="displayRightArrow" @click="goRight">
       <circleStep :dir="'right'"/></circleStep>
     </div> 
     <div class="more left" v-if="displayLeftArrow" @click="goLeft">
       <circleStep :dir="'left'"/></circleStep>
     </div>
   </div><!--wishItemWraper end-->
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
     displayRightArrow: true
    }
  },

  components: {
   ProductCard,CircleStep
  },

  created() {
    this.loadData()
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize',this.resizeWindow)
    })  
  },

  methods: {
    loadData() {
     let user = JSON.parse(sessionStorage.getItem('authenticatedUser'))
     console.log(user)
     this.$http.post('/getProductByIds',{ids : user.wishedList}).then( res => {
      if(res.body.products){
        Array.prototype.push.apply(this.wishList,res.body.products)
        Array.prototype.push.apply(this.displayList,res.body.products)
        this.resizeWindow()  
      }
     })
    },

    resizeWindow(event) {
      if(this.timer) clearTimeout(this.timer)

      this.timer = setTimeout(() => {
         console.log('resize')
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

  & .wishItemWraper{
    position: relative;

    & .wishItemContainer{
      position: relative;
      display: flex;
      flex-wrap:wrap;
      width: 100%;
      justify-content: center;
    }

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
   }/*end wishItemWraper*/
   
   /*
   & .animation-left{
    animation-name: toggle-left;
    animation-duration: .6s;
    animation-timing-function: linear;
   }

   & .animation-right{
    animation-name: toggle-right;
    animation-duration: .6s;
    animation-timing-function: linear;
   }
   */
 }

   /*
   @keyframes toggle-left {
      0%   {transform: translatex(0);}
      50%  {transform: translatex(10%);opacity:0;}
      75%  {transform: translatex(15%);opacity:0;}
      85%  {transform: translatex(20%);opacity:0;}
      100% {transform: translatex(0);opacity:1}
  }

   @keyframes toggle-right {
      0%   {transform: translatex(0);}
      50%  {transform: translatex(-10%);opacity:0;}
      75%  {transform: translatex(-15%);opacity:0;}
      85%  {transform: translatex(-20%);opacity:0;}
      100% {transform: translatex(0);opacity:1}
   }
   */
 
</style>  