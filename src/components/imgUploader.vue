<template>
  <div class="imgUploader">
     <div class="dropFileWraper">
      <input class="file-input" type="file" accept="image/*" @change="handleFile">
      <p class="drag-drop-text">拖放文件至此处</p>
      <div class="currentUploadPic" :style="previewPicture"></div>
     </div>
     <div class="loadedPicsPrevContainer">
       <img class="loadedPicsPrev" v-for="url in currentUploadPicUrls" :src="url"/>
     </div>
     <button class="ui button fluid upload-button" @click="triggerFileInput">上传文件</button>  
  </div>
</template>

<script>
export default {
  name: 'imgUploader',

  data () {
    return {
      currentUploadPicUrls : []
    }
  },

  mounted() {

  },

  computed: {
    previewPicture() {
      if(this.currentUploadPicUrls.length==0)return
      return {backgroundImage : 'url(\''+this.currentUploadPicUrls[0]+'\')'}      
    }
  },

  methods: {
   triggerFileInput() {
    $('.file-input').trigger('click')
   },

   handleFile() {
     let file = $('.file-input')[0].files[0]

     if(file){
      let reader = new FileReader()

      reader.onload = (e) => {
        this.currentUploadPicUrls.unshift(e.target.result)
      }

      reader.readAsDataURL(file)
     }
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
  
  & .dropFileWraper{
    position:relative;
    width: 100%;
    min-height: 350px;
    border:3px dashed lighten(#1FB264,10%);
    margin-bottom: 10px;

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
      z-index: 3;
      position:absolute;
      width:100%; 
      height: 100%;
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
