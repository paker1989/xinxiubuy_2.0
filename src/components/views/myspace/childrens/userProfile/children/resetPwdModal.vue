<template>
 <transition name="fade">
  <div class="resetPwdModal">
    <div class="modal-wraper">
      <div class="modal-container">
         <div class="inputWraper">
          <custInput :placeholder="'旧密码'" :type="'password'" class="input"/>
          <custInput :placeholder="'新密码'" :type="'password'" class="input"/>
          <custInput :placeholder="'确认新密码'" :type="'password'" class="input"/> 
          <div class="actionWraper">
            <input type="button" class="ui button" value="确认" @click="confirmReset"/>
            <input type="button" class="ui button" value="取消" @click="cancelReset"/>
          </div>        
         </div>
       </div><!--end modal container-->
    </div>
   </div>
  </transition>
</template>

<script>
import CustInput from 'components/custTag/custInput'
export default {
  name: 'resetPwdModal',

  data() {
   return {
   }
  },

  methods: {
   cancelReset() {
    this.$emit('cancelReset')
   },

   confirmReset() {
    this.$emit('confirmReset')
   }
  },

  components: {
    CustInput
  }

}
</script>

<style lang="scss" scoped>
 .resetPwdModal{
   position:fixed;
   left:0;
   top:0;
   width: 100%;
   height: 100%;
   background-color:rgba(0, 0, 0, .5);
   z-index: 9998;
   display: table;

  & .modal-wraper{
    display: table-cell;
    vertical-align: middle;

    & .modal-container{
      position:relative;
      max-width: 400px;
      margin: 0 auto;
      padding:20px 30px;
      background-color: #fff;
      box-shadow:0 2px 8px rgba(0, 0, 0, .33);
      transition: all .4s ease;
      border-radius:3px;

      & .inputWraper{
        width: 300px;
        margin:0 auto;

        & .actionWraper{
          display: flex;
          width: 100%;
          justify-content: center;

          & > * {
            margin-left:10px;
          }
        }
      }
    }
  }
 }

    /*transition effect*/
   .fade-enter{
    opacity: 0;
   }

   .fade-leave-active{
    opacity: 0;
   }

   .fade-enter .modal-container,
   .fade-leave-active .modal-container{
    transform: scale(1.1);
   }
</style>
