<template>
  <div class="product-col"> 
    <div class="category">
     <div class="category-info">
      <span class="text-title block">{{category}}</span>
      <icon name="edit" class="text-content"></icon>
      <span class="text-content">最后更新于: 19/O2/2017</span>
     </div>
    </div><!-- end category -->
    <!--pagination-->
    <div v-if="totalPage>1" class="ui pagination menu">
      <a class="icon item" @click="toggleNavigation('left')" v-if="beginPage!=1">
        <i class="left arrow icon text-content"></i>
      </a>
      <a :class="{item:true,selected:currentPage==1}" v-if="beginPage>maxNbPage" @click="navToAnotherPage(1)">
        <span class="text-content">1</span>
      </a>
      <a class="item disabled" v-if="beginPage>maxNbPage">
        <span class="text-content">...</span>
      </a>
      <a :class="{item:true,selected:currentPage==i}" v-for="i in paginationList" @click="navToAnotherPage(i)">
        <span class="text-content">{{i}}</span>
      </a>
      <a class="icon item" @click="toggleNavigation('right')" v-if="endPage!=totalPage">
        <i class="right arrow icon text-content"></i>
      </a>
    </div>
    <!-- end pagnination -->
    <div class="productContainer">
        <div v-for="item in listToDisplay" class="product-wraper">
          <productCard :product="item" />
        </div>         
    </div><!-- end product-container -->
    <div class="all" v-if="thereIsMore && !loadingData" @click="fetchMore">
      <icon name="angle-double-down" class="text-content"></icon>
      <span class="text-content">更多</span>
    </div><!-- end all -->
    <div class="all" v-if="thereIsMore==false && !loadingData">
      <span class="text-content disabled">没有更多了</span>
    </div><!-- end all -->
    <load v-if="loadingData==true"/>
  </div>
</template>

<script>
 import ProductCard from 'components/productCard'
 import Load from 'components/loading'

 export default {
   name: 'product-col',

   props: ['category'],

   components: {
    ProductCard,Load
   },
   
   mounted () {
    let totalNbItems = this.$store.state.itemList.length
    //test: add back after
 //   this.itemList = this.$store.state.itemList.slice(0,
 //   totalNbItems>this.nbFirstFetch?this.nbFirstFetch:totalNbItems)

    //test : to remove
    
    /*
    this.$http.get('/getProducts',(data) => {
      console.log(data)
     data.products.forEach( product => {
      this.itemList.push(product)
     })
    })
    */

    this.$http.get('/getProducts').then((res)=>{
     res.body.products.forEach( product => {
      this.itemList.push(product)
     })   
    })
    this.thereIsMore = totalNbItems>this.nbFirstFetch
   },

   data () {
     return {
      currentPage: this.$store.state.defaultCurrentPage,
      maxNbPage: this.$store.state.maxNbPagePerPagination,
      beginPage: this.$store.state.defaultBeginPage,
      maxNbSlidePage: this.$store.state.maxNbSlidePerNav,
      nbFirstFetch: this.$store.state.nbFirstFetch,
      maxNbItemsPerPage: this.$store.state.maxNbItemsPerPage,
      nbItemsPerFetch: this.$store.state.nbItemsPerFetch,
      itemList: [],
      loadingData:false,
      thereIsMore:true
     }
   },

   computed: {
    totalPage() {
      return Math.ceil(this.itemList.length/this.maxNbItemsPerPage)
    },

    endPage() {
      return (this.totalPage<(this.beginPage+this.maxNbPage-1))
             ?this.totalPage:(this.beginPage+this.maxNbPage-1)
    },

    paginationList() {
     let paginationList = []
     for(let i=this.beginPage;i<=this.endPage;i++){
       paginationList.push(i)
     }
     return paginationList
    },

    listToDisplay() {
     let itemsLength = this.itemList.length
     if(this.currentPage<this.totalPage){
      return this.itemList.slice(this.maxNbItemsPerPage*(this.currentPage - 1),
                                 this.maxNbItemsPerPage*this.currentPage)
     }else{
      return this.itemList.slice(this.maxNbItemsPerPage*(this.currentPage - 1),itemsLength)
     }
    }
   },

   methods: {
    fetchMore() {
     this.loadingData = true;
     setTimeout(() => {
      let totalNb = this.$store.state.itemList.length
      let currentNbFetched = this.itemList.length  
      let toFetch = totalNb>currentNbFetched+this.nbItemsPerFetch
                    ?this.nbItemsPerFetch:totalNb-currentNbFetched

      if(toFetch==0){
       this.thereIsMore = false
       this.loadingData = false
       return
      }     
      
      if(currentNbFetched+toFetch==totalNb){
       this.thereIsMore = false
      }

      let newFetchs = this.$store.state.itemList.slice(currentNbFetched,currentNbFetched+toFetch)
      newFetchs.forEach( item => {this.itemList.push(item)})
      this.loadingData = false
      /* trigger handle scroll event */
      this.$parent.displayNavHelper()
     },500)
    },

   
    navToAnotherPage(i) {
      this.$nextTick(() => {
       this.currentPage = i
      })
    },

    toggleNavigation(direction) {
      if(direction === 'right'){
       this.$nextTick(()=>{
        if(this.totalPage==this.endPage)return
        this.beginPage = (this.totalPage-this.endPage)>this.maxNbSlidePage
                         ?this.beginPage+this.maxNbSlidePage:this.beginPage+(this.totalPage-this.endPage)         
      })
      }else{
       this.$nextTick(()=>{
         this.beginPage = (this.beginPage-this.maxNbSlidePage) < 1 
                          ?1:(this.beginPage-this.maxNbSlidePage)
       })
      
      }

    }
    
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .product-col {
  width: 100%;
  position: relative;
  margin: 50px auto;

  & #test {
    color:green;
  }
  & .category {
   position:relative;
   width: 30%;
   height: 80px;
   margin: 40px auto 10px auto;
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
     font-size: 14px;
    }
   }
  }

  & .productContainer {
    position:relative;
    width:100%;
    max-width: 75vw;
    margin: 10px auto 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;    

    & > * {
     margin: auto 1px;
    }

    & .product-wraper {
      width:240px;
      height:320px;
      border:1px solid darken(#eaebec,4%);
      margin-bottom: 2px;
    }

  }/* end product-container */

  & .all {
    width:100%;
    max-width: 71vw;
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
     /*background:darken(#eee,4%);*/
   
    & .text-content:not(.disabled) {
     transform: scale(1.3);
     color: black;
     font-weight: 900;
     transition: all .2s linear;
    }
  }
  } /* end all */

  /*
  & .loadingData {
    margin-bottom: 300px;
    transition: margin-bottom .5s ease-in;
  }
  */

  & .ui.menu .item.selected {
    background:#eee;

    & .text-content {
     font-size: 14px;
     font-weight: 900;
    }
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