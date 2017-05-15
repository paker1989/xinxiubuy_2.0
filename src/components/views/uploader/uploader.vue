<template>
 <div class="uploaderContainer">
  <div class="uploader">
   <div class="pictureDetail">
     <imgUploader :submitStatus="submitStatus" 
       v-on:imgStatusCheckResult="uploadPictures"
       v-on:fileUuidsGenerated="resumeUpload"/>
   </div><!-- picture area-->
   <div class="metaDataEditor">
    <form class="ui form upload" action="/foo" onsubmit="return false;">
     <div :class="{'ui fluid input field title-size productFeild':true,
                   'activated':fieldFocusFactory['产品名称'],
                   'hidePlaceholder':productName.trim().length>0}" data-name="产品名称">
      <input type="text" v-model="productName" name="productName" @focus="setValue('产品名称');" @blur="setValue('产品名称');">
     </div>
     <div :class="{'ui fluid input field title-size productFeild':true,
                   'activated':fieldFocusFactory['价格'],
                   'hidePlaceholder':price.trim().length>0}" data-name="价格">
        <input type="text" v-model="price" name="price" @focus="setValue('价格');" @blur="setValue('价格');">
        <div class="ui basic label text-content">
          元
        </div>
     </div>
     <div :class="{'ui fluid input field title-size productFeild':true,
                   'activated':fieldFocusFactory['运费'],
                   'hidePlaceholder':deliveryFee.trim().length>0}" data-name="运费">
        <input type="text" v-model="deliveryFee" name="livraisonFee" @focus="setValue('运费');" @blur="setValue('运费');">
        <div class="ui basic label text-content">
          元
        </div>
     </div>
     <div :class="{'ui form largr-size field productFeild':true,
                   'activated':fieldFocusFactory['备注'],
                   'hidePlaceholder':description.trim().length>0}" data-name="备注">
       <div class="field">
        <textarea v-model="description" rows="4" name="comment" @focus="setValue('备注');" @blur="setValue('备注');"></textarea>
       </div>
     </div>
     <div class="addedOptionContainer" v-show="addedOptions.length>0">
       <span class="text-title">已添加的可选项:</span>
       <table class="ui celled table">
        <thead>
          <tr>
           <th class="three wide text-content">标题</th>
           <th class="ten wide text-content">可选项</th>
           <th class="three wide text-content">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(addedOption,index) in addedOptions">
            <td>
              <div class="text-nav">{{addedOption.key}}</div>
            </td>
            <td>
             <div>
              <span class="text-content optionItem" v-for="item in addedOption.values">{{item}}</span>
             </div>
            </td>
            <td>
             <span class="text-action editing" v-if="addedOption.editing">编辑中</span>
             <span class="text-action" v-if="!addedOption.editing" @click="editExistingOption(index)">编辑</span>
             <span class="text-action negative" v-if="!addedOption.editing" @click="removeExistingOption(index)">移除</span>
            </td>
          </tr>
        </tbody>
       </table>
     </div><!-- added option container end -->
     <div class="optionContainer">
      <div class="optionTitle" @click="addOption">
        <div :class="{'creating':creatingOption}">
         <icon name="plus" v-if="!creatingOption" class="user-icon clickable" scale="1.3"></icon>
         <icon name="minus" v-if="creatingOption" class="user-icon clickable" scale="1.3"></icon>
         <label :class="{'text-title':creatingOption==false,'text-nav':creatingOption, 'clickable':!creatingOption}">{{creatingOption==true?'编辑可选项':'添加可选项'}}</label>
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
            @keyup.stop.prev.13="addOptionValue"
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
     </div><!-- end optionContainer -->
     <div class="tagContainer">
      <div class="addTagContainer">
       <div class="manualAddTagContainer">
        <div :class="{'ui fluid input productFeild':true,'activated':fieldFocusFactory['标签'],
            'hidePlaceholder':manualTagValue.trim().length>0}" data-name="标签"> 
         <input type="text" v-model="manualTagValue" 
                @focus="setValue('标签');" 
                @blur="setValue('标签');"
                @keyup="searchOrAddTag('-1')" debounce="500">
         <span class="tag-add" @click="addTag('-1')">添加</span>
        </div>
        <div class="matchedTagWraper" v-if="matchedTags.length>0">
            <span v-for="(tag,index) in matchedTags" 
              class="matchedTag" @click="addTag(index)">
              {{tag.value}}
            </span> 
        </div>
       </div>
       <div class="alternativeAddTag">
        或者<a class="text-action" @click.stop="showTagModal">点击选择</a>
       </div>
      </div><!--addTagContainer end -->
      <div class="addedTagContainer" v-if="selectedTags.length>0">
       <label class="text-title" @click="showTagModal">已添加标签:</label>
       <div class="addedTags">
          <span  v-for="(tag,index) in selectedTags">
           <div class="ui button selectedTag" data-tooltip="点击移除" 
                data-position="bottom center" data-inverted=""
                @click="removeSelectedTag(index)">
            {{tag.value}}
           </div>
          </span>         
       </div>
      </div><!-- addedTagContainer end -->
      <div class="ui small modal tag-selection" id="tag-selection">      <!-- tag selection modal --> 
        <div class="header">选择标签</div>
        <div class="content">
         <div class="availableTags"> 
          <span v-for="(tag,index) in availableTags" 
            :class="{'text-tag':true,'selected':tag.isSelected}"
            @click="toggleSelection(index)">
            {{tag.value}}
          </span>
        </div>  
        </div>
        <div class="actions">
          <div class="ui ok button">关闭</div>
        </div>
      </div>                                                              <!-- tag selection modal end -->
     </div><!-- end tagContainer -->
     <div class="ui submit button" style="display:none;">submit</div>
     <div class="ui error message"></div>
    </form>
   </div><!--end metadata editor-->
  </div>
  <div class="upload-button">
   <button class="ui button" @click.stop="checkIfPicUploaded">确定上传</button>
  </div>
 </div>
</template>

<script>
function existingTag(array,value){
 if(value.trim().length==0)return
 
  return array.find(item => {return item.value == value.trim()})
}

import ImgUploader from './children/imgUploader'

export default {
  name: 'uploader',

  components: {
   ImgUploader
  },

  data () {
    return {
      submitStatus        : 0, /*0 normal,1 try submit* 2 submit*/
      fieldFocusFactory   : {},
      creatingOption      : false,
      productName         : '',
      price               : '',
      description         : '',
      optionKey           : '',
      optionValue         : '',
      deliveryFee         : '',
      manualTagValue      : '',
      matchedTags         : [],
      editingAddedOptions : [],
      addedOptions        : [],
      optionEditIdentifier: {isEdit:false,reference:-1},
      selectedTags        : [],
      availableTags       : [],
      newTmpTags          : []
    }
  },

  mounted() {
   if(this.$store.state.isTagInitialized == false){
    this.$store.dispatch('FETCH_ALL_TAGS').then(() => {
     this.initTags()
    })}else
     this.initTags()

    $.fn.form.settings.rules.greaterThan = (input) => {
      return input.trim().length>0 && !isNaN(input) && input > 0
    }

    $('.ui.form.upload').form({
      fields: {
        productName  : {
          identifier:'productName',
          rules: [
           {
            type   : 'empty',
            prompt : '请输入产品名称'
           }
          ]
        },
        price  : {
          identifier:'price',
          rules: [
           {
            type   : 'greaterThan',
            prompt : '价格不能为空，且类型必须为一个大于0的数字'
           },
          ]
        },
        livraisonFee  : {
          identifier:'livraisonFee',
          rules: [
           {
            type   : 'greaterThan',
            prompt : '运费不能为空，且类型必须为一个大于0的数字'
           }
          ]
        },
        comment      : {
          identifier:'comment',
          rules: [
           {
            type   : 'empty',
            prompt : '备注不能为空'
           }
          ]          
        }
      },
      on : 'blur'
    });
  },

  methods: {
   initTags() {
    let allTags = this.$store.state.allTags.slice(0)
    allTags.forEach( tag => {
     this.availableTags.push({
                         value      : tag,
                         isSelected : false
                           })
    })

    if(allTags.indexOf('未分类')==-1)
      this.newTmpTags.push('未分类')
    
   },

   setValue(field) {
    this.$set(this.fieldFocusFactory,field,event.type=='focus'?true:false)
   },

   addOption(e) {
    this.creatingOption = true
   },

   addOptionValue() {
    this.optionValue = this.optionValue.replace(/^\s+|\s+$/g,'')
    if(this.optionValue.trim().length==0 || this.editingAddedOptions.indexOf(this.optionValue)>-1)return
    if(/-/g.test(this.optionValue))return //不能有-字符

    this.editingAddedOptions.push(this.optionValue)
    this.optionValue = ''
   },

   removeCurrentOption(index) {
    this.editingAddedOptions.splice(index,1)
   },

   cancelOptionEdition() {
   if(this.optionEditIdentifier && this.optionEditIdentifier.isEdit){
      this.optionEditIdentifier.isEdit = false
      this.optionEditIdentifier.index = -1
      this.addedOptions[this.optionEditIdentifier.reference].editing = false
   }

    this.editingAddedOptions = []
    this.optionKey = this.optionValue = ''
    this.creatingOption = false
   },

   finishOptionEdition() {
    let isEdit = this.optionEditIdentifier && this.optionEditIdentifier.isEdit

    this.optionKey = this.optionKey.replace(/^\s+|\s+$/g,'')

    let isDuplicateKey = this.addedOptions.find((item,i) => 
                          {return isEdit?
                           (item.key==this.optionKey&&i!=this.optionEditIdentifier.reference)
                           :item.key==this.optionKey})

    if(isDuplicateKey) return

    let newOption = {key:'',values:[],editing:false}

    newOption.key = this.optionKey
    newOption.values = []
    this.editingAddedOptions.forEach(item => {newOption.values.push(item)})

    if(isEdit){
     this.addedOptions[this.optionEditIdentifier.reference] = newOption
     this.optionEditIdentifier.isEdit = false
     this.optionEditIdentifier.reference = -1
    }else{
     this.addedOptions.push(newOption)
    }

    this.editingAddedOptions = []
    this.optionKey = this.optionValue = ''
    this.creatingOption = false
   },

   editExistingOption(index) {
    if(this.creatingOption) return
    
    this.optionEditIdentifier.isEdit = true
    this.optionEditIdentifier.reference = index

    this.addedOptions[index].editing = this.creatingOption = true
    this.optionKey = this.addedOptions[index].key
    this.editingAddedOptions = this.addedOptions[index].values.slice()
   },

   removeExistingOption(index) {
    this.addedOptions.splice(index,1)
   },

   showTagModal() {
    $('.ui.modal.tag-selection')
    .modal({blurring: true})
    .modal('show')
   },

   toggleSelection(index) {
    let selectedIndex = this.selectedTags.indexOf(this.availableTags[index])

    if(selectedIndex>-1){
     this.selectedTags.splice(selectedIndex,1)
     this.availableTags[index].isSelected = false
    }else{
     this.selectedTags.push(this.availableTags[index])
     this.availableTags[index].isSelected = true
    }
   },

   searchOrAddTag() {
    let e = event
    if(this.manualTagValue.trim().length==0)
    {
      this.matchedTags = []
      return
    }

    if(e.keyCode == 13){
      return this.addTag('-1')
    }
    else{
     this.matchedTags = this.availableTags.filter(tag => {
      return !tag.isSelected && tag.value.indexOf(this.manualTagValue.trim())>-1
     })
    }
   },

   addTag(index) {
    this.manualTagValue = this.manualTagValue.replace(/^\s+|\s+$/g,'')

    //在系统推荐标签中选择
    if(index != '-1' && typeof existingTag(this.selectedTags,this.matchedTags[index].value) == 'undefined'){
     let indexInAvail = this.availableTags.indexOf(this.matchedTags[index])
     this.availableTags[indexInAvail].isSelected = true
     this.selectedTags.push(this.availableTags[indexInAvail])

     this.manualTagValue = ''
     this.matchedTags = []
    }else{//自己手打新标签
     if(this.manualTagValue.trim().length==0)return

     let isExistInSelectedTags = typeof existingTag(this.selectedTags,this.manualTagValue) != 'undefined'
     if(!isExistInSelectedTags){
      let existingAvailTag = existingTag(this.availableTags,this.manualTagValue)  
      let newTag = typeof existingAvailTag == 'undefined'? {value:this.manualTagValue,isSelected:true}
                                                  : existingAvailTag
      newTag.isSelected = true
      this.selectedTags.push(newTag)
      this.manualTagValue = ''
      this.matchedTags = []
      
      if(typeof existingAvailTag == 'undefined'){
       this.availableTags.push(newTag)
       this.newTmpTags.push(newTag.value)
      }
     }
    } 
   },

   removeSelectedTag(index) {
    this.selectedTags[index].isSelected = false
    this.selectedTags.splice(index,1)
   },
   
   checkIfPicUploaded() {
    this.submitStatus = 1
   },



   uploadPictures(imgCheckRes) {
   //try to submit for validation
     $('.ui.form.upload').submit()
    
    this.submitStatus = ($('.ui.form.upload').form('is valid') && imgCheckRes)?
                        2:0 //if both valid, resume upload, otherwise no
    
   },

   resumeUpload(filePaths) {   
    //默认标签:未分类
    if(this.selectedTags.length==0)
      this.selectedTags.push({value:'未分类',isSelected:true})

    let formData = new FormData()
    
    formData.append('title',this.productName)
    formData.append('price',this.price)
    formData.append('deliveryFee',this.deliveryFee)
    formData.append('description',this.description)
    if(this.addedOptions.length>0){
     formData.append('addedOptions',this.addedOptions.map(option => {
      return option.key+'&'+option.values.join('-')
     }))
    }    
    formData.append('selectedTags',this.selectedTags.map(tag => {return tag.value}))                                  
    formData.append('filePaths',filePaths)

    this.$http.post('/uploadProduct',formData).then((res) => {
     if(res.status == 200){
      this.selectedTags.forEach(selectedTag => {
       this.$store.commit('UPDATE_TAG',{
                                        tagName:selectedTag.value,
                                        isAdd  : true
                                       })
      })
      
      if(this.newTmpTags.length>0) {
         this.$store.dispatch('SAVE_NEW_TAGS',this.newTmpTags).then(()=>{
          this.$router.replace('/')
         })
      }else{
          this.$router.replace('/')
      }    
     }
    })

   }
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 $title-size : 50%;
 $lager-size: 80%;

/*
@media screen and (min-width: 1px) {
  #tag-selection {
    width: 700px;
    margin: 0 0 0 -275px;
  }
}
*/

  .availableTags{
   display: flex;
   justify-content: flex-start;
   flex-wrap: wrap;

   & .text-tag{
    margin:.4em 1em;
    cursor:pointer;
    padding: .2em .8em;
    border-radius:12px;
    font-size:14px;
    color: green;
    border:1px solid darken(#a0c982,20%);
    transition: all .3s linear;

    &.selected{
     transform: rotatex(360deg);
     color:white;
     background:darken(#a0c982,20%);
    }
   }
  }

.uploaderContainer{
 position:relative;

 & .upload-button .ui.button{
  margin-bottom: 40px;
  color:white;
  font-size: 17px;
  font-weight: 500;
  background:#ff7a50;

  &:hover{
   background:#ccc;
   color:black;
  }
 }

 & .uploader{
    position: relative;
    width: 100%;
    margin:40px auto 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* to remove */
   /*border:1px solid black;*/

    & .text-action{
     padding:5px 0;
     font-size:14px;
     font-weight: 500;
     letter-spacing: .1em;
     color: darken(#a0c982,20%);

     &:not(.editing):hover{
      font-weight: 600;
      cursor: pointer;
     }

     &.negative{
      color: lighten(red,20%);
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
     width: 600px;
    /* height: 500px;*/
     /*to remove*/
     /*border:1px solid black;*/
    }

    & .metaDataEditor{
     position:relative;
     width: 650px;
     text-align: left;
     padding-top:40px;
     padding-left:40px;
     padding-right:100px;
     /*to remove*/
     /*border:1px solid black;*/

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
      margin-bottom: 20px;

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

     & .addedOptionContainer{
      margin-bottom:10px;

      & .optionItem{
       margin-right: 2em;
      }
     }

     & .optionContainer, & .tagContainer{
       & .text-nav{
        vertical-align: top;
        font-size: 16px;
       }   
     }

     & .tagContainer{

       & .matchedTag{
        background:#E0E1E2;
        color:rgba(0,0,0,.6);
        padding:.2em .5em;
        margin:.2em;
        border-radius:5px;
        cursor: pointer;
       }   

      & .addTagContainer{
        position:relative;
        display: flex;
        margin-bottom: 10px;

        & > * {
         width: 200px;
         vertical-align: text-bottom;
        }

        & .manualAddTagContainer{
         & .matchedTagWraper{
           position:relative;
           width: 100%;
           border:1px solid rgba(34,36,38,.15);
           border-bottom-left-radius:.28571429rem;
           border-bottom-right-radius:.28571429rem;  
           display: flex;
           flex-wrap: wrap; 
         }
        }

        & .alternativeAddTag{
         vertical-align: bottom;
         padding-top:10px;
         margin-left:20px;

         & .text-action{
          margin-left:20px;
          font-size:16px;
         }
        }

        & .tag-add{
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
      }

      & .addedTagContainer {
       & .addedTags{
        margin-top:10px;
        display: flex;
        flex-wrap: wrap;

        & .selectedTag{
         margin:.5em;
         padding: .5em 1.5em;
         position:relative;
         cursor: pointer;
         font-weight:500;
        }
       }
      }
     }

     & .optionContainer{  
      border-bottom:1px solid lighten(#b3b3b3,10%);
      padding-bottom: 25px;
      margin-bottom: 25px;

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
 }
</style>
