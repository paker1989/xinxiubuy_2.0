<template>
  <div class="product-card">
   <!--<img src="http://media.paperblog.fr/i/496/4968830/produits-maquillage-make-up-for-ever-yeux-smo-L-4KerA7.jpeg" alt="" /> -->
   <div class="check">查看</div>
   <div class="product-bg" 
    :style="{ background: 'url(\''+product.picPath+'\') no-repeat center', backgroundSize:'cover'}">
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
      
    }
  },

  computed: {
  /*
   bgPicture () {
    return {
     background: 'url(\''+this.product.picPath+'\') no-repeat center',
     backgroundSize: 'cover'
    }
   }
   */
  },

  mounted () {
/*
   $('.product-bg').css('background','url(\''+this.product.picPath+'\') no-repeat center')
   $('.product-bg').css('background-size','cover')
*/
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

  /*
   @mixin new-effect {
      content:'NEW';
      position: absolute;
      top:-10px;
      right: 5px;
      background:#ff5722;
      font-size:7px;
      transform: scaley(.9);
      font-weight: 700;
      border-radius:10px;
      padding:1px 2px;
   }
   */

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

    & .check {
     opacity: 0;
     position:absolute;
     left:50%;
     top:15%;
     transform:translatex(-50%) scale(1.2);
     z-index: 3;
     color:white;
     padding: 1px 7px;
     font-weight: 900;
     font-size: 11px;
     letter-spacing: 3px;
     border:2px solid white;
     cursor: pointer;
     transition: all .2s ease-in;

     &:hover {
      background:white;
      color: #48daa1;
     }
    }
  
    & .product-bg {
      position:relative;
      /*
      background:url('http://media.paperblog.fr/i/496/4968830/produits-maquillage-make-up-for-ever-yeux-smo-L-4KerA7.jpeg') no-repeat;
      background-size:contain;                   
      background-position: center,center;
      */
      width:100%; 
      height: 80%;
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

     /*
     &:after {
      content:'NEW';
      position: absolute;
      top:-10px;
      right: 5px;
      background:#ff5722;
      font-size:7px;
      transform: scaley(.9);
      font-weight: 700;
      border-radius:10px;
      padding:1px 2px;
     }
     */
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

     & .check {
      opacity: 1;
      transform: translatex(-50%) scale(1);
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

    }
  }
</style>
