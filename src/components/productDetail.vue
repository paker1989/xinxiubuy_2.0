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
     <h1 class="text-title grand">{{product.title}}</h1>
     <p class="text-content">{{product.description}}</p>
     <div class="ui divider"></div>
     <p class="text-price" style="font-size:25px;">{{product.price}}</p>
     <p class="text-title medium">重量:3kg</p>
     <div class="action">
      <div class="action-btn inline">加入购物车</div>
      <div class="action-btn inline">加入收藏</div>      
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
  width: 70%;
  margin: 50px auto;
  display: flex;
  flex-direction: row;  
  flex-wrap:wrap;
  justify-content: center;

  
  .pictureWrapper {
    width: $pictureWrapperWidth;
    margin-left:10%;

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
    width: 500px;
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

      & .action-btn{
        padding:10px 20px;
        margin-right: 20px;
      }
    }

  }
  
 }
</style>

