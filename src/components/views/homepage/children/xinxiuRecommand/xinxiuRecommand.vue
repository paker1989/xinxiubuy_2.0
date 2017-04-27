<template>
  <div class="xinxiuRecommand">    
    <div class="navbar">
      <span class="title">秀秀推荐</span>
    </div><!--标题栏-->
    <ul>
     <recCard v-for="i in 4" />
    </ul><!--推荐-->
    <div>
      
    </div><!--更多-->
  </div>
</template>

<script>
import RecCard from './children/recCard'
export default {
  name: 'xinxiuRecommand',

  components: {
    RecCard
  }
}
</script>

<style lang="scss" scoped>
 .xinxiuRecommand{
 	position: relative;
 	width: 100%;

 	& .navbar{
 	 text-align: left;
 	 margin:20px 0;

 	 & .title{
 	  font-size:15px;
 	  font-weight: bold;
 	  opacity: .8;
 	 }
 	}

 	& ul{
     position:relative;
     display: flex;
     justify-content: space-between;
     flex-wrap: wrap;
 	}
 }
</style>

