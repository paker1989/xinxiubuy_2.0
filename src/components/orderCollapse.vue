<template>
  <div class="orderCollapse">
    <div class="metaDataContainer expanded" v-if="isNewOrder">
      <span class="key bold">新建订单</span>
    </div><!--header for new order-->
    <div :class="{'metaDataContainer':true,'expanded':!isCollapse}"  @click="isCollapse=!isCollapse" v-if="!isNewOrder">
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
        <tr class="orderedProductWraper" v-for="(product,index) in delegateOrder.orderedProducts">
         <td class="text-content">{{product.productName}}</td>
         <td class="text-content">无</td>
         <td class="text-content">{{product.orderedNumber}}</td>
         <td class="text-content">{{product.price}}</td>
         <td class="text-content">{{product.orderedNumber * product.price}}</td>
         <td class="clickable edit">
            <span class="clickable edit" v-if="isEditingProduct" @click="saveEditProduct">保存</span>
            <span class="clickable cancel" v-if="isEditingProduct" @click="isEditingProduct=false">取消</span>
            <span class="clickable edit" v-if="!isEditingProduct" @click="editProduct(index)">编辑</span>
         </td>
        </tr>
      <!--
        <tr>
         <td class="text-content">兰蔻粉水</td>
         <td class="text-content">无</td>
         <td class="text-content">2</td>
         <td class="text-content">100</td>
         <td class="text-content">200</td>
         <td class="clickable edit">编辑</td>
        </tr>
      -->
        <tr v-if="isAddingProduct" class="newItemWraper">
          <td class="editable" colspan="2">
            <custInput class="newItem" :placeholder="'产品名'" v-on:modelEmited="setNewProductName">
          </td>
          <td class="editable">
           <select class="comp-dropdown" v-model="newNbProduct">
            <option class="text-nav" v-for="i in 9">{{i}}</option>
           </select>
          </td>
          <td class="editable">
           <custInput class="newItem" :placeholder="'单价'" v-on:modelEmited="setPrice">
          </td>
          <td class="text-nav totalPrice">
           {{newTotalPrice}}
          </td>
          <td style="text-align:center;">
            <span class="clickable edit" @click="saveNewProduct">保存</span>
            <span class="clickable cancel" @click="isAddingProduct=false">取消</span>
          </td>
        </tr>
        <tr v-if="!isAddingProduct">
          <td colspan="5"></td>
          <td class="addNew" @click="isAddingProduct=true">
            <button class="plus"></button>
          </td>
        </tr>
        <tr>
         <td colspan="2" class="text-nav">运费(每样10元)</td>
         <td colspan="2" class="text-nav">{{totalProduct}}</td>
         <td v-if="!isEditingDeliveryFee">{{delegateOrder.deliveryFee}}</td>
         <td class="editable" v-if="isEditingDeliveryFee">
          <custInput class="newItem" :placeholder="'运费'" :modelValue="delegateOrder.deliveryFee" v-on:modelEmited="setDeliveryFee"/>
         </td>
         <td style="text-align:center;">
            <span class="clickable edit" v-if="isEditingDeliveryFee" @click="saveDeliveryFee">保存</span>
            <span class="clickable cancel" v-if="isEditingDeliveryFee" @click="isEditingDeliveryFee=false">取消</span>
            <span class="clickable edit" v-if="!isEditingDeliveryFee" @click="isEditingDeliveryFee=true">编辑</span>
         </td>
        </tr>
        <tr>
         <td colspan="2" class="text-nav">总额</td>
         <td colspan="2">{{totalProduct}}</td>
         <td colspan="2">{{totalAmount}}</td>
        </tr>
       </tbody>
      </table>
      <div class="commentActionContainer">
       <div class="commentWraper">
         <span v-if="!isEditOrder" class="bold comment-label">备注:</span>
         <span v-if="!isEditOrder" class="text-content">{{delegateOrder.comment}}</span>
         <custInput v-if="isEditOrder" :type="'textarea'" :modelValue="delegateOrder.comment"
           class="commentInput" :placeholder="'备注'" v-on:modelEmited="setNewComment">
       </div>
       <div class="payWraper">
        <span class="edit" v-if="!isEditOrder">付款方式:</span>
        <span class="text-content" v-if="!isEditOrder">{{delegateOrder.payType}}</span>
        <span v-if="isEditOrder"><custInput class="payInput" :modelValue="delegateOrder.payType"
        v-on:modelEmited="setNewPayType" :placeholder="'付款方式/状态'"></span>
       </div>
       <div class="actionWraper">
        <span class="text-nav clickable edit" @click="editOrder" v-if="!isEditOrder">编辑</span>
	    <span class="text-nav clickable edit" @click="saveEditOrder" v-if="isEditOrder">保存</span>
	    <span class="text-nav clickable cancel" @click="isEditOrder=false" v-if="isEditOrder">取消</span> 
	    <span class="text-nav clickable cancel" v-if="!isEdit && !isNewOrder">结束订单</span>       
       </div>
      </div>
     </div><!--orderDetailContainer-->
    </transition>
  </div>
</template>

<script>
import CustInput from 'components/rawHtmlComponent/custInput'
function calculateTotalNb(orderedProducts){
    let val = 0
    orderedProducts.forEach(product => {
    val+= new Number(product.orderedNumber)})
    return val  
}

function calculateTotalAmount(orderedProducts,deliveryFee){
    let val = 0
    orderedProducts.forEach(product => {val+= product.orderedNumber * product.price || 0})
    return val+ new Number(deliveryFee)
}

export default {
  name: 'orderCollapse',
 
  props: ['collapse','order','validStat'],

  data () {
    return {
      delegateOrder        : this.order || undefined,
      isNewOrder           : this.order?false:true,
      isEdit               : this.order?false:true,
      isCollapse           : this.collapse,
      isAddingProduct      : this.order?false:true,
      isEditOrder          : false,     
      isEditingDeliveryFee : false,
      isEditingProduct     : false,

      newProductName       : '',
      newPrice             : '',
      newNbProduct         : 1,
      newDeliveryFee       : '0',
      newComment           : '无',
      newPayType           : '未支付',
  

      totalProduct         : 0,
      totalAmount          : 0
    }
  },

  components: {
    CustInput
  },

  created() {
   if(this.delegateOrder){
    /*TO DO*/
   }
   else{
    this.delegateOrder = {
                          deliveryFee :'0',
                          comment     :'无',
                          payType     :'未支付',
                          payStatus   :'2',
                          orderedProducts : []
                          }
    this.updateTotals()
   }
  },

  methods: {
   updateTotals() {
    this.totalProduct = calculateTotalNb(this.delegateOrder.orderedProducts)
    this.totalAmount = calculateTotalAmount(this.delegateOrder.orderedProducts,this.delegateOrder.deliveryFee)
   },
   //setters
   setNewProductName(val){
    this.newProductName = val.replace(/^\s+|\s+$/g,'')
   },

   setPrice(val){
    this.newPrice = val.replace(/^\s+|\s+$/g,'')
   },

   setDeliveryFee(val){
    this.newDeliveryFee = val.replace(/^\s+|\s+$/g,'','')
   },

   setNewComment(val){
    this.newComment = val.replace(/^\s+|\s+$/g,'')
   },

   setNewPayType(val){
    this.newPayType = val.replace(/^\s+|\s+$/g,'','')
   },
   
   //saves
   saveNewProduct() {
    this.delegateOrder.orderedProducts.push({
      id             : this.delegateOrder.orderedProducts.length+1,
      productName    :this.newProductName,
      picturePath    :'无',
      orderedNumber  :this.newNbProduct,
      price          :this.newPrice 
    })

    this.delegateOrder.deliveryFee = calculateTotalNb(this.delegateOrder.orderedProducts) * 10
    //this.delegateOrder.deliveryFee = '50'

    this.updateTotals()
    this.isAddingProduct = false
   },

   saveEditProduct() {
    this.isEditingProduct = false
   },

   editProduct(index) {
    this.isEditingProduct = true
   },

   saveDeliveryFee() {
   //valid deliveryFee first
    this.delegateOrder.deliveryFee = this.newDeliveryFee

    this.updateTotals()
    this.isEditingDeliveryFee = false
   },

   editOrder() {
    this.newPayType = this.delegateOrder.payType
    this.newComment = this.delegateOrder.comment

    this.isEditOrder = true
   },

   saveEditOrder() {
    this.delegateOrder.payType = this.newPayType
    this.delegateOrder.comment = this.newComment
    this.isEditOrder = false
   }
  },

  watch: {
   //IR fix: total price not rerendered upon adding product
   isAddingProduct(val) {
    if(val) this.newPrice = 0
   },

   //if validStat = true, then validate stats
   validStat(val) {
    if(val){
     //TO DO: run validation
      
     if(true){
      //set payStatus
      this.delegateOrder.payType = /未|没/g.test(this.delegateOrder.payType)?2:1
      this.$emit('validRes',this.delegateOrder)
     }
    }
   }
  },

  computed: {
   newTotalPrice() {
    return isNaN(new Number(this.newPrice))?0:this.newPrice * this.newNbProduct
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
        & tr.orderedProductWraper:nth-child(even){
          background:#F6F7FA;
        }

        & .editable{
          height: 60px; 
          vertical-align: bottom;
          padding-bottom:5px;
         }

        & .newItem{
          margin-bottom: 0;
         }

    	  & tr td{
    	    height: 45px;
    	    border-top:2px solid #F6F7FA;

          &:nth-child(6){text-align:center;}
    	  }

    	  & tr:last-child td{
    	    border-top:2px solid lighten(black,60%); 
    	  }

    	  & tr.newItemWraper{      
           & td{
             background:white;     
           }

           & .totalPrice{
            vertical-align: center;
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
