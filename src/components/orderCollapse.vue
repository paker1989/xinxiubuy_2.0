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
  <!--
        <tr>
          <td colspan="6">
            <custInput :placeholder="'new product'">
          </td>
        </tr>
    -->
        <tr>
          <td colspan="5"></td>
          <td class="addNew">
            <icon name="plus" class="text-icon" scale="1"/>
            <span class="clickable">添加</span>
          </td>
        </tr>
        <tr>
         <td colspan="4" class="text-nav">运费</td>
         <td class="text-content" colspan="3">10</td>

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
         <span class="bold comment-label">备注:</span>
         <span class="text-content">上次忘寄的化妆棉寄过去</span>
       </div>
       <div class="actionWraper">
	    <span class="text-nav clickable edit" v-if="!isEdit">编辑</span>
	    <span class="text-nav clickable edit" v-if="isEdit">保存</span>
	    <span class="text-nav clickable cancel" v-if="isEdit">取消</span>        
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
      isCollapse:this.collapse
    }
  },

  components: {
    CustInput
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

  	  &:nth-child(1){width:30%;}
  	  &:nth-child(2){width:20%;}
  	  &:nth-child(3){width:14%;}
  	  &:nth-child(4){width:13%;}  
  	  &:nth-child(5){width:13%;}
      &:nth-child(6){width:10%; text-align:center;}      
  	 }

     & thead{
      & tr td{
       height: 45px;
      }

      & tr:last-child td{
       border-bottom: 2px solid lighten(black,70%);
      }
     }/*end thead*/

     & tbody{
      & tr:nth-child(even){
        background:#F6F7FA;
      }

	  & tr td{
	    height: 45px;
	    border-top:2px solid #F6F7FA;
	  }

	  & tr:last-child td{
	    border-top:2px solid lighten(black,60%); 
	  }
     }/*end tbody*/
    }/*end table*/

    & .commentActionContainer{
     position:relative;
     display: flex;
     justify-content: space-between;
     align-items:center;
     padding:20px 40px;

       & .commentWraper{
        display: flex;
        flex-direction: column;
        text-align: left;
        width: 50%;

        & .comment-label{
         margin-bottom: 10px;
        }
       }

	   & .actionWraper{
	    display: flex;
	    padding-top:40px;
	    padding-right:40px;
	    justify-content: flex-end;
	    align-items:center;
	   }/*end action*/
    }
  }/* end orderDetailContainer*/

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
 }
</style>
