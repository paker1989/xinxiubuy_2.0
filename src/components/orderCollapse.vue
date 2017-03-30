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
        <label class="value text-content">{{delegateOrder.uuid}}</label>
      </span>
      <span>
        <label class="key bold">订单日期:</label>
        <label class="value text-content">{{delegateOrder.createdDate}}</label>
      </span>
      <span>
        <label class="key bold">产品数量:</label>
        <label class="value text-content">{{totalProduct}}</label>
      </span>
      <span>
        <label class="key bold">付款方式:</label>
        <label class="value text-content">{{delegateOrder.payType}}</label>
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
       <tbody><!--已有产品-->
        <tr class="orderedProductWraper" v-for="(product,index) in delegateOrder.orderedProducts" :key="index">
          <td class="text-content" v-if="editingIndex != index">{{product.productName}}</td>
          <td class="text-content" v-if="editingIndex != index">无</td>
          <td class="text-content" v-if="editingIndex != index">{{product.orderedNumber}}</td>
          <td class="text-content" v-if="editingIndex != index">{{product.price}}</td>
          <td class="text-content" v-if="editingIndex != index">{{product.orderedNumber * product.price}}</td>
          <td class="editable" colspan="2" v-if="editingIndex == index">
            <custInput :class="{'newItem':true,'invalid':errorMessages['editedProductName']}" :placeholder="'产品名'" :modelValue="editedProductName" 
                       v-on:modelEmited="setEditedProductName">
          </td>
          <td class="editable" v-if="editingIndex == index">
           <select class="comp-dropdown" v-model="editedNbProduct">
            <option class="text-nav" v-for="i in 9">{{i}}</option>
           </select>
          </td>
          <td class="editable" v-if="editingIndex == index">
           <custInput :class="{'newItem':true,'invalid':errorMessages['editedPrice']}" :placeholder="'单价'" v-on:modelEmited="setEditedPrice"
                      :modelValue="editedPrice">
          </td>
          <td class="text-nav totalPrice" v-if="editingIndex == index">
           {{editedTotalPrice}}
          </td>
         <td class="clickable edit center">
            <span class="clickable edit" v-if="editingIndex == index && delegateOrder.payStatus==1"
             @click="saveEditProduct">保存</span>
            <span class="clickable cancel" v-if="editingIndex == index && delegateOrder.payStatus==1"
             @click="cancelEditProduct(index)">取消</span>
            <span class="clickable edit" v-if="editingIndex == -1 && delegateOrder.payStatus==1"
             @click="editProduct(index)">编辑</span>
            <span class="clickable cancel" v-if="editingIndex == -1 && delegateOrder.payStatus==1"
             @click="deleteProduct(index)">删除</span>
         </td>
        </tr>
        <!--新建产品-->
        <tr v-if="isAddingProduct" class="newItemWraper">
          <td class="editable" colspan="2">
            <custInput :class="{'newItem':true,'invalid':errorMessages['newProductName']}" :placeholder="'产品名'"
                       v-on:modelEmited="setNewProductName">
          </td>
          <td class="editable">
           <select class="comp-dropdown" v-model="newNbProduct">
            <option class="text-nav" v-for="i in 9">{{i}}</option>
           </select>
          </td>
          <td class="editable">
           <custInput :class="{'newItem':true,'invalid':errorMessages['newPrice']}"
                      :placeholder="'单价'" v-on:modelEmited="setPrice">
          </td>
          <td class="text-nav totalPrice">
           {{newTotalPrice}}
          </td>
          <td class="center">
            <span class="clickable edit" v-if="delegateOrder.payStatus==1" @click="saveNewProduct">保存</span>
            <span class="clickable cancel" v-if="delegateOrder.payStatus==1" @click="isAddingProduct=false">取消</span>
          </td>
        </tr>
        <!--增加 按钮-->
        <tr v-if="!isAddingProduct && delegateOrder.payStatus==1">
          <td colspan="5"></td>
          <td class="addNew" @click="isAddingProduct=true">
            <button class="plus"></button>
          </td>
        </tr>
        <!--运费-->
        <tr>
         <td colspan="2" class="text-nav">运费(每样10元)</td>
         <td colspan="2" class="text-nav">{{totalProduct}}</td>
         <td v-if="!isEditingDeliveryFee">{{delegateOrder.deliveryFee}}</td>
         <td class="editable" v-if="isEditingDeliveryFee">
          <custInput :class="{'newItem':true,'invalid':errorMessages['newDeliveryFee']}" :placeholder="'运费'"
                     :modelValue="delegateOrder.deliveryFee" v-on:modelEmited="setDeliveryFee"/>
         </td>
         <td class="center">
            <span class="clickable edit" v-if="isEditingDeliveryFee && delegateOrder.payStatus==1" @click="saveDeliveryFee">保存</span>
            <span class="clickable cancel" v-if="isEditingDeliveryFee && delegateOrder.payStatus==1" @click="cancelDeliveryFee">取消</span>
            <span class="clickable edit" v-if="!isEditingDeliveryFee && delegateOrder.payStatus==1" @click="isEditingDeliveryFee=true">编辑</span>
         </td>
        </tr>
        <tr>
         <td colspan="2" class="text-nav">总额</td>
         <td colspan="2">{{totalProduct}}</td>
         <td colspan="2">{{totalAmount}}</td>
        </tr>
       </tbody>
      </table>
      <div class="metadataEditContainer">
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
        <span class="text-nav clickable edit" @click="editOrder" v-if="!isEditOrder && delegateOrder.payStatus==1">编辑</span>
	      <span class="text-nav clickable edit" @click="saveEditOrder" v-if="isEditOrder && delegateOrder.payStatus==1">保存</span>
	      <span class="text-nav clickable cancel" @click="isEditOrder=false" v-if="isEditOrder && delegateOrder.payStatus==1">取消</span> 
	      <span class="text-nav clickable cancel" @click="finalizeOrder" v-if="!isNewOrder && delegateOrder.payStatus==1">结束订单</span>    
        <span class="text-nav clickable cancel" @click="activeOrder" v-if="!isNewOrder && delegateOrder.payStatus==2">激活</span>   
       </div>
      </div>
     </div><!--orderDetailContainer-->
    </transition>
    <div class="errorMessageWraper">
      <ul>
        <li v-for="item in Object.keys(errorMessages)">{{errorMessages[item]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import CustInput from 'components/rawHtmlComponent/custInput'
import {uuid,formatDate } from '../util'

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
      isCollapse           : this.collapse,
      isAddingProduct      : this.order?false:true,
      isEditOrder          : false,     
      isEditingDeliveryFee : false,

      newProductName       : '',
      newPrice             : '',
      newNbProduct         : 1,
      newDeliveryFee       : '0',
      newComment           : '无',
      newPayType           : '未支付',

      totalProduct         : 0,
      totalAmount          : 0,

      editedProductName    : '',
      editedPrice          : '',
      editedNbProduct      : 1,

      editingIndex         : -1, //editing product's index

      errorMessages        : {}
    }
  },

  components: {
    CustInput
  },

  created() {
   if(this.delegateOrder){
    /*TO DO*/
    this.updateTotals()
   }
   else{
    this.initForNewOrder()
   }
  },

  methods: {
   updateTotals() {
    this.totalProduct = calculateTotalNb(this.delegateOrder.orderedProducts)
    this.totalAmount = calculateTotalAmount(this.delegateOrder.orderedProducts,this.delegateOrder.deliveryFee)
   },

   validateNewProduct() {
    if(this.newProductName.length==0)
       this.$set(this.errorMessages,'newProductName','新添加产品名称不能为空')
    else
       this.$delete(this.errorMessages,'newProductName')

    if(isNaN(new Number(this.newPrice)))
       this.$set(this.errorMessages,'newPrice','新添加产品单价必须为数字')
    else
       this.$delete(this.errorMessages,'newPrice')
   },

   validateEditProduct() {
    if(this.editedProductName.length==0)
       this.$set(this.errorMessages,'editedProductName','编辑产品名称不能为空')
    else
       this.$delete(this.errorMessages,'editedProductName')

    if(isNaN(new Number(this.editedPrice)))
       this.$set(this.errorMessages,'editedPrice','编辑产品单价必须为数字')
    else
       this.$delete(this.errorMessages,'editedPrice')
   },

   validateDeliveryFee() {
    if(isNaN(new Number(this.newDeliveryFee)))
       this.$set(this.errorMessages,'newDeliveryFee','运费必须为数字')
    else
       this.$delete(this.errorMessages,'newDeliveryFee')
   },

   //setters
   setNewProductName(val){
    this.newProductName = val.replace(/^\s+|\s+$/g,'')
    this.validateNewProduct()
   },

   setPrice(val){
    this.newPrice = val.replace(/^\s+|\s+$/g,'')
    this.validateNewProduct()
   },

   setDeliveryFee(val){
    //IR to fix here
    this.newDeliveryFee = val.replace(/^\s+|\s+$/g,'','')
    this.validateDeliveryFee()
   },

   setEditedProductName(val){
    this.editedProductName = val.replace(/^\s+|\s+$/g,'')
    this.validateEditProduct()
   },

   setEditedPrice(val){
    this.editedPrice = val.replace(/^\s+|\s+$/g,'')
    this.validateEditProduct()
   },

   setNewComment(val){
    this.newComment = val.replace(/^\s+|\s+$/g,'')
   },

   setNewPayType(val){
    this.newPayType = val.replace(/^\s+|\s+$/g,'','')
   },
   //setters end
   
   //save new product in cache
   saveNewProduct() {
   this.validateNewProduct()
   if(this.errorMessages['newProductName'] || this.errorMessages['newPrice'])
       return 
   
    this.delegateOrder.orderedProducts.push({
      id             : this.delegateOrder.orderedProducts.length+1,
      productName    :this.newProductName,
      picturePath    :'无',
      orderedNumber  :this.newNbProduct,
      price          :this.newPrice 
    })

    this.delegateOrder.deliveryFee = calculateTotalNb(this.delegateOrder.orderedProducts) * 10
    this.updateTotals()
    this.isAddingProduct = false
   },

  //save edition in db 
   saveEditProduct() {
    this.validateEditProduct()
    if(this.errorMessages['editedProductName'] || this.errorMessages['editedPrice'])
       return 

    this.delegateOrder.orderedProducts[this.editingIndex].productName   = this.editedProductName
    this.delegateOrder.orderedProducts[this.editingIndex].price         = this.editedPrice
    this.delegateOrder.orderedProducts[this.editingIndex].orderedNumber = this.editedNbProduct
    this.updateTotals()

    this.$emit('updateOrder',this.delegateOrder)

    this.editingIndex = -1
   },
  
   editProduct(index) {
     this.editingIndex = index
     this.editedProductName = this.delegateOrder.orderedProducts[index].productName
     this.editedPrice       = this.delegateOrder.orderedProducts[index].price
     this.editedNbProduct   = this.delegateOrder.orderedProducts[index].orderedNumber
   },

   cancelEditProduct(index) {
    this.editingIndex = -1
    this.editedProductName = this.delegateOrder.orderedProducts[index].productName
    this.editedPrice       = this.delegateOrder.orderedProducts[index].price
    this.editedNbProduct   = this.delegateOrder.orderedProducts[index].orderedNumber 

    this.validateEditProduct()
   },

   //delete exsting product and update db
   deleteProduct(index) {
    this.delegateOrder.orderedProducts.splice(index,1)
    this.delegateOrder.deliveryFee = calculateTotalNb(this.delegateOrder.orderedProducts) * 10
    this.updateTotals()

    this.$emit('updateOrder',this.delegateOrder)
   },

   saveDeliveryFee() {
   //valid deliveryFee first
   this.validateDeliveryFee()
   if(this.errorMessages['newDeliveryFee'])return 

    this.delegateOrder.deliveryFee = this.newDeliveryFee
    this.updateTotals()
    this.isEditingDeliveryFee = false
   },

   cancelDeliveryFee() {
    this.newDeliveryFee = this.delegateOrder.deliveryFee
    this.validateDeliveryFee()
    this.isEditingDeliveryFee=false
   },

   editOrder() {
    this.newPayType = this.delegateOrder.payType
    this.newComment = this.delegateOrder.comment

    this.isEditOrder = true
   },
 
   //save comment and pay type detail in db
   saveEditOrder() {
    this.delegateOrder.payType = this.newPayType
    this.delegateOrder.comment = this.newComment

    if(!this.isNewOrder){
     this.$emit('updateOrder',this.delegateOrder)
    }

    this.isEditOrder = false
   },
   
   //init new order status
   initForNewOrder() {
      this.delegateOrder = {
                          deliveryFee :'0',
                          comment     :'无',
                          payType     :'未支付',
                          payStatus   : 1,
                          orderedProducts : []
                          }

      this.isAddingProduct = true
      this.updateTotals()
   },
  
   //结束订单:只有编辑状态下才可能
   finalizeOrder() {
    this.delegateOrder.payStatus = 2
    this.$emit('updateOrder',this.delegateOrder)
   },

   activeOrder() {
     this.delegateOrder.payStatus = 1
     this.$emit('updateOrder',this.delegateOrder)  
   }
  },

  watch: {
   //IR fix: total price not rerendered upon adding product
   isAddingProduct(val) {
      this.newProductName = ''
      this.newPrice = 0
      this.$delete(this.errorMessages,'newProductName')
      this.$delete(this.errorMessages,'newPrice')
   },

   //if validStat = true, then validate stats
   validStat(val) {
    if(val == 2){
     //TO DO: run validation
      
     if(true){
      this.delegateOrder.uuid = uuid()
      this.delegateOrder.createdDate = formatDate(new Date())

      this.$emit('validRes',this.delegateOrder)

      this.initForNewOrder()
     }
    }
    else if(val == 3){
      this.initForNewOrder()
      this.$emit('resumeCancel')
    }
   }
  },

  computed: {
   newTotalPrice() {
    return isNaN(new Number(this.newPrice))?0:this.newPrice * this.newNbProduct
   },

   editedTotalPrice() {
    return isNaN(new Number(this.editedPrice))?0:this.editedPrice * this.editedNbProduct
   },

   formattedCreatedDate() {
    return this.delegateOrder?formatDate(this.delegateOrder.createdDate): '数据错误'
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

     & .center{
      text-align: center;
     }

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

        & .metadataEditContainer{
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

      & .errorMessageWraper{
       width: 100%;
       text-align: left;
       color:darken(#E0B4B4,20%);

        & li{
          margin-left:2%;
          margin-bottom: .5em;
        }
      }

      & .clickable:hover{
    	cursor: pointer;
  }

  & .invalid{
    border:2px solid #E0B4B4;
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
