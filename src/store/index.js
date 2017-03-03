import Vue from 'vue'
import Vuex from 'vuex'
//import { getProducts } from '../routes/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   defaultCurrentPage: 1,
   defaultBeginPage: 1,

   nbFirstFetch: 6, //初次显示的产品个数
   nbItemsPerFetch: 6,//每次提取的数量
   maxNbItemsPerPage: 12,//单页显示的最大数量

   maxNbPagePerPagination: 7, //导航条上显示的最大个数
   maxNbSlidePerNav: 3,//点击向左或向右时滑动的数量

   maxLengthBrefDescrp: 85,  //如果超过，就显示简要说明

   commentList: [
    {
      id:1,
      productId:2,
      commentUser:{pseudo:'BoomBoom'},
      commentTimeStr:'1年前',
      content:'那不是小偷  那是抢劫吧',
      type:1
    },
    {
      id:2,
      productId:2,
      commentUser:{pseudo:'浩浩',userPhoto:'https://pic2.zhimg.com/4d43d15e81d6e3639e59dd4084d73eed_s.jpg'},
      commentTimeStr:'3小时前',
      content:'是小偷团伙，其实已经得手了，然后被我同事抢劫回来',
      type:2,
      referId:1,
    },
    {
      id:3,
      productId:2,
      commentUser:{pseudo:'冯陈'},
      commentTimeStr:'今天',
      content:'那不是小偷  那是抢劫吧',
      type:1,
      nbLike:3
    },
    {
      id:4,
      productId:2,
      commentUser:{pseudo:'JORDAN1'},
      commentTimeStr:'1年前',
      content:'花了多少钱啊？环境看着确实不错，',
      type:1
    },
    {
      id:5,
      productId:1,
      commentUser:{pseudo:'毛小民'},
      commentTimeStr:'1年前',
      content:'我大天朝真是太好了',
      type:1
    }
   ],

   itemList: [
     {
      id:1,
      wished:false,
      title: '香奈儿经典款包包',
      price: '¥12,000',
      nbPics: 2,
      picPath: [
        'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
        'http://img.allw.mn/content/www/2008/09/classic_chanel_bags_4.jpg'
        ],
   //   picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿'],
      options:[
       {name:'重量',values:['1公斤','2公斤','3公斤']}
      ]
     },
     {
      id:2,
      wished:false,
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S'],
      options:[
       {name:'口味',values:['香草','巧克力','粑粑','芒果']},
       {name:'容量',values:['MIDIUM','GRAND','VENTI']}
      ]
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
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
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
      title: '香奈儿经典款包包',
      price: '¥12,000',
      nbPics: 2,
      picPath: [
        'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
        'http://img.allw.mn/content/www/2008/09/classic_chanel_bags_4.jpg'
        ],
    
   //   picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      id:7,
      wished:false,
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S']
     },
     {
      id:8,
      wished:false,
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '波尔多地区旅游资源丰富，有许多风景优美保存完好的中世纪城堡。波尔多因此也被称为世界葡萄酒中心，每两年一度，波尔多葡萄酒行业协会举办盛大的国际酒展-Vinexpo',
      tags: ['红酒','波尔多','2007']
     },
     {
      id:9,
      wished:false,
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
      tags: ['欧苏丹','护肤']
     },
     {
      id:10,
      wished:false,
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '不变的传统，一季又一季，一代传一代。这些传统，往往源于大自然的启迪。每一次遇见家乡普罗旺斯或世界各地的人，我都对这些传统惊叹不已。我与他们一样热爱传统，爱惜大自然..',
      tags: ['高洁丝','护肤']
     },
     {
      id:11,
      wished:false,
      title: '香奈儿经典款包包',
      price: '¥12,000',
      nbPics: 2,
      picPath: [
        'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
        'http://img.allw.mn/content/www/2008/09/classic_chanel_bags_4.jpg'
        ],
   //   picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      id:12,
      wished:false,
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S']
     },
     {
      id:13,
      wished:false,
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '波尔多地区旅游资源丰富，有许多风景优美保存完好的中世纪城堡。波尔多因此也被称为世界葡萄酒中心，每两年一度，波尔多葡萄酒行业协会举办盛大的国际酒展-Vinexpo',
      tags: ['红酒','波尔多','2007']
     },
     {
      id:14,
      wished:false,
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
      tags: ['欧苏丹','护肤']
     },
     {
      id:15,
      wished:false,
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '不变的传统，一季又一季，一代传一代。这些传统，往往源于大自然的启迪。每一次遇见家乡普罗旺斯或世界各地的人，我都对这些传统惊叹不已。我与他们一样热爱传统，爱惜大自然..',
      tags: ['高洁丝','护肤']
     },
     {
      id:16,
      wished:false,
      title: '香奈儿经典款包包',
      price: '¥12,000',
      nbPics: 2,
      picPath: [
        'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
        'http://img.allw.mn/content/www/2008/09/classic_chanel_bags_4.jpg'
        ],
    
   //   picPath: 'http://www.modeldesac.com/images/sac-chanel/sac-chanel-255-nouveau-grand-caviar-cuir-or-argent-a28600.jpg',
      description: '此口红是暗玫红色的,和皮肤颜色非常融合,而且色号不会太亮，偏暗的颜色,其实更提气色，也很适合较保守的办公室。厚涂薄涂有不同的风格，但都很美就对了！这个带了微微一点金闪..',
      tags: ['奢侈品','经典','香奈儿']
     },
     {
      id:17,
      wished:false,
      title: 'M&S 香草味奶昔',
      price: '¥190',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/coconuthairoil1_1024x1024.jpg?v=1473952641',
      description: '奶昔（Milk shake）首先出现于美国，主要有“机制奶昔”和“手摇奶昔”两种。传统奶昔是手摇的，一般都是在快餐店、冷食店出售，店里的奶昔机现做现卖，顾客现买现饮。',
      tags: ['饮品','新品','M&S']
     },
     {
      id:18,
      wished:false,
      title: '法国波尔多红酒',
      price: '¥280',
      isNew: true,
      picPath: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoulmlQbgot2YbZfm6uTx22foGWke8T1uZnQHgb0hTBw1Nmzob',
      description: '波尔多地区旅游资源丰富，有许多风景优美保存完好的中世纪城堡。波尔多因此也被称为世界葡萄酒中心，每两年一度，波尔多葡萄酒行业协会举办盛大的国际酒展-Vinexpo',
      tags: ['红酒','波尔多','2007']
     },
     {
      id:19,
      wished:false,
      title: '欧舒丹护肤套装',
      price: '¥450',
      picPath: 'http://cdn.shopify.com/s/files/1/0341/1037/products/Aloe_You_Set2_large.jpg?v=1484328984',
      description: '欧舒丹希望“透过提供独特的个人护理及家居产品，成为提倡地中海式舒适安康感觉的国际模范”，并以“舒适愉悦”、“真实纯净”及“关怀尊重”等为企业理念..',
      tags: ['欧苏丹','护肤']
     },
     {
      id:20,
      wished:false,
      title: '高洁丝面乳',
      price: '¥280',
      picPath: 'http://18165-presscdn-0-1-81385.laedukreationpvt.netdna-cdn.com/wp-content/uploads/2015/03/Lush-Gorgeous-Facial-Moisturiser-Review.jpg',
      description: '不变的传统，一季又一季，一代传一代。这些传统，往往源于大自然的启迪。每一次遇见家乡普罗旺斯或世界各地的人，我都对这些传统惊叹不已。我与他们一样热爱传统，爱惜大自然..',
      tags: ['高洁丝','护肤']
     }
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
   productDetail: (state) => (id) => {
    return state.itemList.filter((item) => { return item.id == id})[0]
   },

   comments: (state) => (productId) => {
    return state.commentList.filter((item) => {return item.productId == productId})
   },

   fetchReply: (state) => (id) => {
    return  state.commentList.filter((item) => {return item.id == id})[0].commentUser.pseudo
   }
  }
});

export default store;