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
     <div class="tags-rating">
       <div class="tags">
        <span class="text-nav inline">标签:</span>
        <span class="text-tag" v-for="tag in product.tags">{{tag}}</span>
       </div>
       <div class="rating">
        <div class="ui heart rating xinxiustyle" data-rating="1" data-max-rating="5"></div>
        <span class="text-content">(12个评论)</span>
       </div>
     </div><!--end tags and rating -->
     <p class="text-content">{{product.description}}</p>
     <div class="ui divider"></div>
     <div class="optionWraper">
       <div class="options">
        <span class="text-nav inline">重量:</span>
        <span class="text-content">1公斤</span>
        <span class="text-content">2公斤</span>
        <span class="text-content active">2.5公斤</span>
        <span class="text-content">3公斤</span>
       </div>
       <div class="options">
        <span class="text-nav inline">数量:</span>
        <select class="ui dropdown">
          <option class="text-content" v-for="i in 9" v-model="orderNb">{{i}}</option>
        </select>
       </div>
     </div>
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

    mounted() {
      $('.ui.rating').rating()
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
  justify-content: center;
  border-top:1px solid #e2e2e3;

  
  .pictureWrapper {
    width: $pictureWrapperWidth;

     & .currentBgStyle{
      position:relative;
      width:100%;
      height: $currentBgHeight;
      @include backgroundStyle

      &:before{
       content:''
      }
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

    & .tags-rating{
      width: 85%;
      position:relative;
      display: flex;
      flex-direction:row;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;

      & .tags{
       & .text-nav{
        margin-right: 15px;
        color: lighten(black,20%);
       }

       & .text-tag{
        margin-right: 5px;
        cursor:pointer;
        
        &:hover{
         color: darken(#eee,80%);
         border-bottom:1px dashed black;
        }
       }
      }

      & .rating.inline{
       & .ui.heart.rating{
        vertical-align: text-bottom;
       }

       & .text-content{
        text-decoration: underline;
       }

       /*
       & .ui.heart.rating .icon.selected.xinxiustyle, .ui.heart.rating .icon.selected.active.xinxiustyle{
        color:black;
       }
       */
      }
    }

    & .text-title.grand{
      font-size: 20px;
    }

    & .text-title.medium{
      font-size: 14px;
      color:lighten(#000,40%);
    }

    & .ui.divider{
      width: 350px;
      border:1px solid #eee;
      margin-bottom: 0;
      margin-top: 0;
    }

    & .action{
      margin-top: 10px;
      width: 350px;
      
      /*
      & .ui.dropdown.options{
       width: 100%;
       color: lighten(#ff5722,5%);
       border:2px solid lighten(#ff5722,5%);
       letter-spacing: 5px;
       text-align: center;
       margin-bottom: 10px;
      }
      */

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

    & .optionWraper{
       text-align: left;
       padding-top:10px;
       margin:0 auto;
 
       & > * {
        margin:15px auto;
       }

       & .options{
       & .text-nav{
        color:darken(#eee,70%);
        font-size: 13px;
        letter-spacing: 3px;
        margin-right: 10px;
       }

       & .text-content{
        margin-right: 5px;
        letter-spacing: 2px;
        cursor:pointer;
        padding:3px 5px;
       }

       & .active{
        color: lighten(black,30%);
        font-weight: 500;
        border:2.5px solid lighten(#ff5722,5%);
       }
      }
    }
  }
  
 }
</style>

