<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
<!--
  <span class="text-nav">首页</span>
  <span class="text-title">共享此文章：</span>
  <span class="text-title">暖冬 小田原</span>
  <span class="text-tag">span basic 打扫</span>
  <span class="text-content">我还接受以下工作订单：
  1.平面设计（LOGO，宣传页，海报，菜单等）
  2.摄影摄像（美食，人像，生活方式，旅行跟拍等）
  3.专栏写作（生活方式，极简主义等）
  4.中文日文互译（资料翻译，文章翻译等）
  5.日语会话练习（提供基础日语的入门教课，和中高级日语的会话练习）
  6.猎书，代购图书（帮助寻找原版，绝版的日文书籍）
  </span>
  <div class="action-btn">发表</div>
-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
