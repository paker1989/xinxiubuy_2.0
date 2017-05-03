<template>
 <div class="userTags">
    <span class="text-nav bold left">你喜爱的标签</span>
    <div class="tagContainer">
      <span class="text-tag" v-for="tag in demoTags">{{tag}}</span>
    </div>
 </div>
</template>

<script>
export default {
  name: 'userTags',

  data() {
   return {
     user : JSON.parse(sessionStorage.getItem('authenticatedUser') || {}),
     demoTags: ['店长推荐','化妆品','母婴用品','大粪','DIOR']
   }
  },

  created() {
  // console.log(this.user)
  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
.userTags{
  position: relative;
  /*border:1px solid black;*/
  max-width: 600px;
  text-align: left;
  padding-left:40px;

  & .text-tag{
    margin:.4em 1em;
    cursor:pointer;
    padding: .2em .8em;
    border-radius:12px;
    font-size:14px;
    color: green;
    border:1px solid darken(#a0c982,20%);
    transition: all .3s linear;

   & .selected{
     transform: rotatex(360deg);
     color:white;
     background:darken(#a0c982,20%);
   }
 }/*text-tag*/

 & .tagContainer{ 
  position:relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top:10px;
 }
}
</style>
