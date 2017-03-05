<template>
  <div class="uploader">
    <div class="pictureDetail">
     picture area
    </div>
    <div class="metaDataEditor">
     <div :class="{'ui fluid input title-size productFeild':true,
                   'activated':fieldFocusFactory['产品名称'],
                   'hidePlaceholder':productName.trim().length>0}" data-name="产品名称">
      <input type="text" v-model="productName" @focus="setValue('产品名称');" @blur="setValue('产品名称');">
     </div>
     <div :class="{'ui fluid input title-size productFeild':true,
                   'activated':fieldFocusFactory['价格'],
                   'hidePlaceholder':price.trim().length>0}" data-name="价格">
        <input type="text" v-model="price" @focus="setValue('价格');" @blur="setValue('价格');">
        <div class="ui basic label text-content">
          元
        </div>
     </div>
     <div :class="{'ui fluid input title-size productFeild':true,
                   'activated':fieldFocusFactory['运费'],
                   'hidePlaceholder':deliveryFrais.trim().length>0}" data-name="运费">
        <input type="text" v-model="deliveryFrais" @focus="setValue('运费');" @blur="setValue('运费');">
        <div class="ui basic label text-content">
          元
        </div>
     </div>
     <div :class="{'ui form largr-size productFeild':true,
                   'activated':fieldFocusFactory['备注'],
                   'hidePlaceholder':descritption.trim().length>0}" data-name="备注">
       <div class="field">
        <textarea v-model="descritption" rows="4" @focus="setValue('备注');" @blur="setValue('备注');"></textarea>
       </div>
     </div>
     <div class="optionContainer">
      <div class="optionTitle" @click="addOption">
        <div :class="{'creating':creatingOption}">
         <icon name="plus" v-if="!creatingOption" class="user-icon clickable" scale="1.3"></icon>
         <icon name="minus" v-if="creatingOption" class="user-icon clickable" scale="1.3"></icon>
         <label :class="{'text-nav':true, 'clickable':!creatingOption}">{{creatingOption==true?'编辑可选项':'添加可选项'}}</label>
        </div>
        <label class="text-action" v-if="creatingOption" @click.stop="cancelOptionEdition">取消</label>
        <label class="text-action" v-if="creatingOption" @click.stop="finishOptionEdition">完成</label>
      </div>
      <div class="optionEditor" v-if="creatingOption">
       <div class="option">
         <div :class="{'ui fluid input productFeild':true,
                       'activated':fieldFocusFactory['标题'],
                       'hidePlaceholder':optionKey.trim().length>0}" 
              data-name="标题" >
          <input type="text" v-model="optionKey" @focus="setValue('标题');" @blur="setValue('标题');">
         </div>
       </div>
       <div class="option">
         <div :class="{'ui fluid input productFeild':true,
                       'activated':fieldFocusFactory['可选项'],
                       'hidePlaceholder':optionValue.trim().length>0}" 
              data-name="可选项"> 
           <input type="text" class="optionValueInput" v-model="optionValue"
            @keyup.13="addOptionValue"
            @focus="setValue('可选项');"
            @blur="setValue('可选项');">
           <span class="optionValue" @click="addOptionValue">添加</span>
         </div>
         <div class="addedOptionWraper" v-if="editingAddedOptions.length>0">
          <div class="addedOption" v-for="(addedOption,index) in editingAddedOptions">
           <span class="text-content">{{addedOption}}</span>
           <span style="cursor:pointer;" @click="removeCurrentOption(index)">移除</span>
          </div>
         </div>
       </div>
      </div>
     </div>
     <div class="tagContainer">
      <div class="tagTitle">
       <icon name="plus" class="user-icon clickable" scale="1.3"></icon>
       <label class="text-nav clickable">添加标签</label>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'uploader',

  data () {
    return {
      fieldFocusFactory:  {},
      creatingOption      : false,
      productName         : '',
      price               : '',
      descritption        : '',
      optionKey           : '',
      optionValue         : '',
      deliveryFrais       : '',
      editingAddedOptions : [],
      addedOptions        : []
    }
  },

  created() {

  },

  methods: {
   setValue(field) {
    this.$set(this.fieldFocusFactory,field,event.type=='focus'?true:false)
   },

   addOption(e) {
    this.creatingOption = true
   },

   addOptionValue() {
    this.editingAddedOptions.push(this.optionValue)
    this.optionValue = ''
   },

   removeCurrentOption(index) {
    this.editingAddedOptions.splice(index,1)
  // delete this.editingAddedOptions[0]
   },

   cancelOptionEdition() {
    this.editingAddedOptions = []
    this.optionKey = this.optionValue = ''
    this.$nextTick(() => {this.creatingOption = false})
   },

   finishOptionEdition() {
    this.editingAddedOptions = []
    this.optionKey = this.optionValue = ''
    this.$nextTick(() => {this.creatingOption = false})
   }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $title-size : 50%;
 $lager-size: 80%;

 .uploader{
  position: relative;
  width: 70%;
  margin:0 auto;
  display: flex;
  justify-content: space-between;

  & .text-action{
   padding:5px 0;
   font-size:14px;
   font-weight: 500;
   letter-spacing: .1em;
   color: darken(#a0c982,20%);
   cursor: pointer;

   &:hover{
    font-weight: 600;
   }
  }

  & .clickable:hover{
   color:#ff5722;
   cursor: pointer;
   border-bottom:1px dashed #ff5722;

   &:active{
    font-weight: 800;
   }
  }

  & .pictureDetail{
   width: 40%;
   height: 500px;
   border:1px solid #eee;
  }

  & .metaDataEditor{
   position:relative;
   width: 60%;
   text-align: left;
   padding-top:40px;
   padding-left:40px;
   padding-right:100px;

   & > * {
    position:relative;
    margin-bottom: 20px;
   }

   & .title-size{
    width: $title-size;
    min-width: 150px;
   }

   & .lager-size{
    width: $lager-size;
    min-width: 240px;
   }

   & .user-icon{
    color:black;
    opacity: .7;
    margin-right: .3em;
    vertical-align: text-bottom;
   }

   & .productFeild{
    &:before{
     content: attr(data-name);
     position:absolute;
     left:10px;
     top:10px;
     color:#ccc;
     letter-spacing: .1em;
     transition:all .2s linear;  
     pointer-events: none; 
    }

    &.activated,&.hidePlaceholder{
     &:before{
      font-weight:600;
      transform: scale(.8);
      color:lighten(black,10%);
      top:-20px;
      left:0px;
     }
    }
   }

   & .optionContainer, & .tagContainer{
     & .text-nav{
      vertical-align: top;
      font-size: 16px;
     }   
   }

   & .optionContainer{  

    & .optionTitle{
      display: flex;

      & > * {
       margin-right:1em;
      }

      & .creating{
       background: lighten(grey,20%);
       width: 140px;
       text-align: center;
       padding: .3em .7em;
       border-radius:4px;

       & .text-nav, & .user-icon{
        color:white;
       }
      }
    }



    & .optionEditor{
      margin-top: 20px;
      width: 80%;
      position:relative;
      display: flex;
      justify-content: space-between;
      
      & .option:nth-child(1){
       width: 70%;
       margin-right: 10px;
      }

      & .option:nth-child(2){
       width: 100%;
      }

      & .optionValueInput{
      border-bottom-left-radius:0em;
      border-bottom-right-radius:0em;
      }

      .optionValue{
         position:absolute;
         right:10px;
         top:10px;
         font-weight:600;
         color:darken(#a0c982,12%);
         letter-spacing: .1em;
         transition:all .1s linear;  
         cursor:pointer;

        &:hover{
         color:darken(#a0c982,30%);
        }
      }

      & .addedOptionWraper{
       position:relative;
       width: 100%;
       border:1px solid rgba(34,36,38,.15);
       border-bottom-left-radius:.28571429rem;
       border-bottom-right-radius:.28571429rem;

       & .addedOption{
        width: 100%;
        padding:7px 10px;
        display: flex;
        justify-content: space-between;
        border-top:1px solid rgba(34,36,38,.15);

        &:nth-child(1){
         border-top:none;
        } 

        & .user-icon{
         z-index: 999;
         color: lighten(black, 30%);
         cursor:pointer;

         &:hover{
          color: lighten(black, 10%);
         }
        }
       }
      }
    }
   }

  }/* end meta data editor*/
 }
</style>
