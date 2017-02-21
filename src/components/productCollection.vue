<template>
  <div class="product-col"> 
    <div class="category">
     <div class="category-info">
      <span class="text-title">{{category}}</span>
      <icon name="edit" class="text-content"></icon>
      <span class="text-content">最后更新于: 19/O2/2017</span>
     </div>
    </div><!-- end category -->
    <div :class="productContainer">
        <div v-for="item in itemList" class="product-wraper">
          <productCard :product="item" />
        </div>         
    </div><!-- end product-container -->
    <div class="all" @click="fetchMore">
      <icon name="angle-double-down" class="text-content"></icon>
      <span class="text-content">更多</span>
    </div><!-- end all -->
  </div>
</template>

<script>
 import ProductCard from './productCard'

 export default {
   name: 'product-col',

   props: ['category'],

   components: {
    ProductCard
   },
   
   mounted () {
    this.itemList = this.$store.state.itemList
   },

   data () {
     return {
      itemList: [],
      productContainer: {productContainer:true,loadingData:false}
     }
   },

   methods: {
    fetchMore () {
     this.productContainer.loadingData = true;
     setTimeout(() => {
      let newList = this.itemList.filter( _ => _)
      newList.forEach( item => {this.itemList.push(item)})
      this.productContainer.loadingData = false
      /* trigger handle scroll event */
      this.$parent.displayNavHelper()
     },500)
    }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .product-col {
  position: relative;
  margin: 50px auto;
  

  & .category {
   position:relative;
   width: 400px;
   height: 80px;
   margin: 40px auto;
   border-top: 1px solid #eee;
   border-bottom: 1px solid #eee;

   & > .category-info {
    display: block;
    position: absolute;
    top:50%;
    left:50%;
    transform: scaleY(.9) translate3d(-50%,-50%,0);

    & .text-content {
     vertical-align: text-top;
     font-style: italic;
     font-size: 11px;
    }
   }
  }

  & .productContainer {
    position:relative;
    width:75vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;    

    & > * {
     margin: auto 1px;
    }

    & .product-wraper {
      width:180px;
      height:250px;
      border:1px solid #eaebec;
    }

  }/* end product-container */

  & .all {
   width: 80vw;
   max-width: 1092px;
   height: 40px;
   padding: 10px 0;
   margin: 0 auto;
   display: relative;
   cursor: pointer;

    & .text-content {
     vertical-align: text-bottom;
     letter-spacing: 2px;
     font-weight: 600;
    }

    &:hover {
     background:darken(#eee,4%);
   
    & .text-content {
     transform: scale(1.3);
     color: black;
     font-weight: 900;
     transition: all .2s linear;
    }
  }
  } /* end all */

  & .loadingData {
    margin-bottom: 300px;
    transition: margin-bottom .5s ease-in;
/*    animation: load-data .5s; */
  }

 }/* end product-col*/
</style>


    <!--
    &:after {
     content:'换一批';
     position:absolute;
     height: 30px;
     width: 20px;
     right: -20px;
     top:98px;
     background: white;
     text-align: center;
     vertical-align: middle;

     &:hover {
     background:black;
     }
    }
    -->

    <!--
 @keyframes load-data {
  0% {
    margin-bottom: 0px;
  }

  50% {
    margin-bottom: 300px;
  }

  100% {
    margin-bottom: 300px;
  }
 }
 -->