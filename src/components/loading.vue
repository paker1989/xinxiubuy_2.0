<template>
   <div class="loading">
        <div class="load">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
 .loading {
    width: 100px;
    margin:0 auto;
    border-radius: 5px;
    text-align: center;

  & p {padding: 0 0 20px;}

  & .line {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      opacity: .6;
      background-color: #ff5722;
  }

  & .load .line:nth-last-child(1) {animation: loading .6s .1s linear infinite;}
  & .load .line:nth-last-child(2) {animation: loading .6s .2s linear infinite;}
  & .load .line:nth-last-child(3) {animation: loading .6s .3s linear infinite;}

  @keyframes loading {
      0 {transform: translate(0,0);}
      50% {transform: translate(0,15px);}
      100% {transform: translate(0,0);}
  }
}
</style>
