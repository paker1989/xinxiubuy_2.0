<template>
  <div class="comment">
    <div class="meta">
      <div class="user-info">
       <img :src="comment.commentUser.userPhoto" v-if="comment.commentUser.userPhoto" class="userPhoto">
       <icon v-else name="user" class="user-icon"/>
       {{comment.commentUser.pseudo}}
       <span v-show="comment.type==2"><label class="action-color">回复 </label>{{comment.replyTo}}</span>
      </div>
      <label class="date-right">{{comment.commentTimeStr}}</label>
    </div>
    <div class="content">{{comment.content}}</div>
    <div class="action action-color">
     <span><icon name="thumbs-up" class="user-icon" />{{comment.nbLike?comment.nbLike:'赞'}}</span>
     <span class="reply"><icon name="comment" class="user-icon" @click="replyTo"/>回复</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
 
  props: ['comment'],

  data () {
    return {
      
    }
  },

  created() {
    if(this.comment.type == 2){
      /*to do*/
      this.comment.replyTo = this.$store.getters.fetchReply(this.comment.referId)
    }
  },

  methods: {
   replyTo: () => {
    
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .comment{
  position: relative;
  width: 100%;
  border-bottom: 1px solid #eee;
  padding:15px 0;
  margin:0 auto;

  & .user-icon{
    vertical-align: text-bottom;
    margin-right:.3em;
    color:#9fadc7;
  }

  & .action-color{
    color:#9fadc7;
  }

  & .meta{
   font-family: '微软雅黑'!important;
   font-size: 15px;
   width: 100%;
   margin-bottom: 20px;
   height:15px;
   display: flex;
   justify-content: space-between;

   & .user-info{
    & .userPhoto{
      vertical-align: text-bottom;
      margin-right:.3em;   
    }
   }

   .date-right{
    color:lighten(black,40%);
   }
  }/*meta*/

  & .content{
   color:lighten(black,10%);
   text-align: left;
   word-wrap: break-word;
   letter-spacing: .03em;
   margin-bottom: 15px;
  }/*content*/

  & .action{
   display: flex;
   justify-content: flex-start;

   & > * {
    margin-right: 1em;
    cursor: pointer;
   }

   & .reply{
    opacity: 0;
    transition: opacity .2s linear;
   }

   &:hover .reply{
     opacity: 1;
   }
  }
 }
</style>
