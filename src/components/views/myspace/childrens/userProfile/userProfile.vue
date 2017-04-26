<template>
  <div class="userProfile">
    <contactInfo class="contactInfo"/>
    <resetPwdModal/>
  </div>
</template>

<script>
import ContactInfo from './children/contactInfo'
import ResetPwdModal from './children/ResetPwdModal'

export default {
  name: 'userProfile',
  
  components: {
   ContactInfo,ResetPwdModal
  },

  data() {
   return {
   }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .userProfile{
   position: relative;
   width: 100%;
   min-height: 60vh;

   & .contactInfo{
    width: 30%;
   }
 }
</style>
