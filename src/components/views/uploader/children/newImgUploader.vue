<template>
  <div class="cropUploader">
   <div class="actionContainer" v-if="dataResult=='' || oncrop==false">
   	<button>上传</button>
   	<input type="file" class="upload-input" @change="fileChange">
   </div> 
   <div v-if="dataResult!='' && oncrop" class="cropContainer">
    <div class="previewContainer">
     <section :class="{'grabbing':grabbing}">
      <img :src="dataResult" class="preview" 
           @mousedown.prevent="cropDragBegin"
           @mousemove.prevent="cropDragMove"
           @mouseup.prevent  ="cropDragEnd"
           :style="{'width' :previewWidth+'px',
                    'height':previewHeight+'px',
                    'left'  :previewLeft+'px',
                    'top'   :previewTop+'px'}" />       
     </section>
     <footer>
      <button>裁剪</button>
      <button @click="cancelCrop">取消</button>
     </footer>
     <input type="range"  v-model="scale" min="100" max="200" step="1" @input="cropZoom">
    </div><!--previewContainer-->
   </div><!--cropContainer-->
  </div>
</template>

<script>
export default {
 name : 'cropUploader',

 data() {
 	return {
 		oncrop       : false,
 		dataResult   : '',
    autoSetWidth : 0,
    autoSetHeight: 0,
 		previewWidth : 0,
 		previewHeight: 0,
 		previewLeft  : 0,
 		previewTop   : 0,
    beginX       : 0,
    beginY       : 0,
 		img          :null,
 		options      :{
	                 width       :400,
                   height      :400,
                   limitWidth  :400*3,
                   limitHeight :400*3              
 		              },
    grabbing     : false,
    scale        : 100

 	}
 },

 computed: {
  previewSize() {
  	return {
  		width : this.previewWidth,
  		height: this.previewHeight
  	}
  }
 },

 methods: {
 	fileChange(e) {
    /*
 	 console.log(e) 
     console.log(e.target.files) // good
     console.log(e.files)
     */
     
     let fr = new FileReader()
     fr.onload= e=>{
      this.oncrop = true
      this.img = new Image()
      this.img.src = fr.result

      this.img.onload=()=>{
      	//console.log(this.img.naturalWidth)
      	//console.log(this.img.naturalHeight)
      	//确定预览方位
      	let nw = this.img.naturalWidth,
      	    nh = this.img.naturalHeight
      	if(nw>nh){
         this.autoSetHeight = this.previewHeight = Math.min(nh,this.options.height)
         this.autoSetWidth = this.previewWidth = Math.round(this.previewHeight*nw/nh)
      	}
      	else{
         this.autoSetWidth = this.previewWidth  = Math.min(nw,this.options.width)
         this.autoSetHeight = this.previewHeight = Math.round(this.previewWidth*nh/nw)
      	}
      	this.previewLeft = -( this.previewWidth-this.options.width)/2
      	this.previewTop  = -(this.previewHeight-this.options.height)/2
        //console.log(-(this.previewWidth-this.options.width)/2)
       // console.log(this.previewHeight)
       // console.log(this.previewWidth)
      }

      this.dataResult = fr.result 
     }

     fr.readAsDataURL(e.target.files[0])
 	},

  cropDragBegin(e) {
   console.log('cropDragBegin')
   this.grabbing = true
   this.beginX = e.pageX - e.target.offsetLeft
   this.beginY= e.pageY - e.target.offsetTop
   console.log('previewLeft : '+this.previewLeft)
   console.log('e.target.offsetLeft : '+e.target.offsetLeft)
   console.log('e.pageX : '+e.pageX)

   document.addEventListener('mouseover',this.cropDragMove,false)
   document.addEventListener('mouseup',this.cropDragEnd,false)
    
  },

  cropDragMove(e) {
   if(this.grabbing==false) return false
  // if(this.previewLeft == 0) return false

   console.log('cropDragMove')
   this.previewLeft = e.pageX - this.beginX
   this.previewTop = e.pageY - this.beginY

   if(this.previewWidth == this.options.width) this.previewLeft = 0
   if(this.previewLeft>0) this.previewLeft = 0
   if(this.previewLeft < -(this.previewWidth - this.options.width)) this.previewLeft = -(this.previewWidth - this.options.width)
   if(this.previewHeight == this.options.height) this.previewTop = 0
   if(this.previewTop>0) this.previewTop = 0
   if(this.previewTop < -(this.previewHeight - this.options.height)) this.previewTop = -(this.previewHeight - this.options.height)
  },

  cropDragEnd(e) {
    console.log('cropDragOver')
    this.grabbing = false

   document.removeEventListener('mouseover',this.cropDragMove,false)
   document.removeEventListener('mouseup',this.cropDragEnd,false)
  },

  cancelCrop() {
   this.oncrop = false
  },

  cropZoom()  {
    let scaleLevel = this.scale/100,
        oldPreviewW = this.previewWidth,
        oldPreviewH = this.previewHeight

    if(this.autoSetWidth > this.autoSetHeight){
      this.previewWidth = Math.min(this.options.limitWidth,this.autoSetWidth * scaleLevel)
      this.previewHeight = this.previewWidth*this.autoSetHeight/this.autoSetWidth
    }
    else{
      this.previewHeight = Math.min(this.options.limitHeight,this.autoSetHeight * scaleLevel)
      this.previewWidth = this.previewHeight*this.autoSetWidth/this.autoSetHeight 
    }

    this.previewTop = this.previewTop*(this.previewWidth/oldPreviewW)
    this.previewLeft = this.previewLeft*(this.previewWidth/oldPreviewW)     

  }

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .cropUploader{
 	position: relative;
 	width: 100%;
 	
 	& .actionContainer{
 	  position:relative;
 	  width:100px;
 	  margin:20vh auto;  

 	  & .upload-input{
 	  	position:absolute;
 	  	top:0;
 	  	left:0;
 	  	width:100px;
 	  	height: 100%;
 	  	opacity: 0;
 	  	z-index: 999;
 	  	cursor: pointer;
 	  }
 	}/*action container*/

 	& .cropContainer{
     position: fixed;
     background: rgba(0,0,0,.7);
     width: 100vw;
     height: 100vh;

     & .previewContainer{
      position:fixed;
      left:50%;
      top:200px;
      transform: translate3d(-50%,0,0);

       & section{
        position:relative;
        width: 400px;
        height: 400px;
        overflow: hidden;

        & .preview{
         position:absolute;
         cursor:grab;
        }

        &.grabbing{
          & .preview{
            cursor: grabbing
          }
        }
       }/*section*/

       & footer{
          position: relative;
          display: flex;

          & button{
            width: 50%;
            border:1px solid #eee;
            outline: none;
          }
       }/*footer*/

       & input[type="range"]{
        appearance: none;
        outline: none;
        position:absolute;
        bottom:70px;
        left:50%;
        transform: translate3d(-50%,0,0);
        z-index: 999;

        &::-webkit-slider-thumb{
          appearance:none;
          outline: none;
          border: 1px solid #ccc;   
          height: 20px;   
          width: 20px;   
          border-radius: 10px;   
          background: #ffffff;   
          cursor: pointer;   
          margin-top: -10px; /* 在Chrome下你需要定义一个margin值, 但在Firefox和IE下，是自动的 */  
         /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; */
        }

        &::-webkit-slider-runnable-track {
          width: 50%;   
          height: 4.4px;   
          cursor: pointer;   
         /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;  */ 
          background: lighten(#ff5722,10%);   
          border-radius: 1.3px;   
          border:none;       
        }

       }

     }/*previewContainer*/

 	}/*crop container*/

 }

 button{
 	border:none;
 	padding: 1em 2em;
 	font-size: 14px;
 	font-family: '微软雅黑'!important;
 }
</style>