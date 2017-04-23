<template>
  <div class="contactInfo">
   <div class="userProfile-title">
    <h1 class="text-nav bold">用户资料</h1>
   </div><!--end userProfile title-->
   <transition name="switch" mode="out-in">
     <div class="userProfile-details" v-if="edit==false">
       <table class="userProfile-details-table">
        <tbody >
         <tr>
          <td class="bold">姓名</td>
          <td class="text-content">{{user.username}}</td>
         </tr>
         <tr>
          <td class="bold">电话</td>
          <td class="text-content">{{user.phoneNumber}}</td>
         </tr>
        </tbody>
       </table>
     </div><!--end userProfile-details-->
   </transition>
   <transition name="switch" mode="out-in">
     <div class="edit-userProfile" v-if="edit">
      <custInput :placeholder="'姓名'" :modelValue="newUsername"  v-on:modelEmited="setNewUserName"
                 :class="{'invalid':errorMessage['newUsername']}" />
      <custInput :placeholder="'电话'" :modelValue="newPhoneNumber" v-on:modelEmited="setNewPhoneNumber"
                 :class="{'invalid':errorMessage['newPhoneNumber']}"/>
     </div><!--end editing userProfile-->
   </transition>
   <div class="errorMessageWraper" v-show="edit">
     <ul>
       <li v-for="key in Object.keys(errorMessage)">{{errorMessage[key]}}</li>
     </ul>
   </div><!--errorMessageWraper-->
  </div>
</template>

<script>
import CustInput from 'components/custTag/custInput'
	
export default {
  name: 'userProfile',
  
  components: {
   CustInput
  },

  data() {
   return {
   	 edit          : false,
   	 user          : JSON.parse(sessionStorage.getItem('authenticatedUser') || {}),
   	 errorMessage  : {},
   	 newUsername   : '',
   	 newPhoneNumber: ''
   }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .contactInfo{
   position: relative;
   width: 100%;
   min-height: 60vh;
   border-right:2px solid #F6F7FA;

   & .userProfile-title{
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    padding-left:20px;
   }

   & .userProfile-details, & .edit-userProfile, & .errorMessageWraper{
     width: 30%;
     padding: 0 40px;    
   }

   & .errorMessageWraper{
    text-align: left;
    color:darken(#E0B4B4,20%);

    & li{
      margin-left:10%;
      margin-bottom: .5em;
    }
   }

   & .edit-userProfile{
    & .invalid{
      border:2px solid #E0B4B4;
    }
   }

   & .userProfile-details{
    position:relative;

    & .userProfile-details-table{
     position:relative;
     width: 100%;
     margin-bottom: 20px;

     & tr td{
      height: 50px;
      border-bottom:2px solid #F6F7FA;
      line-height: 1.4em;
     }

     &  tr td:first-child{
      width:20%;
      text-align: left;
     }

     & tr td:last-child{
      padding:20px 30px;
     }
    }
   }/* end userProfile-details*/

   & .switch-enter{
    opacity: 0;
    transform: translateX(-20px);
   }

   & .switch-enter-active{
    transition: all .3s linear;
   } 	
 }
</style>
