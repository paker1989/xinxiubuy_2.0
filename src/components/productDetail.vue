<template>
  <div class="productDetail">    
   <div class="pictureWrapper">
     <div class="currentBgStyle" :style="currentBgImage"></div>
     <div class="minPictureGallery" v-if="product.nbPics">
       <div class="minPicture" v-for="(picture,index) in product.picPath" 
            @click="togglePicture(index)"
            :style="{backgroundImage : 'url(\''+picture+'\')'}">
       </div>
     </div><!-- end minPictureGallery-->
     <div class="minPictureGallery" v-else>
        <div class="minPicture"
            :style="{backgroundImage : 'url(\''+product.picPath+'\')'}">
       </div>      
     </div>
   </div><!--part: pictureWrapper-->
   <div class="productInfo">
     <div style="width:90%;">
      <span class="text-title grand inline">{{product.title}}</span>
      <span class="text-price float-right" style="font-size:20px;">{{product.price}}</span>
     </div>
     <p class="text-content">{{product.description}}</p>
     <div class="ui divider"></div>
     <div class="action">
      <div class="action-btn wish">加入收藏</div> 
      <div class="action-btn">加入购物车</div>     
     </div>
   </div>
  </div><!--part: product details -->
</template>

<script>
  export default {
    name: 'productDetail',

    data() {
    	return {
          product: null,
          currentImgIndex:0,

    	}
    },

    computed: {
      currentBgImage() {
        let currentImageUrl = this.product.nbPics?this.product.picPath[this.currentImgIndex]:this.product.picPath
        return {backgroundImage:'url(\''+currentImageUrl+'\')'}
      }
    },

    created() {
     let productId = this.$route.params.id 
     this.product = this.$store.getters.productDetail(productId)
    },

    methods: {
      togglePicture(index) {
       this.currentImgIndex = index
      }
    }


  }
</script>

<style lang="scss" scoped>

 @mixin backgroundStyle {
    background-size:cover;
    background-position:center;
    border-radius: 2px;
    border:1px solid #e2e2e3;
 }
  
 // $productDetailWidth : 800px;

  $pictureWrapperWidth : 300px;
  $currentBgHeight : 350px;
  $minBgMargin: 10px;

 .productDetail{
  position:relative;
  width: 60%;
  margin: 50px auto;
  padding-top:20px;
  display: flex;
  flex-direction: row;  
  flex-wrap:wrap;
  justify-content: space-around;
  border-top:1px solid #e2e2e3;

  
  .pictureWrapper {
    width: $pictureWrapperWidth;

     & .currentBgStyle{
      width:100%;
      height: $currentBgHeight;
      @include backgroundStyle
    }

    & .minPictureGallery{
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap:no;
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: center;

      & .minPicture{
        width: $pictureWrapperWidth/6;
        height: $currentBgHeight/7;
        margin: $minBgMargin $minBgMargin*2;
        cursor: pointer;
        @include backgroundStyle
      }
    }
  }/* end image wrapper */

  & .productInfo{
    position:relative;
    width: 400px;
    height: $currentBgHeight+$minBgMargin+$currentBgHeight/7;
 //   border:1px solid #e2e2e3;
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;

    & > * {
      /*border:1px solid #e2e2e3;*/
      margin-left: 40px;
      margin-bottom:20px;
    }

    & .text-title.grand{
      font-size: 20px;
    }

    & .text-title.medium{
      font-size: 14px;
      color:lighten(#000,40%);
    }

    & .ui.divider{
      width: 80%;
      border:1px solid #eee;
      margin-bottom: 0;
      margin-top: 0;
    }

    & .action{
      margin-top: 50px;
      width: 100%;

      & .action-btn{
        display: block;
        background:lighten(#ff5722,5%);
        width:100%;
        font-size:15px;
        letter-spacing: 4px;
        padding:12px 20px;
        margin-right: 20px;
        margin-bottom: 20px;
      }

     & .action-btn.wish{
      background:white;
      color:#ff5722;
      border:2px solid #ff5722;
     }
    }

  }
  
 }
</style>

