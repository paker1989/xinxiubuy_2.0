<template>
  <div :class="{'custInput':true,'keyWord-filled':keyWordFilled,'hidden-by-icon':hideByIcon}" 
       :data-name="placeholder" :style="width">
    <input v-if="!type" type="text" class="input"
           v-model="model" 
           @focus="inputFocus=true" 
           @blur="inputFocus=false"
           @keyup="emitInput"><!--type: text-->
    <input v-if="type=='password'" type="password" class="input"
           v-model="model" 
           @focus="inputFocus=true" 
           @blur="inputFocus=false"
           @keyup="emitInput"><!--type: password-->
    <div @click="toggle=!toggle" v-if="icon">
      <icon :name="icon" class="icon" v-show="icon" scale=".9"/>
    </div>
    <textarea v-if="type=='textarea'" class="inputArea"
           v-model="model" 
           @focus="inputFocus=true" 
           @blur="inputFocus=false"
           @keyup="emitInput"><!--type: textarea-->
    </textarea>
  </div>
</template>

<script>
export default {
  name: 'custInput',

  props:['type','placeholder','cusHeight','icon','modelValue','changeStatus'],

  data() {
   return {
    model      : this.modelValue?this.modelValue:'',
    toggle     : true,
    inputFocus : false,
    timer      : null
   }
  },

  computed: {
   width() {
    return {
            'width' : this.hideByIcon?
                      '0px':'100%'                
           }
   },
   

   /*
   textareaHeight() {
     return {
         'height' : this.cusHeight?this.cusHeight+'px':'150px'            
     }
   },
   */

   keyWordFilled() {
    return new String(this.model).trim().length>0 || this.inputFocus
   },
   
   hideByIcon() {
    return this.icon && this.toggle
   }
  },

  methods: {
   emitInput() {
     if(this.timer) clearTimeout(this.timer)

     this.timer = setTimeout( () => {
      this.$emit('modelEmited', this.model)
     },100)
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .custInput{
  border-bottom:1px solid #eee;
  position: relative;
  padding: 4px 10px;
  margin-bottom: 25px;
  transition: width .3s linear;
  color: lighten(black,30%);
  /*  border-radius:3px;*/
  /*box-shadow: -2px 3px 6px -3px rgba(122,120,122,0.75);*/

  &:not(.hidden-by-icon):after{
   content: attr(data-name);
   position:absolute;
   left:10px;
   top:7px;
   color:#ccc;
   font-size: 12px;
   letter-spacing: .1em;
   transition:all .2s linear;  
   pointer-events: none; 
  }
  
  &.keyWord-filled{
    /*border-bottom:1px solid darken(blue,4%);*/
    border-bottom:2px solid #ff5722;

    &:after{
     top:-20px;
     left:0px;
    }
  }

  & .input, & .inputArea{
   border:none;
   outline: none;
   width: 100%;
   height: 100%;
  }

  & .input{
   height: 25px;
  }

  & .inputArea{
   padding-top:20px;
   resize: vertical;
  }

  & .icon{
   position:absolute;
   right:-5px;
   bottom:10px;
   color:lighten(black,40%);
   cursor: pointer;

   &:hover{
    color:black;
   }
  }

  &.hidden-by-icon{
   border-bottom:none;
  }

 }
</style>
