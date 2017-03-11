<template>
  <div class="product-card">
   <div>
    <router-link class="action left" :to="'/product/'+product.id">查看</router-link>
   </div>
   <div :class="{'action right' : true,'wished' : product.wished}" @click="toggleCollection">
    {{product.wished?'取消收藏':'收藏'}}
   </div>
   <div class="wished-label" v-if="product.wished">已收藏</div><!--action end-->

   <div class="product-bg" :style="productImage">
   </div><!-- product bg end-->

   <div :class="{'product-info': true,'product-new' : product.isNew}">
    <p class="text-title">{{product.title}}</p>
    <p class="text-price"> {{product.price}}</p>
    <p class="text-content description">
      <span class="text-title description">描述: </span>
      {{product.description}}
      <a class="text-content description more">查看</a>
    </p>
    <a href="" class="text-tag more" v-for="tag in product.tags">{{tag}}</a> 
    <a class="text-content description more">查看</a>     
   </div>

  </div><!--product info end -->
</template>

<script>
export default {
  name: 'product-card',
  
  props: ['product'],

  data () {
    return {
      currentSlide:1,
      intervaler: null
    }
  },

  methods: {
   toggleCollection() {
    this.$store.dispatch('WISH_ITEM', {id : this.product.id,wishStatus: !this.product.wished})
   },

   togglePictures() {
    if($.isArray(this.product.picPath) && this.product.picPath.length>1 && this.intervaler==null){
      if(this.intervaler) return
      this.intervaler = setInterval( ()=>{
        this.currentSlide = (this.currentSlide >= this.product.picPath.length)?1:this.currentSlide+1
      },2000)  
      }   
   }
  },

  computed: {   
   productImage() {
    this.togglePictures()
    if($.isArray(this.product.picPath) && this.product.picPath.length>1){
     return {backgroundImage : 'url(\''+this.product.picPath[this.currentSlide-1]+'\')'}
    }else{
     return {backgroundImage : 'url(\''+this.product.picPath+'\')'}
    }
   }
  },

  mounted () {
      this.togglePictures()    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

   @mixin hover-effect {
      border-bottom: 1px dashed #999999;
      transform: scale(1.1);
      color: black;
      font-weight: bold;
      transition: all .2s linear;
   }

   .product-card {
     position:relative;
     width:100%;
     height: 100%;
     overflow: hidden;
     text-align: center;

    & .text-tag {

     color: black;
    }

    & .text-title {
     font-size: 12px;
     display: inline;
    }

    & .description {
     font-size: 10px;
     opacity: 0;
    }

    & .more {
     cursor: pointer;
     margin-left: 1px;

     &:hover {
      @include hover-effect;
     }
    }

    & .action {
     opacity: 0;
     position:absolute;
     top:15%;
     z-index: 3;
     color:white;
     padding: 1px 7px;
     font-weight: 900;
     font-size: 11px;
     letter-spacing: 1px;
     border:2px solid white;
     cursor: pointer;
     transform:scale(1.2);
     transition: all .2s ease-in;

     &:hover {
      background:white;
      color: #48daa1;
     }
    }

    & .left {
      left:15%;
    }

    & .right {
      right: 15%;
    }

    & .wished {
      background:white;
      color: #48daa1;    
    }
    /* end action */

    & .wished-label {
       position:absolute;
       /*
       top:15%;
       left:20%;
       */
       top:0;
       left:0;
       z-index: 3;
       color:white;
       padding: 1px 7px;
       font-weight: 500;
       font-size: 12px;
       letter-spacing: 3px;
       /*border:2px solid white;*/
       border-radius:4px;
       background:#ff5722;
     /*  transform:rotatez(-50deg);*/
    }

  
    & .product-bg {
      position:relative;
      width:100%; 
      height: 80%;
      background-size:cover;
      background-position:center;
      border-bottom:1px solid #eaebec; 
      transition: all .2s ease-in;
      
    }
    /* end product-bg */
    & .product-info {
     position:relative;
     width: 100%;
     height: 60%;
     background:white;
     color:white;
     transition: transform .2s ease-out;
     text-align: left;
     padding: 2px 4px;

     & > * {
      margin: 2px 1px;
     }

    }

    .product-new:after {
      content:'NEW';
      position: absolute;
      top:-15px;
      right: 5px;
      background:#ff5722;
      font-size:10px;
      transform: scaley(.9);
      font-weight: 700;
      border-radius:15px;
      padding:6px 4px;
    }

    &:hover { 

     box-shadow:0px 13px 21px -5px rgba(0, 0, 0, 0.3);

     & .description {
      opacity: 1;
     }

     & .action {
      opacity: 1;
      transform: scale(1);
      transform-origin: center;
     }

     & .product-info {
       transform: translatey(-70%);
       transition: transform .2s ease-out;
      }

     & .product-bg {
      transform: scale(1.1);
     }

     & .product-bg:before {
       content: '';
       position: absolute;
       background: #48daa1;
       top:0;
       left:0;
       width: 100%;
       height: 100%;
       opacity: .7;    
     }

     & .wished-label {
      opacity: 0;
     }

    }/*hover over*/
  }
</style>
