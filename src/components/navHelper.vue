<template>
  <div class="navHelper">
   <div>
     <ul>
      <li v-for="item in categories">
        <span @click="navToCategory(item.eleTop);" href="#sd" class="text-nav">{{item.label}}</span>
      </li>
     </ul>
   </div>
  </div>
</template>

<script>
export default {
  name: 'navHelper',

  props: ['categories'],

  data () {
    return {
     
    }
  },

  methods: {
   navToCategory(eleTop) {
    $('html,body').animate({
     scrollTop: (eleTop - $(window).height())>0?(eleTop - $(window).height()) : 0
    },400)
   }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .navHelper {
  position:fixed;
  top:50%;
  right:5vw;
  width: 20px;
  transform:translatey(-50%);

  & .text-nav {
   color:darken(#cccccc,9%);
   cursor: pointer;

   &:hover {
    transform: scale(1.2);
    color:black;
    transition: all .1s linear;
   }
  }

  & ul {
    list-style-type: none;

    & > li{
      margin:50px 0;
    }
  }
 }
</style>
