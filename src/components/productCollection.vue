<template>
  <div class="product-col"> 
    <div class="category">
     <div class="category-info">
      <span class="text-title">{{category}}</span>
      <icon name="edit" class="text-content"></icon>
      <span class="text-content">最后更新于: 19/O2/2017</span>
     </div>

     <icon></icon>
    </div>
    <div class="product-container">
       <div v-for="item in itemList" class="product-wraper">
          <productCard :product="item" />
       </div>
     </div>
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
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['饮品','新品','M&S']
     },
     {
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['红酒','波尔多','2007']
     },
     {
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['欧苏丹','护肤']
     },
     {
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
      tags: ['高洁丝','护肤']
     },
     {
      title: '高洁丝有毒香水',
      price: '¥450',
      picPath: 'http://images.urbanoutfitters.com/is/image/UrbanOutfitters/32097818_000_f?$mlarge$&defaultImage=',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色..',
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
      itemList: []
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

 .product-col {
  position: relative;
  margin: 30px auto;
  

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

  & .product-container {
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

  }


 }

</style>
