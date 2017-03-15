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
   fecthGap: 60*60,
  
   fetchedTags: {/*[tagName:string]:lastFetchedTime*/},  
   /*activeItemIds: [],*/
   users: {/*[id:string]: User*/},
   items: {/*[id:string]: Product*/},

   commentList: [ 
    {
      id:1,
      productId:'58c861652d6ab5bfd8db58f9',
      commentUser:{pseudo:'BoomBoom'},
      commentTimeStr:'1年前',
      content:'价格还不错，好好喝',
      type:1
    },
    {
      id:2,
      productId:'58c861652d6ab5bfd8db58f9',
      commentUser:{pseudo:'浩浩',userPhoto:'https://pic2.zhimg.com/4d43d15e81d6e3639e59dd4084d73eed_s.jpg'},
      commentTimeStr:'3小时前',
      content:'一点都不好喝，喝完我差点怀孕了',
      type:2,
      referId:1,
    },
    {
      id:3,
      productId:'58c861652d6ab5bfd8db58f9',
      commentUser:{pseudo:'冯陈'},
      commentTimeStr:'今天',
      content:'楼上傻逼',
      type:1,
      nbLike:3
    },
    {
      id:4,
      productId:'58c861652d6ab5bfd8db58f9',
      commentUser:{pseudo:'JORDAN1'},
      commentTimeStr:'1年前',
      content:'花了多少钱啊？看着确实不错，',
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

 //  itemList: [],

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
   },

/*
   FETCH_PRODUCT: ({ state }, { id }) => {
    //to do
  //  console.log(Vue.http)
    Vue.http.post('getProductById',{ id }).then(res => {
     console.log(res.body)
    })
   },
   */
   FETCH_ITEM_BY_TAG: ({ state,commit },tag) => {
   /*
    let isNoNeedFetch = ((state.fetchedTags[tag] != 'undefined')
                      && (new Number(new Date()) - 3600) > state.fecthGap))
                      */
  //  console.log('tag : '+tag.value)
    let isNeedFetch = (state.fetchedTags[tag.value] == undefined)
    //console.log(isNeedFetch)
    if(isNeedFetch){
     Vue.http.post('getProductByTag',{category:tag.value}).then(res=>{
    //  console.log('start set items')
    //  console.log(res.body.products[0])
      commit('SET_ITEMS',{
                          fetchedData :res.body.products,
                          category    :tag.value
                          })
     })
    }
   }

  },

  mutations: {
   /*
   SET_ITEMS: (state, items) => {
    state.allItems = items;
   }
   */
   SET_ITEM: ({ state },{ product }) => {
    //console.log('item settled')
    state.items[product.id] = product
   },

   SET_ITEMS: (state, fetchedInfo) => {
  //  console.log('set items')
 //   console.log(products.fetchedData)
    let itemIdbyTags = new Array()
    fetchedInfo.fetchedData.forEach( product => {
                                    //  state.items[product.id] = product
                                    //  state.fetchedTags[fetchedInfo.category].push(product.id)
                                   //   console.log(product)
                                      Vue.set(state.items,product.id,product)
                                      itemIdbyTags.push(product.id)
                                     })
    console.log(state.fetchedTags)
    console.log('set:'+fetchedInfo.category+' as '+itemIdbyTags)
    Vue.set(state.fetchedTags,fetchedInfo.category,itemIdbyTags)
    console.log(state.fetchedTags)
   },

   ADD_WISH: (state,{ index,wishStatus }) => {
    state.itemList[index].wished = wishStatus
    wishStatus?state.nbWishes++:state.nbWishes--
   }
  },

  getters: {
   productDetail: (state) => (id) => {
    let product = state.itemList.filter((item) => { return item.id == id})
    return product.length>0?product[0]:'undefined'
   },

   itemsByTag: (state) => (tag) => {
   /*
    console.log('itemsByTag')
    console.log(state.fetchedTags)
    console.log(tag)
    console.log(console.log(Object.keys(state.fetchedTags)))
*/
/*
    let id = '58c736b326ff9bacb4676a0a'
    console.log(state.items)
    return state.items['58c736b326ff9bacb4676a0a']
    */
   return  state.fetchedTags[tag].map(productId => {return state.items[productId]})
    /*
    let id = '58c736b326ff9bacb4676a0a'
    console.log(state.items[id])
    return state.items['58c736b326ff9bacb4676a0a']
    */
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