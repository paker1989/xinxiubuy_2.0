<template>
  <div class="wishItem">
    <div class="picture-bg" :style="productImage"></div>
    <div class="detail">
      <h3 class="title">{{product.title}}</h3>
      <p class="text-content description">{{brefDesc}}</p>
      <p class="text-price price">{{product.price}}</p>
    </div>
    <div class="action">
     <div class="countNb">
      <label>-</label>
      <label>0</label>
      <label>+</label>
     </div>
     <div class="remove">
      <icon name="trash"></icon><label>移除收藏</label>
     </div>
     <div class="totalPrice">
      <label>¥0.00</label>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wishItem',

  props: ['product'],

  data () {
    return {
      brefDesc:'',
      productImage:  null
    }
  },

  mounted() {

   this.brefDesc = this.product.description.length>30?
               this.product.description.slice(0,31)+".." : this.product.description

  let picPath = $.isArray(this.product.picPath)?  this.product.picPath[0]:this.product.picPath
  this.productImage = {backgroundImage:'url(\''+picPath+'\')'}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $bgWidth : 20%;
 $detailWidth:60%;

 .wishItem{
  position:relative;
  border:1px solid #bdc3c7;
  min-width: 200px;
  max-width: 500px;
  min-height: 100px;
  display: flex;
  margin-left:auto;
  margin-right: auto;
  flex-wrap: wrap;
  color:lighten(black,30%);
  justify-content: flex-start;

  &:hover{
  border-color:#ff5722;

  & .picture-bg, & .detail, & .remove{
    border-color:#ff5722;
  }
  }

  & .picture-bg{
   width: $bgWidth;
   border-right:1px solid #bdc3c7;
   /*background-image: url('http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984');*/
   background-size:cover;
   background-position:center;
  }

  & .detail{
   position:relative;
   width:$detailWidth;
   text-align: left;
   padding: .3em 1em 5% 1em;
   border-right:1px solid #bdc3c7;

   & .title{
    font-weight: 100;
    font-size: 17px;
    letter-spacing: .1em;
    margin-bottom: .2em;
   }
    
   & .description{
     font-size: 11px;
     @media only screen and (max-width: 500px){
      opacity: 0;
     }
   }

   & .price{
    font-weight: lighter;
    font-size: 17px;  
    color: darken(#ff5722,10%);
    position:absolute;
    right:.5em;  
    bottom:5%;
   }
  }

  & .action{
   position:relative;
   width: 20%;
   color:lighten(black,50%);

   & .countNb{
    width: 100%;
    height: 60%;
    padding-top:5%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;    
    font-size:16px;
   }

   & .remove{
    height: 20%;
    width: 100%;
    color:white;
    font-size: 12px;
    padding-top:3%;
    border-bottom:1px solid #bdc3c7;
    vertical-align: bottom;

    & label{  
    height: 100%;
    text-align: center;
    vertical-align: top;
    margin-left:.2em;
    cursor:pointer;
    }

    &:hover{
     background: #ff5722;
    }
   }

   & .totalPrice{
    position:relative;
    height: 20%;

    &:hover{
     background:#3498db;
     color:white;
    }

    & label{
     position:absolute;
     right:10%;
     bottom:0;   
     font-weight: 100;
    }

   }
  }
 }
</style>
