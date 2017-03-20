<template>
  <div class="orderWraper">
   <div class="backToOrdersContainer">
   	<icon name="chevron-left" class="icon"/>
   	<router-link :to="'/orders'" class="text-nav clickable">回到订单</router-link>
   </div><!--end backToOrdersContainer-->
   <div>
   	
   </div>
  </div>
</template>

<script>
export default {
  name: 'orderWraper',

  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .orderWraper{
  position:relative;
  width: 60%;
  padding-top:30px;
  margin:0 auto;

  & .icon{
   vertical-align: text-bottom;
   color: lighten(black,40%);
   margin:0 2px;
   cursor: pointer;
  }

  & .clickable:hover{
   cursor: pointer;
   font-weight:600;
   color:lighten(black,20%)
  }

  & .backToOrdersContainer{
   position:relative;
   text-align: left;
  }
 }
</style>
