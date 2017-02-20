<template>
  <div class="navbar">
    <div class="screen-navbar">
      <router-link to="/foo" class="text-nav">首页</router-link>
      <router-link to="/foo" class="text-nav">About me</router-link>
      <router-link to="/foo" class="text-nav">上传产品</router-link>
      <router-link to="/foo" class="text-nav">文章</router-link>
      <router-link to="/foo" class="text-nav">库存</router-link>
      <div class="search-container" >
        <div class="ui icon input">
          <input type="text" class="text-nav" id="searchBar" 
           @focus="searchEvent" 
           @blur="searchEvent" 
           @keyup="search" debounce="1000"
           v-model="searchStr" placeholder="搜索...">
          <i class="search link icon"></i>
        </div>
        <div :class="{'result-wraper':true,'hidden':!isInSearch || matchedList.length == 0}">
         <resultList :itemList="matchedList" />        
        </div> 
      </div><!-- end search bar -->    
    </div><!-- navbar : menu in big screen -->
    
    <div class="device-navbar-wraper">
      <div>
        <div class="ui icon input">
          <input type="text" class="text-nav" id="searchBar" placeholder="搜索...">
          <i class="search link icon"></i>
        </div>               
      </div><!-- end search bar -->    
      <div class="ui compact menu">
          <div class="ui dropdown item">
          <icon name="bars" class="icon icon-gray"></icon>
           <span class="text-title">菜单</span>
          <div class="menu">
            <router-link to="/foo" class="item text-nav">首页</router-link>
            <router-link to="/foo" class="item text-nav">About me</router-link>
            <router-link to="/foo" class="item text-nav">上传产品</router-link>
            <router-link to="/foo" class="item text-nav">文章</router-link>
            <router-link to="/foo" class="item text-nav">库存</router-link>
          </div>
        </div>
      </div>
    </div><!-- navbar : menu in big screen -->
    </div> <!-- menu in device screen -->

  </div>
</template>

<script>
import ResultList from './resultList'

export default {
  name: 'navbar',

  components: {
   ResultList
  },

  data () {
    return {
      isInSearch: false,
      searchStr: '',
      itemList: [
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
        title: '高洁丝有毒香水高洁丝有毒香水',
        price: '¥450',
        picPath: 'http://images.urbanoutfitters.com/is/image/UrbanOutfitters/32097818_000_f?$mlarge$&defaultImage=',
        description: '欧舒丹的乳木果系列脸部护理系列产品将这些相同的成分把这些运用在面部护理，头发护理和身体护理的产品之中，这款产品含有大量的乳木果油，非常适合干性和严重干燥肌肤..',
        tags: ['高洁丝','自杀良品']
       }
      ],
      matchedList: []
    }
  },

  computed: {
    searchStatus () {
      return {
        'text-nav'     : true,
        'search'       : true,
        'inSearch'     : this.isInSearch
      }
    }
  },

  methods: {
    searchEvent (e) {
     (e.type == 'focus')? this.isInSearch = true : this.isInSearch = false
    },

    search (e) {
      if(this.isInSearch){
       this.matchedList = []
       if(this.searchStr && this.searchStr.length > 0){
        console.log('!!')
        this.matchedList = this.itemList.filter( item => {
         return   item.title.indexOf(this.searchStr.trim()) > -1
               || item.description.indexOf(this.searchStr.trim()) > -1
               || item.price.indexOf(this.searchStr.trim()) > -1
         })
       }else{
        console.log('??')
        this.searchStr = ''
      }
     }
    }
  }
  /* end methods */

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .screen-navbar {
    @media
    only screen and (max-width: 500px)
   /* only screen and (max-device-width: 320px) */
     {
     display: none;
    }

    @media
    only screen and (min-width: 500px)
   /* only screen and (min-device-width:320px) */
   {
     width: 80%;
     position: relative;
     margin: 0 auto;
     display: flex;
     justify-content: center;
     flex-wrap: nowrap;
     flex-direction: row;


      & > * {
       margin: 0 2em;
       height:20px;
      }

      & > a:hover {
       color:black;
       font-weight: bold;
       transform: scale(1.2);
       transition: all .2s linear;    
      }

      & .search {
       margin: 0 2em;
       cursor: pointer;
       vertical-align: bottom;
      }

      & .inSearch {
        opacity: 0;
      }

      & .ui {
       position: relative;
       bottom:7px;
       width: 220px;
      }

      & .search-container {
        position:relative;

        & .result-wraper {
          position:absolute;
          top:20px;
          min-width: 360px;
          max-height: 450px;
          overflow-x:hidden;
          overflow-y: auto;
          z-index: 999;
          background: white;
          border: 1px solid darken(#eee,4%);
          border-radius:4px;
        }
      }/* end search container */

    }/* end nav bar ( big screen )*/

  }/* end nav bar ( all )*/

  .device-navbar-wraper {
   
    @media only screen and (min-width: 500px) {
     display: none;
    }
  
    & .ui.menu {
     border: none;
     box-shadow:none;
    } 

    & .icon-gray {
     color: #999999;
     margin-right: .3em;
    }
 }



</style>
