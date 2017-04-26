<template>
  <div class="userProfile">
   <div class="contactInfoWraper">
    <contactInfo/>
    <span type="button" class="resetPwd" @click="isDisplayReset=true">重置密码</span>  
   </div><!--end contactInfoWraper-->
   <div class="ui divider custDivider"></div>
   <div class="tagWraper">
     <userTags/>
   </div>
    <resetPwdModal v-if="isDisplayReset"
      v-on:cancelReset  ="isDisplayReset=false"
      v-on:confirmReset ="confirmReset"/>
  </div>
</template>

<script>
import ContactInfo from './children/contactInfo'
import UserTags from './children/userTags'
import ResetPwdModal from './children/ResetPwdModal'

export default {
  name: 'userProfile',
  
  components: {
   ContactInfo,ResetPwdModal,UserTags
  },

  data() {
   return {
    isDisplayReset : false
   }
  },

  methods: {
    confirmReset() {
     this.isDisplayReset = false
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .userProfile{
   position: relative;
   width: 100%;
   min-height: 60vh;

   & .custDivider{
    width: 50vw;
    margin-left: 1vw;
   }

   & .contactInfoWraper{
    position: relative;
    width: 30%;
    /*border:1px solid black;*/
    display: flex;
    flex-wrap:wrap;
    justify-content: center;

    & .resetPwd{
      text-align:center;
      background-color:#ff5722;
      padding: 7px 25px;
      color:white;
      font-weight:500;
      letter-spacing: 1px;
      border-radius:3px;
      font-size:12px;
      color:white;
      text-transform: uppercase; 

      &:hover{
        opacity: .7;
        cursor: pointer;
      }   
     }/*reset pwd*/
   }/*end contactInfoWraper*/
 }
</style>
