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
import store from '../../store'
export default {
  name: 'productDetailWraper',

  components: {
   ProductDetail,Recommend,CommentWraper
  },

  beforeRouteEnter(to,from,next) {
    let id = to.params.id
    store.dispatch('FETCH_PRODUCT', { id })
    //handle error here: for ex: next(false): how?
    next()
  },

  watch: {
   $route() {
    let id = this.productId = this.$route.params.id
    this.$store.dispatch('FETCH_PRODUCT', { id })
   }
  },

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