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
    this.itemList = [

     {
      title: '香奈儿经典款包包',
      price: '¥12,000',
      picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S']
     },
     {
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '波尔多地区旅游资源丰富，有许多风景优美保存完好的中世纪城堡。波尔多因此也被称为世界葡萄酒中心，每两年一度，波尔多葡萄酒行业协会举办盛大的国际酒展-Vinexpo',
      tags: ['红酒','波尔多','2007']
     },
     {
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
      tags: ['欧苏丹','护肤']
     },
     {
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '不变的传统，一季又一季，一代传一代。这些传统，往往源于大自然的启迪。每一次遇见家乡普罗旺斯或世界各地的人，我都对这些传统惊叹不已。我与他们一样热爱传统，爱惜大自然..',
      tags: ['高洁丝','护肤']
     },
     {
      title: '高洁丝有毒香水',
      price: '¥450',
      picPath: 'http://images.urbanoutfitters.com/is/image/UrbanOutfitters/32097818_000_f?$mlarge$&defaultImage=',
      description: '欧舒丹的乳木果系列脸部护理系列产品将这些相同的成分把这些运用在面部护理，头发护理和身体护理的产品之中，这款产品含有大量的乳木果油，非常适合干性和严重干燥肌肤..',
      tags: ['高洁丝','自杀良品']
     }
     /*
     {
      title: '兰蔻新款眉笔',
      price: '¥980',
      picPath: 'http://gju4.alicdn.com/bao/uploaded/i2/160160141525170074/TB2VTnahpXXXXbeXpXXXXXXXXXX_!!45216016-0-juitemmedia.jpg_560x560Q90.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['化妆品','新品','兰蔻']
     },
     */
    ]

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
      this.productContainer.loadingData = false;
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