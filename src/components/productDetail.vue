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
     </div><!-- end alternative minPicGallery-->
   </div><!--                          part: pictureWrapper                                          -->

   <div class="productInfo">

     <div style="width:90%;">
      <span class="text-title grand inline">{{product.title}}</span>
      <span class="text-price float-right" style="font-size:20px;">{{product.price | price}}</span>
     </div><!-- end title and price-->

     <div class="tags-rating">
       <div class="tags">
        <span class="text-nav inline">标签:</span>
        <span class="text-tag" v-for="tag in product.tags">{{tag}}</span>
       </div> 
       <div class="rating">
        <div class="ui heart rating xinxiustyle" data-rating="1" data-max-rating="5" ></div>
        <span class="text-content">(12个评论)</span>
       </div>
     </div><!--end tags and rating -->
     
     <div class="description">
      <p class="text-content">{{description}}</p><!--description-->
      <div class="hidden-bg" v-show="displayBrefDesc"></div>
      <span class="hidden-desc text-nav" v-show="displayBrefDesc" @click="displayWholeDesc">显示全部</span>
      <span class="hidden-desc text-nav" v-show="isDescOverSize && !displayBrefDesc" @click="displayWholeDesc">收起</span>     
     </div>

     <div class="ui divider"></div>

     <div class="optionWraper" v-show="product.options">
       <div class="options" v-for="option in product.options">
        <span class="text-nav inline">{{option.name}}:</span>
        <span class="text-content" :class="{'text-content':true,'active':selectedValue[option.name]===value}" 
                                   @click="selectOption(option.name,value)" 
                                   v-for="value in option.values">{{value}}
        </span>
       </div><!--customized option-->
       <div class="options">
        <span class="text-nav inline">数量:</span>
        <select class="comp-dropdown">
          <option class="text-nav" v-for="i in 9">{{i}}</option>
        </select>
       </div>
     </div><!-- options such as weight, numbers -->

     <div class="action">
      <div class="action-btn wish">加入收藏</div> 
      <div class="action-btn">加入购物车</div>     
     </div>
   </div><!--                                  end product info                                 -->

  </div><!--part: product details -->
</template>

<script>
  export default {
    name: 'productDetail',
    
    props:['id'],

    data() {
    	return {
          product: null,
          currentImgIndex:0,
          displayBrefDesc:false,
          isDescOverSize:false,
          selectedValue:{}
    	}
    },

    computed: {
      currentBgImage() {
        let currentImageUrl = this.product.nbPics?
                              this.product.picPath[this.currentImgIndex]:this.product.picPath
        return {backgroundImage:'url(\''+currentImageUrl+'\')'}
      },

      description() {
       return  this.displayBrefDesc ? this.product.description.slice(0,this.$store.state.maxLengthBrefDescrp)
                                      : this.product.description
      }
    },

    created() {
     this.product = this.$store.getters.productDetail(this.id)
     if(this.product == 'undefined')
      this.$http.post('/getProductById',{id : this.id}).then((res) => {
       this.product = res.body.product
       console.log(this.product)

       this.isDescOverSize = this.displayBrefDesc = 
                            this.product.description.length > this.$store.state.maxLengthBrefDescrp
       $('.ui.rating').rating()
      })
    },

    methods: {
      togglePicture(index) {
       this.currentImgIndex = index
      },

      displayWholeDesc() {
       this.displayBrefDesc = !this.displayBrefDesc
      },

      selectOption(option,val) {
        this.$set(this.selectedValue,option,val)
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

  $pictureWrapperWidth : 500px;
  $currentBgHeight : 350px;
  $minBgMargin: 10px;

 .productDetail{
  position:relative;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: row;  
  flex-wrap:wrap;
  justify-content: center;
  /*border-top:1px solid #e2e2e3;*/

  
  .pictureWrapper {
    width: $pictureWrapperWidth;
    margin-right:80px;

     & .currentBgStyle{
      position:relative;
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
    /*height: $currentBgHeight+$minBgMargin+$currentBgHeight/7;*/
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;

    & > * {
      margin-left: 40px;
      margin-bottom:18px;
    }

    & .text-title{
     font-weight: bold;
    }

    & .description{
     /*border:1px solid black;*/
     position:relative;
     padding-bottom:10px;
     margin-bottom:15px;

     & p{
      margin:0;
      transition:height .3s linear;
     }

     & .text-content{
      font-size: 15px;
      color: lighten(black,40%);
     }


     & .hidden-bg{
      position:absolute;
      width: 100%;
      height: 30%;
      background:lighten(#eee,4%);
      bottom:-5%;
      filter: blur(10px);
     }

     & .hidden-desc{
      position:absolute;
      bottom:-10%;
      left:50%;
      transform: translatex(-50%);
      z-index: 999;
      cursor:pointer;

      &:hover{
       color: black;
      }
     }

     & .text-nav{
      color: darken(#eee,40%);
      letter-spacing: 2px;
     }
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
      }/*end tags*/

      & .rating.inline{
       & .ui.heart.rating{
        vertical-align: text-bottom;
       }

       & .text-content{
        text-decoration: underline;
       }
      }/* end rating*/
    }/* end tags and rating */

    & .text-title.grand{
      font-size: 20px;
    }

    & .text-title.medium{
      font-size: 14px;
      color:lighten(#000,40%);
    }

    & .ui.divider{
      width: 90%;
      border:1px solid #eee;
      margin-bottom: 0;
      margin-top: 0;
    }

    & .action{
      margin-top: 10px;
      width: 350px;

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
    }/*end actions*/

    & .optionWraper{
       text-align: left;
       padding-top:10px;
 
       & > * {
        margin:15px auto 0 auto;
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
          display: inline-block;
          /*color: lighten(#ff5722,4%);*/
          color:white;
          font-weight: 500;
          /*border:2.5px solid lighten(#ff5722,5%);*/
          background: lighten(#ff5722,5%);
          border-radius:3px;
          transition:all .2s linear;
         } 

         & .comp-dropdown .text-nav{
           color:lighten(black,40%);
           font-size: 14px;
           font-weight: 400;
         }
       }/*end options */
    }/*end option wraper */
  }/* end product info */
  
 } 
</style>

