<template>
  <div class="bar">
    <div class="selectedCats">
     <h3 class="title text-title">已选择标签</h3>
     <div class="catList">
       <ul>
        <li v-for="(tag,index) in currentTags">
          <input type="checkbox" class="hide-check" :id="tag.tagName" :value="tag.tagName" v-model="checkedTags">
          <label class="text-content" :for="tag.tagName" @click="toggleSelection(index)">{{tag.tagName}}</label>
        </li> 
       </ul>
     </div>
    </div>
    <div class="availableCats">
     <div class="title"><h3 class="text-title">可选择</h3></div>
     <div class="availableCatWraper">
       <span class="text-tag">婴儿玩具</span>
       <span class="text-tag">酒类</span>
       <span class="text-tag">奶嘴</span>
       <span class="text-tag">餐具</span>
       <span class="text-tag" @click="selectTmpTag('奶粉')">奶粉</span>
       <span class="text-tag">卫生巾</span>
       <span class="text-tag">杂志</span>
       <span class="text-tag">夫妻用品</span>
       <span class="text-tag">口红类</span>
       <span class="text-tag">保健品</span>
       <span class="text-tag">奢侈品</span>
       <span class="text-tag">轻奢品</span>
       <span class="text-tag">零食</span>
       <span class="text-tag">小样</span>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filterBar',

  props: ['usersCats'],

  data () {
    return {
     currentTags:[],
     checkedTags:[]
    }
  },

  created() {
   this.usersCats.forEach( userAttachedCats => {
    this.currentTags.push({
     tagName      : userAttachedCats,
     isUserLinked : true
    })
    this.checkedTags.push(userAttachedCats)
   })
  },

  methods: {
   toggleSelection(index) {
    let tagName = this.currentTags[index].tagName
    //if not isUserlinked, it can only be remove
    if(this.currentTags[index].isUserlinked == false){
     this.currentTags.splice(index,1)
     this.$emit('updateCategory',tagName,false) 
    }else{
    //else, check action type
      let isChecked = this.checkedTags.indexOf(tagName)>-1
      this.$emit('updateCategory',tagName,!isChecked)   
    }
   },

   selectTmpTag(newTag) {
    if(this.currentTags.find((item) => {return item.tagName == newTag}) == undefined){
      this.currentTags.push({tagName      : newTag, 
                            isUserlinked : false}
                          )
      this.checkedTags.push(newTag)
      this.$emit('updateCategory',newTag,true)     
    }

   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .bar{
  position:relative;
  width: 100%;
  height: 100%;
  border-right: 1px solid #eee;
  text-align: left;
  padding-top:20%;

  & ul{
   list-style: none;  
   max-height:50vh;
   overflow: hidden;

   & > li{
    margin-bottom:14%; 
   }
  }

  & .selectedCats{
   position:relative;
   width: 100%;
   padding-left:30%;

    & .text-content{
      color:darken(#cccccc,80%);
      font-weight: 400;
      cursor:pointer;
    }

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
        border-radius: 4px;
        box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
       }

      &:after{
        content: '✔';
        position: absolute;
        top: .1em; left: .1em;
        font-size: 1em;
        line-height: 0.8;
        color: white;
        transition: all .2s;
       }    

       &:hover{
        color:#ff5722;
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

  }/*end selectedCats*/

  & .availableCats{
   margin-top: 20%;
   width: 100%;
   position:relative;

   & .title{
    width: 100%;
    padding-left:30%;
    margin-bottom: 10%;
   }


   & .availableCatWraper{
     width: 100%;
     padding: 0 15%;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between; 

     & span.text-tag{
      margin:10%;
      color:darken(#cccccc,60%);
      font-weight: 600;
      cursor:pointer;

      &:hover{
       color:#ff5722;
       border-bottom:1px dashed #ff5722;
      }
     }   
   }
  }

  & .catList{
    margin-top:40px;
    }
 }
</style>
