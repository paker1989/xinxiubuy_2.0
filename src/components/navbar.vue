<template>
  <div class="navbar">
    <div class="screen-navbar">
      <div class="left-container">
        <router-link to="/foo" class="text-nav">首页</router-link>
        <router-link to="/foo" class="text-nav">About me</router-link>
        <router-link to="/upload" class="text-nav">上传产品</router-link>
        <!--<router-link to="/foo" class="text-nav">文章</router-link> -->
        <router-link to="/orders" class="text-nav">订单</router-link>
        <router-link to="/xinxiuRecCats" class="text-nav">店长推荐</router-link>
        <router-link to="/homepage" class="text-nav">新首页</router-link>
        <router-link to="/cropUploader" class="text-nav">新上传</router-link>
        <!--temp menu -->
        <!--
        <router-link to="/authentication" class="text-nav">登录</router-link>
        -->
      </div>
      <div class="right-container">
        <router-link to="/foo">
           <icon name="heart-o"  aria-hidden="true" :class="wishStatus" scale="1"/>
           <span v-if="nbWishes>0" :class="wishStatus">({{nbWishes}})</span>
        </router-link>
        <div>
           <icon name="search" aria-hidden="true" class="icon" scale="1"/></span>
        </div>
        
        <!--
        <div class="search-container" >
          <div class="ui icon input" style="display:none;">
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
        </div>
        --><!-- end search bar -->   
      </div>
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
      itemList: this.$store.state.itemList,
      matchedList: [],
      wishStatus: {
       'text-nav'       : true,
       'addWishes'      : false,
       'icon'           : true      
      }
    }
  },

  watch: {
   nbWishes (oldVal,newVal) {
    if(newVal!=oldVal){
     this.wishStatus.addWishes = true;
     setTimeout(() => {this.wishStatus.addWishes = false},1000)
    }
   }
  },

  computed: {
    searchStatus() {
      return {
        'text-nav'     : true,
        'search'       : true,
        'inSearch'     : this.isInSearch
      }
    },

    nbWishes() {
     return this.$store.state.nbWishes   
    }
  },

  methods: {
    searchEvent (e) {
     if(e.type == 'focus'){
      this.isInSearch = true 
     }else{
      this.isInSearch = false
      this.searchStr = ''
     }
    },

    search (e) {
      if(this.isInSearch){
      let keyWord = this.searchStr.replace(/^\s+|\s+$/g,'')
       this.matchedList = []

       if(keyWord && keyWord.length > 0){
        this.matchedList = this.itemList.filter( item => {
         return   item.title.indexOf(keyWord) > -1
               || item.description.indexOf(keyWord) > -1
               || item.price.indexOf(keyWord) > -1
               || item.tags.filter(tag => {return tag.indexOf(keyWord)>-1}).length > 0
         })
       }else{
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
  @keyframes valueChange {
   0% {transform:scale(0.6);color:lighten(#ff5722,8%)}
   50% {transform:scale(1.4);color:darken(#ff5722,8%)}
   75% {transform:scale(1.1);color:darken(#ff5722,12%)}
   100% {transform:scale(1)}
  }

  .navbar{
  /*
    border-bottom:1px solid #eee;
    padding-bottom:15px;
    */

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
       width: 100%;
       position: relative;
       height: 50px;
     /*  margin: 0 auto;*/
       display: flex;
       justify-content: space-between;
       flex-wrap: nowrap;
       flex-direction: row;
       border-bottom:1px solid #eee;
       padding:0 10%;

        & .left-container{
          width: 40%;
          display: flex;
          justify-content: space-around;
          align-items:center;

         & .text-nav{
         font-size: 13px;
         }
        }

        & .right-container {
          width:10%;
          display: flex;
          justify-content: space-around;
          align-items:center;


         & > * {
          padding-left:15px;
          border-left:1px solid #eee;
         }


         & .icon{
          vertical-align: text-bottom;
          margin-right: .4em;
         }
         
        }

        &  a:hover {
         color:#ff5722;
         font-weight: 600;
        /* border-bottom:2px dashed #ff5722;*/
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

       & .addWishes {
        animation: valueChange 1s;
       }
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
  }



</style>
