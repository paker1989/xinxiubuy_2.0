<template>
  <div class="bar">
    <div class="selectedCats">
     <h3 class="title text-title">已选择标签</h3>
     <div class="catList">
       <transition-group name="selectedTags" tag="ul">
        <li v-for="(tag,index) in currentTags" :key="tag">
          <input type="checkbox" class="hide-check" :id="tag.tagName" :value="tag.tagName" v-model="checkedTags">
          <label class="text-content" :for="tag.tagName" @click="toggleSelection(index)">{{tag.tagName}}</label>
        </li> 
       </transition-group>    
     </div>
    </div>
    <div class="availableCats">
     <div class="title"><h3 class="text-title">可选择</h3></div>
      <transition-group name="availableCats" tag="div" class="availableCatWraper">
       <span class="text-tag" v-for="tag in allTags" :key="tag" @click="selectTmpTag(tag)">
        {{tag}}
       </span>
      </transition-group>
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
     checkedTags:[],
     allTags    :[]
    }
  },

  mounted() {
   if(this.$store.state.isTagInitialized == false){
    this.$store.dispatch('FETCH_ALL_TAGS').then(() => {
     this.init()
    })
   }else
     this.init()

  },

  methods: {
   init() {
     this.allTags = this.$store.state.allTags.slice(0)

     this.usersCats.forEach( userAttachedCats => {
      this.currentTags.push({
       tagName      : userAttachedCats,
       isUserLinked : true
      })
      this.checkedTags.push(userAttachedCats)

      if(this.allTags.indexOf(userAttachedCats)>-1)
        this.allTags.splice(this.allTags.indexOf(userAttachedCats),1)
     })    
   },

   toggleSelection(index) {
    let tagName = this.currentTags[index].tagName
    //if not isUserlinked, it can only be remove
    if(this.currentTags[index].isUserlinked == false){
     this.currentTags.splice(index,1)
     this.allTags.unshift(tagName)
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
                            isUserlinked  : false
                           })
      this.checkedTags.push(newTag)
      this.allTags.splice(this.allTags.indexOf(newTag),1)
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

   & .selectedTags-enter-active{
   transition: all .6s linear;
   }
 
   & .selectedTags-enter{
   opacity: 0;
   transform:translateY(50px);
   }

   & .selectedTags-move{
    transition: transform .6s;
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
   }/*availableCatWraper*/

   & .availableCats-enter-active{
   transition: all .6s linear;
   }
 
   & .availableCats-enter{
   opacity: 0;
   transform:translateY(-50px);
   }

   & .availableCats-move{
    transition: transform .6s;
   }
  }

  & .catList{
    margin-top:40px;
    }
 }
</style>
