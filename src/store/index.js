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

   isTagInitialized: false,
   allTags    : [], //all tags exist in db
   updatedTags: [], //if tag exist in this array, meaning tag is updated, so need to fetch again
   fetchedTags: {/*[tagName:string]:lastFetchedTime*/},  

   manualEnrolUsers: {/*[id:string]: User*/},
   items: {/*[id:string]: Product*/},

   /*temp data, should be replaced. it should not be handled in store*/
   currentUser: {
    id             : 'fakeduuid1',
    userPseudo     : 'xinxiu',
    selectedTags   : ['动漫','游戏','香水'],
    createDate     : new Date(),
    isAuth         : true,
    wishedList     : []
   },



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

   FETCH_ITEM_BY_TAG: ({ state,getters,commit },tag) => {
    return new Promise((resolve, reject) => {
      if(getters.isTagNeedFetch(tag)){
       Vue.http.post('getProductByTag',{category:tag}).then(res=>{
        commit('SET_ITEMS',{
                            fetchedData :res.body.products,
                            category    :tag
                            })
       //提取以后就从updatedTags这个集合中删除
        if(state.updatedTags.indexOf(tag)>-1){
        commit('UPDATE_TAG', {
                              tagName : tag,
                              isAdd   : false
                             })
        }
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
   },

   FETCH_ALL_TAGS: ({ state, commit }) => {
    return new Promise((resolve,reject) => {
      if(state.isTagInitialized)
       resolve()

      Vue.http.post('/fetchAllTags').then((res,err) => {
       if(!err){
        commit('INITIALIZE_TAG',{data : res.body.allTags})
        resolve()
       }else{
        reject(err)
       }
      })
    })
   },

   SAVE_NEW_TAGS: ({ state, commit }, newTags) => {
    return new Promise((resolve,reject) => {
     newTags = newTags.filter(tag => {return state.allTags.indexOf(tag)==-1})
     let data = new FormData()
     data.append('tagsToSave',newTags)
     Vue.http.post('/saveNewTags',data).then((res,err) => {
      if(!err){
       commit('SAVE_NEW_TAGS', newTags)
       resolve(res.body.tags)
      }else{
       reject(err)
      }
     })
    })
   },

   FETCH_MANUAL_USERS: ({ commit }) => {
    return new Promise( (resolve,reject) => {
     Vue.http.post('/fetchManualUsers').then( (res,err) => {
      if(!err){
       commit('SET_ALL_MANUAL_USERS',res.body.users)
       resolve()
      }else{
       reject(err)
      }
     })
    })
   },

   SAVE_USER: ({ commit }, newUser) => {
    return new Promise( (resolve,reject) => {
     let data = new FormData()
     data.append('userId',newUser.userId)
     data.append('userName',newUser.userName)
     data.append('address',newUser.address)
     data.append('phoneNumber',newUser.phoneNumber)
     data.append('comment',newUser.comment)

     Vue.http.post('/saveNewUser',data).then( (res,err) => {
      if(!err){
       if(res.body.user){
        newUser.userId = res.body.user.userId
       }

       commit('ADD_OR_UPDATE_USERS',{value :newUser})
       resolve(newUser)
      }else{
       reject(err)
      }
     })
    })
   },

   SAVE_OR_UPDATE_ORDER: ({ commit }, newOrderDetail) => {
    return new Promise( (resolve, reject) => {
     let data = new FormData()
     
     data.append('order',JSON.stringify(newOrderDetail.order))
     data.append('userId',newOrderDetail.user.userId)
     if(newOrderDetail.update) data.append('isUpdate',newOrderDetail.update)

     Vue.http.post('/saveOrUpdateOrder',data).then( (res,err) => {
      if(!err){
       commit('ADD_OR_UPDATE_USERS',{value : newOrderDetail.user})
       resolve(newOrderDetail.user)
      }else{
       reject(err)
      }
     })
    })
   },
/*
   UPDATE_ORDER: ({ commit },updatedOrderDetail) => {
    return new Promise((resolve,reject) => {
     data.append('order',JSON.stringify(updatedOrderDetail.order))
     data.append('userId',newOrderDetail.user.userId)

     Vue.http.post('/updateOrder',data).then( (res,err) => {
      if(!err){
       commit('ADD_OR_UPDATE_USERS',{value : updatedOrder.user})
      }
     })
    })
   }
*/
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
   },

  //所有加入这里的标签表示下次强制刷新，从数据库里提取。一旦提取以后，就从这个集合里删除
   UPDATE_TAG: (state, tagInfo) => {
    let isTagExist = state.updatedTags.indexOf(tagInfo.tagName)>-1

    if(tagInfo.isAdd && !isTagExist)
      state.updatedTags.push(tagInfo.tagName)
    else if(!tagInfo.isAdd && isTagExist)
      state.updatedTags.splice(state.updatedTags.indexOf(tagInfo.tagName),1)  
   },

  //一个flag，如果是true，表示所有标签已经提取过了。否则需要提取
   INITIALIZE_TAG: (state, allTags) => {
    state.allTags = new Array()
    allTags.data.forEach( tag => {
     state.allTags.push(tag.tagName)
    })
    state.isTagInitialized = true
   },

   //每次上传产品的时候，需要加入新的标签
   SAVE_NEW_TAGS: (state, newTags) => {
    state.allTags = state.allTags.concat(newTags)
   },

   SET_ALL_MANUAL_USERS: (state, manualEnrolUsers) => {
    manualEnrolUsers.forEach( user => {
     Vue.set(state.manualEnrolUsers,user.userId,user)
    })
   },

   ADD_OR_UPDATE_USERS: (state, user) => {
    if(state.manualEnrolUsers[user.value.userId]){
      state.manualEnrolUsers[user.value.userId].userName = user.value.userName
      state.manualEnrolUsers[user.value.userId].phoneNumber = user.value.phoneNumber
      state.manualEnrolUsers[user.value.userId].address = user.value.address
      state.manualEnrolUsers[user.value.userId].comment = user.value.comment
    }
    else{
     Vue.set(state.manualEnrolUsers,user.value.userId,user.value)
    }
     
   }
  },

  getters: {
   itemById: (state) => (id) => {
    /*let product = state.itemList.filter((item) => { return item.id == id})*/
    return state.items[id]?state.items[id]:undefined
   },

   isTagNeedFetch: (state) => (tag) => {
    return state.fetchedTags[tag] == undefined || state.updatedTags.indexOf(tag) > -1
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
   },

   selectedManualUser: (state) => (id) => {
    return state.manualEnrolUsers[id]
   },

   allManualUsers: (state) => {
    return Object.keys(state.manualEnrolUsers).map( userId => {return state.manualEnrolUsers[userId]})
   }
  }
});

export default store;

/*
   FETCH_PRODUCT: ({ state }, { id }) => {
    //to do
    Vue.http.post('getProductById',{ id }).then(res => {
    })
   },

   /*
   SET_ITEMS: (state, items) => {
    state.allItems = items;
   }
   */