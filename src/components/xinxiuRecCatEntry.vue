<template>
  <div class="xinxiuRecCatEntry" :style="{height:entry.height}">    
     <label class="entry-label">{{entry.cat}}</label>
     <div :style="" class="entry-bg" :style="{backgroundImage:'url(\''+entry.url+'\')'}"></div>
  </div>
</template>

<script>
  export default {
    name  : 'xinxiuRecCatEntry',

    props : ['entry'],

    data() {
     return {
     }
    }

  }
</script>

<style lang="scss" scoped>
 $border-radius: 5px;

 .xinxiuRecCatEntry{
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0 0 1em;
  border-radius:  $border-radius;

  &:after{
   content:'';
   position:absolute;
   border-radius:  $border-radius;
   top:0;
   left:0;
   width:100%;
   height: 100%;
   background:black;
   opacity: .3;	
   z-index:2;   
  }

  & .entry-label{
   position:absolute;
   top:50%;
   left:50%;
   transform: translate3d(-50%,-50%,0);
   font-weight: 600;
   font-size: 18px;
   color:white;
   letter-spacing: .2em;
   z-index:3;
  }

  & .entry-bg{
   position:absolute;
   width:100%;
   height: 100%;
   border-radius:  $border-radius;
   z-index:1;
   background-size:cover;
   background-position:center;
  }

 }
</style>

