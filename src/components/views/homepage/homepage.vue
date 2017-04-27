<template>
  <div class="homepage">    
    <section class="xinxiuRecContainer">
      <xinxiuRecommand/>
    </section>
  </div>
</template>

<script>
import XinxiuRecommand from './children/xinxiuRecommand/xinxiuRecommand'

export default {
  name: 'homepage',

  components: {
    XinxiuRecommand
  }
}
</script>

<style lang="scss" scoped>
 .homepage{
  position: relative;
  width: 100%;
  /* background: rgba(0,0,0,.05);*/
  & .xinxiuRecContainer{
   position:relative;
   width:80%;
   margin:0 auto;
  }
 }
</style>

