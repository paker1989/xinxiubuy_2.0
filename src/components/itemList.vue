<template>
  <div class="wishList">
    <Item v-for="item in wishedList" :product="item" class="wishWrapper"/>
  </div>
</template>

<script>
import Item from './item'

export default {
  name: 'wishList',

  components: { 
   Item
  },

  data () {
    return {
      wishedList: this.$store.state.itemList.slice(0,5)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wishList{
   padding-top: 10px;

   & .wishWrapper{
    margin-bottom: 20px;
   }
  }
</style>
