import Vue from 'vue'
import Vuex from 'vuex'
//import { getProducts } from '../routes/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   itemList: [
     {
      id:1,
      wished:false,
      title: '香奈儿经典款包包',
      price: '¥12,000',
      picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      id:2,
      wished:false,
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S']
     },
     {
      id:3,
      wished:false,
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '波尔多地区旅游资源丰富，有许多风景优美保存完好的中世纪城堡。波尔多因此也被称为世界葡萄酒中心，每两年一度，波尔多葡萄酒行业协会举办盛大的国际酒展-Vinexpo',
      tags: ['红酒','波尔多','2007']
     },
     {
      id:4,
      wished:false,
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
      tags: ['欧苏丹','护肤']
     },
     {
      id:5,
      wished:false,
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '不变的传统，一季又一季，一代传一代。这些传统，往往源于大自然的启迪。每一次遇见家乡普罗旺斯或世界各地的人，我都对这些传统惊叹不已。我与他们一样热爱传统，爱惜大自然..',
      tags: ['高洁丝','护肤']
     },
     {
      id:6,
      wished:false,
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
    ],

   nbWishes: 0
  },
  
  actions: {
   WISH_ITEM: ({ commit,state },{ id, wishStatus }) => {
    state.itemList.forEach( (item,index) => {
     if(item.id == id){
      commit('ADD_WISH',{ index, wishStatus })
      return
      }
    })
   }

  },

  mutations: {
   /*
   SET_ITEMS: (state, items) => {
    state.allItems = items;
   }
   */
   ADD_WISH: (state,{ index,wishStatus }) => {
    state.itemList[index].wished = wishStatus
    wishStatus?state.nbWishes++:state.nbWishes--
   }
  },

  getters: {
   /*
   wishedItems: (state) => {
    return state.itemList.filter( item => {return item.wished})
   }
   */
  }
});

export default store;