<template>
  <div class="xinxiuRecCats"> 
   <xinxiuRecCatEntry :entry="entry" v-for="entry in recommendList"/>
  </div>
</template>

<script>
import xinxiuRecCatEntry from 'components/xinxiuRecCatEntry'
import recCatJson from 'assets/xinxiuRecommendCats'

export default {
 name: 'xinxiuRecCats',

 data() {
  return {
   recommendList: []
  }
 },

 components: {
  xinxiuRecCatEntry
 },

 created() {
  recCatJson.forEach((obj) => {
   this.recommendList.push(obj)
  })
 }


}
</script>

<style lang="scss" scoped>
 .xinxiuRecCats{
  position: relative;
  padding: 10px;
  margin: 0 auto;
  width: 720px;
  column-count: 3;
 }
</style>

