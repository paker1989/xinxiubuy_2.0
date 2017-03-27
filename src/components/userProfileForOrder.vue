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
          <td class="text-content">{{user.userName}}</td>
         </tr>
         <tr>
          <td class="bold">电话</td>
          <td class="text-content">{{user.phoneNumber}}</td>
         </tr>
         <tr>
          <td class="bold">邮寄地址</td>
          <td class="text-content">{{user.address}}</td>
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
                 :modelValue="newAddress" v-on:modelEmited="setNewAddress"
                 :class="{'invalid':errorMessage['newAddress']}"/>
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
 
  props: ['delegateUser'],

  data () {
    return {
      edit           :  this.delegateUser? false:true,
      user           :  {
                          userId      : this.delegateUser? this.delegateUser.userId : '',
                          userName    : this.delegateUser? this.delegateUser.userName : '',
                          phoneNumber : this.delegateUser? this.delegateUser.phoneNumber : '',
                          address     : this.delegateUser? this.delegateUser.address : '',
                          comment     : this.delegateUser? this.delegateUser.comment : ''
                        },
      newUsername    : '',
      newPhoneNumber : '',
      newAddress     : '',
      newComment     : '',
      errorMessage   : {}
    }
  },

  components: {
    CustInput
  },

  created() {
   this.newUsername    = this.user.userName,
   this.newPhoneNumber = this.user.phoneNumber,
   this.newAddress     = this.user.address,
   this.newComment     = this.user.comment
  },

  methods: {
   saveOrder() {
     //valid fields first
     let errCount = 0
     this.errorMessage = {}

     if(isFieldEmpty(this.newUsername)){
       this.$set(this.errorMessage,'newUsername','姓名不能为空哦'),errCount++}
     if(isFieldEmpty(this.newPhoneNumber)){
       this.$set(this.errorMessage,'newPhoneNumber','电话号码不能为空哦'),errCount++}
     else{
      if(isNaN(new Number(this.newPhoneNumber)))
       {this.$set(this.errorMessage,'newPhoneNumber','电话号码必须是数字哦'),errCount++}
     }
     if(isFieldEmpty(this.newAddress)){
       this.$set(this.errorMessage,'newAddress','邮寄地址不能为空哦'),errCount++}

     if(errCount> 0) return       

     //resume save if fields are valid
     let user = {
                userId      : this.user.userId,
                userName    : this.newUsername,
                phoneNumber : this.newPhoneNumber,
                address     : this.newAddress,
                comment     : this.newComment
     }

     this.$store.dispatch('SAVE_USER',user).then((data) => {
      this.user = data
      this.edit = false
      this.$emit('userUpdatedOrCreated',data)
     })
  },

  setNewUserName(newVal) {
    this.newUsername = newVal.replace(/^\s+|\s+$/g,'')
  },

  setNewPhoneNumber(newVal) {
    this.newPhoneNumber = newVal.replace(/^\s+|\s+$/g,'')
  },

  setNewAddress(newVal) {
    this.newAddress = newVal.replace(/^\s+|\s+$/g,'')
  },

  setNewComment(newVal) {
    this.newComment = newVal.replace(/^\s+|\s+$/g,'')
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