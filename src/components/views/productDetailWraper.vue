<template>
  <div class="productDetailWraper">
   <productDetail :id="productId"/>
   <recommend :id="productId"/>
   <CommentWraper :productId="productId"/>
  </div>
</template>

<script>
import ProductDetail from 'components/productDetail'
import Recommend from 'components/wraper/recommendWraper'
import CommentWraper from 'components/wraper/commentWraper'

export default {
  name: 'productDetailWraper',

  components: {
   ProductDetail,Recommend,CommentWraper
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
 