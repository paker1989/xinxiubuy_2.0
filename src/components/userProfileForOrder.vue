<template>
  <div class="userProfileForOrder">
   <div class="userProfile-title">
    <h1 class="text-nav bold">用户资料</h1>
   </div><!--end userProfile title-->
   <div class="userProfile-details" v-if="edit==false">
    <tbody class="userProfile-details-table">
     <tr>
      <td class="bold">姓名</td>
      <td class="text-content">喵喵</td>
     </tr>
     <tr>
      <td class="bold">电话</td>
      <td class="text-content">138170211157</td>
     </tr>
     <tr>
      <td class="bold">邮寄地址</td>
      <td class="text-content">辽宁省葫芦市龙湾区玉皇街道新区  凌云书苑小区物业办公室 石正 收</td>
     </tr>
     <tr>
      <td class="bold">备注</td>
      <td class="text-content">这个人比较难搞</td>
     </tr>
    </tbody>
   </div><!--end userProfile-details-->
   <div class="edit-userProfile">
    
   </div><!--end editing userProfile-->
   <div class="action">
    <span class="text-nav clickable edit" v-show="edit==false" @click="edit=true">编辑</span>
    <span class="text-nav clickable edit" v-show="edit" @click="edit=false">保存</span>
    <span class="text-nav clickable cancel" v-show="edit" @click="edit=false">取消</span>
   </div><!--end action-->
  </div>
</template>

<script>
export default {
  name: 'userProfileForOrder',
 
  props: [],

  data () {
    return {
      edit    :  false
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

   & .userProfile-details{
    width: 100%;

    & .userProfile-details-table{
     width: 100%;
     margin-bottom: 20px;

     & tr td{
      height: 45px;
      border-bottom:2px solid #F6F7FA;
      line-height: 1.4em;
     }

     &  tr td:first-child{
      width:60px;
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
      font-weight: 600;
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
 }
 
</style>
