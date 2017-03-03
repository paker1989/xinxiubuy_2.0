<template>
  <div class="commentWraper">
   <div class="title"><span class="text-title">评论</span></div>
   <div class="commentContainer">
   	  <comment v-for="comment in comments" :comment="comment"/>
   </div>
  </div>
</template>

<script>
import Comment from './comment'

export default {
  name: 'commentWraper',

  props:['productId'],

  components: {
   Comment
  },

  data () {
    return {
      comments: this.$store.getters.comments(this.productId)
    }
  },

  created() {
  	console.log('comments length : '+this.comments.length)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .commentWraper{
 	position: relative;
 	text-align: center;
 	width: 1000px;
 	margin:0 auto;

  & .title{
  	width: 100%;
  	text-align: left;
  	padding:0 30px;
    margin-bottom: 30px;
  //*  border-bottom:1px solid darken(#eee,4%);*/

  	& .text-title{
  	 font-size: 15px;
  	 letter-spacing: .2em;
  	}
  }

  & .commentContainer{
  	width: 100%;
    padding: 0 30px;
    
    border-left:1px solid darken(#eee,4%);
    border-right:1px solid darken(#eee,4%);
    

  }
 }
 
</style>
