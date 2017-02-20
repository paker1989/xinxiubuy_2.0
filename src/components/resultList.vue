<template>
  <div class="resultList">
   <a href="#">
     <p class="item-wraper" :item="item" v-for="item in itemList">
      <img :src="item.picPath">
      <span class="text-content">{{item.title}}</span>
      <span class="text-price float">{{item.price}}</span>
     </p>
   </a>
  </div>
</template>

<script>
export default {
  name: 'resultList',

  props: ['itemList'],

  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .resultList {
    position: relative;
    width: auto;
    padding: 5px 15px;
    text-align: left;

  & a:hover {
     color:black;
     font-weight: bold;
     transform: scale(1.2);
     transition: all .2s linear;      
    }

   & .item-wraper {
    position:relative;
    width: auto;
    border-bottom: 1px solid #eee;

    &:hover {     
      color:black;
      font-weight: 900;
      transform: scale(1.1);
      transition: all .2s linear;    
    }

    & > * {
      margin-right: 1em;
    }

    & img {
      width:30px;
      height: 30px;
      border-radius:2px;
      vertical-align: text-bottom;
     }

    & .float {
      position:absolute;
      right: 0;
      bottom:0;
    }
   }/* end item-wraper */
   
  }
</style>
