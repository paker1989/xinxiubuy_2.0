<template>
  <div class="productUploader">
	<form method="post" enctype="multipart/form-data" action="/upload">
	  <input type="text" name="username">
	  <input type="password" name="password">
	  <input type="file" name="thumbnail">
	  <input type="submit">
	</form>
  </div>
</template>

<script>
export default {
  name: 'uploader'
}
</script>

<style lang="scss" scoped>
 
</style>
