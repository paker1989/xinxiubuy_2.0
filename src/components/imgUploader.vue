<template>
  <div class="imgUploader">
     <div class="dropFileWraper">
      <div class="drag-drop-draw"><p class="drag-drop-text"></p></div>
      <input class="file-input" type="file" accept="image/*" @change="handleFile()">
      <p class="drag-drop-text">拖放文件至此处</p>
      <div class="currentUploadPic" :style="previewPicture"></div>
     </div>
     <div class="loadedPicsPrevContainer">
       <img class="loadedPicsPrev" v-for="(url,index) in currentUploadPicUrls" :src="url"
            @click="setCurrentUploadPic(index)"/>
     </div>
     <button class="ui button fluid upload-button" @click.stop="triggerFileInput">上传文件</button>  
     <div class="ui error message error-hide">{{errorMessage}}</div>
  </div>
</template>

<script>
export default {
  name: 'imgUploader',
  
  props: ['submitStatus'],

  data () {
    return {
      currentUploadedFiles : [],
      currentUploadPicUrls : [],
      errorMessage         : '',
      defaultPrvPicIndex   : 0
    }
  },

  watch: {
   errorMessage() {
    $('.ui.error.message.error-hide').removeClass('error-hide')
                                     .addClass('pictureUploadError')

    let delay = this.errorMessage.trim().length==0?100:3000
    setTimeout(() => {
     $('.ui.error.message.pictureUploadError').addClass('error-hide')
                                              .removeClass('pictureUploadError')
      this.errorMessage = ''
    },delay)
   },

   submitStatus(val) {
    /* 1 : check if can submit */
    if(val == 1){
      let validCheck = this.currentUploadPicUrls.length>0
      if(validCheck==false)
       this.errorMessage = '宝贝，必须上传至少一张图片哦~'

      this.$emit('imgStatusCheckResult',validCheck) 
    /*2 : get confirm from fileds check, submit*/
    }else if(val == 2){
     let formData = new FormData()
     let fileNameEntries = new Array()

     this.currentUploadedFiles.forEach(file => {
      formData.append(file.name,file)
      fileNameEntries.push(file.name)
     })

     formData.append('fileNameEntries',fileNameEntries)

     this.$http.post('uploadPics',formData).then((res)=>{
       if(res.status == 200){
        this.$emit('fileUuidsGenerated',res.body.data)
       }
     })
    }
   }
  },

  mounted() {
   $('.dropFileWraper')
     .bind('dragover',(e) => {
      e.preventDefault()
      e.stopPropagation()
      $('.drag-drop-draw').addClass('dragover')
      $('.drag-drop-draw .drag-drop-text').text('宝贝，将图片放在这个框框里')
   })
   .bind('dragleave', (e) => {
     $('.drag-drop-draw').removeClass('dragover')
     $('.drag-drop-draw .drag-drop-text').text('')
   })
   .bind('drop',(e)=>{
     e.preventDefault()
     e.stopPropagation()
    
     let file = e.originalEvent.dataTransfer.files[0]

     if(/^image\//g.test(file.type)){
      this.handleFile(file)
     }else{
      this.errorMessage = '只能上传图片'
     }

     $('.drag-drop-draw').removeClass('dragover')
     $('.drag-drop-draw .drag-drop-text').text('')
   })

  },

  computed: {
    previewPicture() {
      if(this.currentUploadPicUrls.length==0)return
      return {backgroundImage : 'url(\''+this.currentUploadPicUrls[this.defaultPrvPicIndex]+'\')'}      
    }
  },

  methods: {
   triggerFileInput() {
    $('.file-input').trigger('click')
   },

   handleFile(file) {
    if(this.currentUploadPicUrls.length==4){
     this.errorMessage = '乖，最多4张图片~'
     return   
    }

    file = file?file:$('.file-input')[0].files[0]
    this.currentUploadedFiles.push(file)

    if(file){
      let reader = new FileReader()
      reader.onload = (e) => {
        this.currentUploadPicUrls.unshift(e.target.result)
      }
      reader.readAsDataURL(file)
     }
   },

   setCurrentUploadPic(index) {
     this.defaultPrvPicIndex = index
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .imgUploader{
  position: relative;
  width: 100%;
  padding: 1em;
  margin-top:1em;

  & .dragover{
   background: lighten(#1FB264,10%);
   color:white;
   z-index: 3;
  }

  & .pictureUploadError{
   opacity: 1;
   transition: opacity 1s linear;
  }

  & .error-hide{
   opacity: 0;
   transition: opacity .1s linear;
  }
  
  & .dropFileWraper{
    position:relative;
    width: 100%;
    min-height: 350px;
    border:3px dashed lighten(#1FB264,10%);
    margin-bottom: 10px;

    & .drag-drop-draw{
     position:absolute;
     width: 100%;
     height: 100%;
     z-index:1;
    }

    & .file-input{
      position:absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    & .drag-drop-text{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate3d(-50%,-50%,0);
      letter-spacing: 2px;
      font-size: 16px;
    }

    & .currentUploadPic{
      position:absolute;
      width:100%; 
      height: 100%;
      transition: backgroundImage .3s ease-in;
      background-size:cover;
      background-position:center;
    }
  }/* dropFileWraper end */

  & .loadedPicsPrevContainer{
   diplay:flex;
   justify-content: center;
   flex-wrap:wrap;
   margin: .5em 0;
   width: 100%;

    & .loadedPicsPrev{
      width:52px;
      height: 45px;
      border-radius:2px;
      margin:0 1em;
      cursor:pointer;
    }
  }

  & .upload-button{
    background: lighten(#ff6a3c,4%);
    color:white;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 2px;
  }
 }
</style>
