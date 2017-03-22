<template>
  <div class="orderCollapse">
    <div :class="{'metaDataContainer':true,'expanded':!isCollapse}"  @click="isCollapse=!isCollapse">
      <icon name="plus" class="text-icon" v-if="isCollapse"/>
      <icon name="minus" class="text-icon" v-if="isCollapse==false"/>
      <span>
        <label class="key bold">订单号:</label>
        <label class="value text-content">u2d2s5s2z5s201121442552</label>
      </span>
      <span>
        <label class="key bold">订单日期:</label>
        <label class="value text-content">2017年2月2号</label>
      </span>
      <span>
        <label class="key bold">产品数量:</label>
        <label class="value text-content">4</label>
      </span>
      <span>
        <label class="key bold">付款方式:</label>
        <label class="value text-content">微信支付</label>
      </span>
    </div><!--end metaDataContainer-->
    <transition name="fade">
     <div class="orderDetailContainer" v-if="isCollapse==false">
      <table class="orderDetails-table">
       <thead>
        <tr>
         <td class="text-nav">产品名</td>
         <td class="text-nav">图片</td>
         <td class="text-nav">数量</td>
         <td class="text-nav">单价</td>
         <td class="text-nav">总价</td>
         <td class="text-nav">操作</td>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td class="text-content">兰蔻粉水</td>
         <td class="text-content">无</td>
         <td class="text-content">2</td>
         <td class="text-content">100</td>
         <td class="text-content">200</td>
         <td class="clickable edit">编辑</td>
        </tr>
        <tr>
         <td class="text-content">雀巢蜂蜜燕麦</td>
         <td class="text-content">无</td>
         <td class="text-content">1</td>
         <td class="text-content">40</td>
         <td class="text-content">40</td>
         <td class="clickable edit">编辑</td>
        </tr>
        <tr>
         <td class="text-content">唇膏(赠送)</td>
         <td class="text-content">无</td>
         <td class="text-content">1</td>
         <td class="text-content">0</td>
         <td class="text-content">0</td>
         <td class="clickable edit">编辑</td>
        </tr>
        <tr v-if="addingProduct" class="newItemWraper">
          <td colspan="2">
            <custInput class="newItem" :placeholder="'产品名'">
          </td>
          <td>
           <select class="comp-dropdown">
            <option class="text-nav" v-for="i in 9">{{i}}</option>
           </select>
          </td>
          <td>
           <custInput class="newItem" :placeholder="'单价'">
          </td>
          <td>
          </td>
          <td >
            <span class="clickable edit" @click="saveNew">保存</span>
            <span class="clickable cancel" @click="cancelNew">取消</span>
          </td>
        </tr>
        <tr v-if="!addingProduct">
          <td colspan="5"></td>
          <td class="addNew" @click="addNew">
            <!--<icon name="plus" class="text-icon" scale="1.3"/>-->
            <button class="plus"></button>
          </td>
        </tr>
        <tr>
         <td colspan="4" class="text-nav">运费</td>
         <td class="text-content" colspan="3" style="text-align:left;">10</td>

        </tr>
        <tr>
         <td colspan="2" class="text-nav">总额</td>
         <td class="text-content" colspan="2">4</td>
         <td class="text-content" colspan="2">250</td>
        </tr>
       </tbody>
      </table>
      <div class="commentActionContainer">
       <div class="commentWraper">
         <span v-if="!isEditOrder" class="bold comment-label">备注:</span>
         <span v-if="!isEditOrder" class="text-content">上次忘寄的化妆棉寄过去</span>
         <custInput v-if="isEditOrder" :type="'textarea'" class="commentInput" :placeholder="'备注'">
       </div>
       <div class="payWraper">
        <span class="edit" v-if="!isEditOrder">付款方式:</span>
        <span class="text-content" v-if="!isEditOrder">微信支付</span>
        <span v-if="isEditOrder"><custInput class="payInput" :placeholder="'付款方式/状态'"></span>
       </div>
       <div class="actionWraper">
        <span class="text-nav clickable edit" @click="editOrder" v-if="!isEditOrder">编辑</span>
	    <span class="text-nav clickable edit" @click="saveEditOrder" v-if="isEditOrder">保存</span>
	    <span class="text-nav clickable cancel" @click="cancelEditOrder" v-if="isEditOrder">取消</span> 
	    <span class="text-nav clickable cancel" v-if="!isEdit">结束订单</span>       
       </div>
      </div>
     </div><!--orderDetailContainer-->
    </transition>
  </div>
</template>

<script>
import CustInput from 'components/rawHtmlComponent/custInput'

export default {
  name: 'orderCollapse',
 
  props: ['collapse'],

  data () {
    return {
      isEdit:false,
      isCollapse:this.collapse,
      addingProduct:false,
      isEditOrder: false
    }
  },

  components: {
    CustInput
  },

  methods: {
   addNew() {
    this.addingProduct = true
   },

   saveNew() {
    this.addingProduct = false
   },

   cancelNew() {
    this.addingProduct = false
   },

   editOrder() {
    this.isEditOrder = true
   },

   cancelEditOrder() {
    this.isEditOrder = false
   },

   saveEditOrder() {
    this.isEditOrder = false
   }
  }

}
</script>

<style lang="scss" scoped>
 .orderCollapse{
  position:relative;
  width: 100%;
  margin-bottom: 5px;

  & .metaDataContainer{
   position: relative;
   display: flex;
   flex-wrap:wrap;
   align-items: center;
   justify-content: space-around;
   width: 100%;
   padding-top:10px;
   padding-bottom:10px;
   border-radius: 5px 5px 0px 0px;
   background: #F6F7FA;
   transition:all .4s ease-out;
  
   & .text-icon{
    color:#6ba045;
   }

   &.expanded,&:hover{
    background: lighten(#6ba045,20%);
    cursor: pointer;

    & .text-icon{
     color:white;
    }

    & .key, & .value{
     color:white;
    }
   }
  }/* end metaDataContainer*/
  
  & .orderDetailContainer{
   position:relative;
   width: 100%;
   border:1px solid #eee;
   border-top:none;
   margin:0 auto 10px auto;

    & .orderDetails-table{
     width: 100%;

     & .addNew{
     /* text-align: right;*/
      color:#6ba045;
     }

  	 & tr td{
  	  line-height: 1.4em;
  	  text-align: left;
  	  padding: 0 10px;

  	  &:nth-child(1){width:35%;}
  	  &:nth-child(2){width:10%;}
  	  &:nth-child(3){width:10%;}
  	  &:nth-child(4){width:15%;}  
  	  &:nth-child(5){width:15%;}
      &:nth-child(6){width:15%;}      
  	 }

     & thead{
      & tr td{
       height: 45px;
       padding-left:10px;
       border-bottom: 2px solid lighten(black,70%);

       &:last-child{
        text-align: center;
       }
      }

     }/*end thead*/

     & tbody{
      & tr:nth-child(even){
        background:#F6F7FA;
      }

	  & tr td{
	    height: 45px;
	    padding-left:20px;
	    border-top:2px solid #F6F7FA;

  	   &:nth-child(6){text-align:center;}
	  }

	  & tr:last-child td{
	    border-top:2px solid lighten(black,60%); 
	  }

	  & tr.newItemWraper{
       
       & td{
         background:white;
         height: 55px;      
       }

       & td:not(:last-child){
        vertical-align: bottom;
        padding-bottom:5px;
       }

       & .newItem{
        margin-bottom: 0;
       }

       & .dropdown .text-nav{
           color:lighten(black,40%);
           font-size: 14px;
           font-weight: 400;
       }
	  }
     }/*end tbody*/
    }/*end table*/

    & .commentActionContainer{
     position:relative;
     display: flex;
     justify-content: space-between;
     align-items:flex-end;
     padding:20px 40px;

       & .commentWraper{
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 35%;

        & .commentInput{
         margin-bottom: 0;
        }

        & .comment-label{
         margin-bottom: 10px;
        }
       }

       & .payWraper{
        display: flex;
        width:25%;
        justify-content: center;
        align-items:flex-end;
        flex-wrap: wrap;

        & > * {
         margin: 0 .5em;
        }

        & .payInput{
         width:130px;
         margin-bottom: 0px;
        }
       }

	   & .actionWraper{
	    width: 40%;
	    display: flex;
	    justify-content: flex-end;
	    align-items:center;

	    & > * {
	     margin:0 1em;
	    }
	   }/*end action*/
    }
  }/* end orderDetailContainer*/

  & .clickable:hover{
	cursor: pointer;
  }

  & .edit{
    color:#6ba045;
  }

  & .cancel{
	color:lighten(red,10%);
  }

  & .fade-enter{
   transform: translatey(-20px);
   opacity: 0;
  }

  & .fade-enter-active{
   transition: all .4s linear;
  }

  & .expand{
   animation: expand 1s infinite;
  }

  @keyframes expand{
   0%  {transform: scaley(0)}
   50% {transform: scaley(1.2)}
   100 {transform: scaley(1)}
  }

  & .plus{
    left:50%;
    transform: translatex(-50%);
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 1px solid #6ba045;
    outline: none;
    border-radius: 50%;
    background: transparent; 

    &:before{
	    content: "";
	    display: block;
	    position: absolute;
	    top: 50%;
	    width: 60%;
	    left: 20%;
	    height: 2px;
	    margin-top: -1px;
	    background: #6ba045;
    }

    &:after{
	    content: "";
	    display: block;
	    position: absolute;
	    top: 50%;
	    width: 60%;
	    left: 20%;
	    height: 2px;
	    margin-top: -1px;
	    background: #6ba045;
	    transform: rotate(90deg);
    }
  }
 }
</style>
