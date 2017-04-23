<template>
  <div class="circleStep">
    <div class="arrow" :style="direction"></div>
  </div>
</template>

<script>
export default {
  name: 'circleStep',

  props:['dir'],

  computed:{
   direction() {
     switch(this.dir){
      case 'left':
           return {   
                   'border-left'  :'3px solid #ccc',
                   'border-bottom':'3px solid #ccc',
                   'transform'    :'translate3d(-30%,-50%,0) rotatez(45deg)'
                  }
      case 'right':
           return {   
                   'border-top'   :'3px solid #ccc',
                   'border-right' :'3px solid #ccc',
                   'transform'    :'translate3d(-70%,-50%,0) rotatez(45deg)'
                  }
      case 'top':
           return {   
                   'border-top'  :'3px solid #ccc',
                   'border-left' :'3px solid #ccc',
                   'transform'   :'translate3d(-50%,-30%,0) rotatez(45deg)'
                  }
      case 'bottom':
           return {   
                   'border-right' :'3px solid #ccc',
                   'border-bottom':'3px solid #ccc',
                   'transform'    :'translate3d(-50%,-70%,0) rotatez(45deg)'
                  }
     }
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .circleStep{
  position:relative;
  width: 50px;
  height: 50px;
  background: white;
  border:1px solid #ccc;
  border-radius: 25px;
  box-shadow:  2px 14px 17px -14px rgba(0,0,0,0.75);
  cursor: pointer;

  & .arrow{
    position: absolute;
    top:50%;
    left:50%;
    width: 12px;
    height:12px;
  }
 }
</style>
