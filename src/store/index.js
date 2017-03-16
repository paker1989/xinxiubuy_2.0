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

   FETCH_ITEM_BY_TAG: ({ state,commit },tag) => {
    return new Promise((resolve, reject) => {
      let isNeedFetch = (state.fetchedTags[tag] == undefined)
      console.log('isNeedFetch :'+isNeedFetch)
      if(isNeedFetch){
       Vue.http.post('getProductByTag',{category:tag}).then(res=>{
        commit('SET_ITEMS',{
                            fetchedData :res.body.products,
                            category    :tag
                            })
        resolve()
       })
      }else{
        resolve()
      }
    })
   },

   FETCH_ITEM_FOR_TAG: ({ state,commit,dispatch },tags) => {
    let promiseArray = []
    tags.value.forEach( tag => {
      promiseArray.push( dispatch('FETCH_ITEM_BY_TAG',tag))
    })
    return Promise.all(promiseArray)
   }
  },



  mutations: {
   SET_ITEM: ({ state },{ product }) => {
    state.items[product.id] = product
   },

   SET_ITEMS: (state, fetchedInfo) => {
    let itemIdbyTags = new Array()
    fetchedInfo.fetchedData.forEach( product => {
                                      Vue.set(state.items,product.id,product)
                                      itemIdbyTags.push(product.id)
                                     })
    Vue.set(state.fetchedTags,fetchedInfo.category,itemIdbyTags)
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
    if(state.fetchedTags[tag]){
     return  state.fetchedTags[tag].map(productId => {return state.items[productId]})      
    }else{
      return []
    }
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

/*
   FETCH_PRODUCT: ({ state }, { id }) => {
    //to do
  //  console.log(Vue.http)
    Vue.http.post('getProductById',{ id }).then(res => {
     console.log(res.body)
    })
   },

   /*
   SET_ITEMS: (state, items) => {
    state.allItems = items;
   }
   */