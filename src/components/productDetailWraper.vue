<template>
  <div class="productDetailWraper">
   <productDetail :id="productId"/>
   <recommend :id="productId"/>
  </div>
</template>

<script>
import ProductDetail from './productDetail'
import Recommend from './recommend'

export default {
  name: 'productDetailWraper',

  components: {
   ProductDetail,Recommend
  },

  props: [],

  data () {
    return {
      productId : this.$route.params.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .productDetailWraper{
  width: 100%;
  position: relative;
 }
</style>
 