<template>
  <div class="custCheckbox">
    <input type="checkbox" class="hide-check" :id="tag.tagName" :value="tag.tagName">
    <label class="text-content" :for="tag.tagName">{{tag.tagName}}</label>  
  </div>
</template>

<script>
export default {
  name: 'custCheckbox',

  props:['tag'],

  computed:{
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .custCheckbox{
    & .hide-check{
     opacity: 0;
     position:absolute;
     left:-999px;
    }

    & .hide-check:not(:checked) + label,& .hide-check:checked + label {
     position:relative;
     padding-left:20px;
     cursor:pointer;

      &:before{
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 1.1em; height: 1.1em;
        border: 2px solid #ccc;
        background: #fff;
        box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
       }

      &:after{  
        box-sizing: border-box;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        left: 5px;
        top: 1.22222px;
        display: table;
        width: 4.66667px;
        height: 10.33333px;
        border-width: 2px;
        border-style: solid;
        border-top: 0;
        border-left: 0;
        content: '';
        color:white;
        transition: all .2s;
       }    

    }

    & .hide-check:not(:checked) + label{
      &:after{
       opacity: 0;
      }
    }

    & .hide-check:checked + label{
      &:before{
       background:#ff5722;
       border-color:#ff5722;
      }
    } 
 }

 
</style>
