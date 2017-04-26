<template>
  <div class="authentication">
   <div class="headerWraper">
     <div class="header">
      <div @click="setCurrentStat('登录')">登录</div>
      <div @click="setCurrentStat('注册')">注册</div>       
     </div><!--end header -->
     <div :class="headerCover"></div>
   </div><!--end headerWraper -->
   <div class="signinContainer" v-if="currentStat=='登录'">
     <custInput class="field" :placeholder="'用户名'"/>
     <custInput class="field" :placeholder="'密码'"/>
     <button class="ui button cust" @click="logIn">登录</button>
     <a class="forgetPW" href="#">忘记密码?</a>
   </div><!-- sign in end -->
   <div class="signupContainer" v-if="currentStat=='注册'">
     <div>
      <custInput class="field" :placeholder="'用户名'"/>
      <custInput class="field" :placeholder="'电话'"/>    
      <custInput class="field" :placeholder="'输入密码'"/> 
      <custInput class="field" :placeholder="'确认密码'"/>   
     </div>
     <button class="ui button cust" @click="signup">确认</button>
     <button class="ui button cust">取消</button>
   </div><!--sign up end -->
  </div>
</template>

<script>
import CustInput from 'components/custTag/custInput'

export default {
  name: 'authentication',

  components: {
   CustInput
  },

  data () {
    return {
     currentStat : '登录'
    }
  },

  methods: {
    setCurrentStat(stat){
      this.currentStat = stat
    },

    signup() {
    /*
     let newUser = {
      username:'xubin',
      password:'paker1989',
      phoneNumber:'0659657708',
      photoPath:'无'
     }
     */
     
     /*
     this.$store.dispatch('SIGN_UP',{value:newUser}).then((res) => {
      this.$router.replace('/')
     })
     */
     let data = new FormData()
     
     data.append('username','晓之甜蜜的爱')
     data.append('password','paker19189')
     data.append('phoneNumber','0659657708')
     data.append('wishedList',['58cd8677b23cd80759700c1e','58cd5050d4671c024d89b59e','58cd4f1dd4671c024d89b59d',
      '58cd4ec3d4671c024d89b59c','58cd4dc2d4671c024d89b59a','58d910f7d22ec94fd86d1710','58d404295ea49d744ce1d5f3',
      '58d26c4a3a9a5412b8260921','58cf9605ec72e36b581f8600','58cf9643ec72e36b581f8603','58cf9693ec72e36b581f8606'])

     this.$http.post('signup',data).then( (res) => {
      this.$router.replace('/')
     })
    },

    logIn() {
     let data = new FormData()
     
     data.append('username','晓之甜蜜的爱')
     data.append('password','paker19189')

     this.$http.post('/login',data).then( (res) => {
      if(res.body.user)
        this.$router.replace('/myspace/wishes')
      else
        alert(res.body.msg)
     })
    }
  },

  computed: {
    headerCover() {
      return {
        'basicHeaderCover':true,
        'headerCoverPos'  : this.currentStat == '注册'?true:false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .authentication{
  width: 310px;
  box-shadow:0 4px 9px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);

  & .headerWraper{
   width: 100%;
   position:relative;

   & .header{
      width: 100%;
      display: flex;

      & > * {
        background-color:#009688 !important;
        width: 50%;
        padding: 10px 0;
        cursor: pointer;
        color:white;
      }
   }/*end header*/

   & .basicHeaderCover{
    position:absolute;
    width: 50%;
    height: 100%;
    top:0;
    left:0;
    opacity: .4;
    pointer-events: none;
    background: #e0f2f1;
    transition:all .3s linear;
   }

   & .headerCoverPos{
    left:50%;
    transition:all .3s linear;
   }
  }/*end headerWraper*/

  & .signinContainer, & .signupContainer{
    position:relative;
    width: 100%;
    padding: 50px 40px;

    & .field{
      margin-bottom: 50px;
    }

    & .cust{
      color:white;
      font-weight: 400;
      background-color: #009688;
      padding:10px 30px;
      border-radius:0;

      &:hover{
       box-shadow:0 4px 8px 0 rgba(0,0,0,0.16);  
      }
    }
  }/* end commun signincontainer and signupcontainer*/

  & .signupContainer{
   
  }/*end signupContainer*/

  & .signinContainer{
   & .forgetPW{
    padding-top:20px;
    padding-bottom:5px;
    border-bottom:1px dashed #ccc;
    font-size:12px;
    color:lighten(black,50%);
   }
  }/*end signinContainer*/
 }
</style>
