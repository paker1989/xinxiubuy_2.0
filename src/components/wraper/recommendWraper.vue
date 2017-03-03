<template>
  <div class="recommend">
    <div class="titleWraper">
     <label class="text-title title">你可能还喜欢</label>
     <div class="randomWrapper">
      <icon name="random" class="text-nav random"></icon>
      <label class="text-content">换一批</label>
     </div>
    </div>
    <div class="mayLikeItemsWraper">
        <div v-for="item in itemList" class="product-wraper">
          <productCard :product="item" />
        </div>         
    </div><!-- end product-container -->
  </div>
</template>

<script>
import productCard from 'components/productCard'
export default {
  name: 'recommend',

  components: {
   productCard
  },

  props: ['id'],

  data () {
    return {
      itemList:[]
    }
  },

  created() {
   this.itemList = this.$store.state.itemList.slice(0,9)
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $height : 300px;

 .recommend{
  width: 1000px;
  height: $height;
  margin:100px auto 50px auto;
  position: relative;
  text-align: left;
  border-top:1px solid darken(#eee,10%);
  border-bottom:1px solid darken(#eee,10%);
  display: flex;
  justify-content: flex-start;
  
  & .titleWraper{
   position:relative;
   vertical-align: middle; 
   width:20%;
   height: 100%;

   & .title{
    position:absolute;
    display: block;
    width: 10px;
    left:40%;
    top:20%;
    font-size: 13px;
   }

   & .randomWrapper{
    position:absolute;
    display: block;
    left:30%;
    bottom:30%;   

    &:hover > *{
     color:#ff6a3c;
     cursor: pointer;
    }
    
    & .random{
     vertical-align: text-bottom;  
    }

   }
  }

  & .mayLikeItemsWraper {
    position:relative;
    width: 80%; 
    height: 300px;
    overflow: hidden;

    & > * {
     margin: auto 10px;
    }

    & .product-wraper {
      display: inline-block;
      width:180px;
      height:250px;
      border:1px solid #eaebec;
      margin-top:25px;
    }

  }/* end product-container */
 }
</style>
