<template>
  <div class="userProfileForOrder">
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
         <tr>
          <td class="bold">邮寄地址</td>
          <td class="text-content">{{user.coordonnee}}</td>
         </tr>
         <tr>
          <td class="bold">备注</td>
          <td class="text-content">{{user.comment}}</td>
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
      <custInput :placeholder="'邮寄地址'" :type="'textarea'" class="addressArea"
                 :modelValue="newCoordonnee" v-on:modelEmited="setNewCoordonnee"
                 :class="{'invalid':errorMessage['newCoordonnee']}"/>
      <custInput :placeholder="'备注'" :type="'textarea'" class="commentArea"
                 :modelValue="newComment" v-on:modelEmited="setNewComment"
                 :class="{'invalid':errorMessage['newComment']}"/>
     </div><!--end editing userProfile-->
   </transition>
   <div class="errorMessageWraper" v-show="edit">
     <ul>
       <li v-for="key in Object.keys(errorMessage)">{{errorMessage[key]}}</li>
     </ul>
   </div><!--errorMessageWraper-->
   <div class="action">
    <span class="text-nav clickable edit" v-show="edit==false" @click="edit=true">编辑</span>
    <span class="text-nav clickable edit" v-show="edit" @click="saveOrder">保存</span>
    <span class="text-nav clickable cancel" v-show="edit" @click="edit=false">取消</span>
   </div><!--end action-->
  </div>
</template>

<script>
import CustInput from 'components/rawHtmlComponent/custInput'

function isFieldEmpty(field){
 return !field || field.replace(/^\s+|\s+$/g,'').trim().length == 0
}

export default {
  name: 'userProfileForOrder',
 
  props: ['currentUser'],

  data () {
    return {
      edit           :  this.currentUser? false:true,
      user           :  {
                          userId      : this.currentUser? this.currentUser.userId : '',
                          username    : this.currentUser? this.currentUser.userName : '',
                          phoneNumber : this.currentUser? this.currentUser.phoneNumber : '',
                          coordonnee  : this.currentUser? this.currentUser.coordonnee : '',
                          comment     : this.currentUser? this.currentUser.comment : ''
                        },
      newUsername    : '',
      newPhoneNumber : '',
      newCoordonnee  : '',
      newComment     : '',
      errorMessage   : {}
    }
  },

  components: {
    CustInput
  },

  methods: {
   saveOrder() {
     //valid fields first
     this.errorMessage = {}
     if(isFieldEmpty(this.newUsername)){
       this.$set(this.errorMessage,'newUsername','姓名不能为空哦')}
     if(isFieldEmpty(this.newPhoneNumber)){
       this.$set(this.errorMessage,'newPhoneNumber','电话号码不能为空哦')}
     else{
      if(isNaN(new Number(this.newPhoneNumber)))
       {this.$set(this.errorMessage,'newPhoneNumber','电话号码必须是数字哦')}
     }
     if(isFieldEmpty(this.newCoordonnee)){
       this.$set(this.errorMessage,'newCoordonnee','邮寄地址不能为空哦')}

     if(this.errorMessage.length > 0) return 
  },

  setNewUserName(newVal) {
    this.newUsername = newVal
  },

  setNewPhoneNumber(newVal) {
    this.newPhoneNumber = newVal
  },

  setNewCoordonnee(newVal) {
    this.newCoordonnee = newVal
  },

  setNewComment(newVal) {
    this.newComment = newVal
  }

  }

}
</script>

<style lang="scss" scoped>
 .userProfileForOrder{
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
     width: 100%;
     padding: 0 20px;    
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
    & .addressArea{
   //  min-height: 120px;
    }

    & .commentArea{
  //   min-height: 90px;
    }

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

     & tr:last-child td{
      border-bottom:none;
     }
    }
   }/* end userProfile-details*/

   & .action{
    width: 100%;
    display: flex;
    padding-top:40px;
    padding-right:40px;
    justify-content: flex-end;
    align-items:center;

    & .clickable:hover{
      cursor: pointer;
    }

    & .edit, & .cancel{
      margin-left:20px;
    }

    & .edit{
     color:#6ba045;
    }

    & .cancel{
     color:lighten(red,10%);
    }
   }/*end action*/

   & .switch-enter{
    opacity: 0;
    transform: translateX(-20px);
   }

   & .switch-enter-active{
    transition: all .3s linear;
   }
 }
 
</style>
<!--

:modelValue="'辽宁省葫芦市龙湾区玉皇街道新区  凌云书苑小区物业办公室 石正 收'"

-->