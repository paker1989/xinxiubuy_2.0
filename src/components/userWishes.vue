 <template>
  <div class="userWishes">
    <section class="wishContainer">
     <div class="header">
     	<span class="title">你的收藏</span>
     	<span class="displayAll clickable">全部显示</span>
     </div><!--section - header end-->
     <div class="wishList">
     	<userWishList/>
     </div>
    </section><!--end section -->
  </div>
</template>

<script>
import UserWishList from 'components/wraper/userWishList'
export default {
  name: 'userWishes',

  components:{
   UserWishList
  },
  
  data() {
  	return {
    
  	}
  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .userWishes{
  position:relative;
  padding:20px;

  & .title{
  	font-size: 1.3rem;
  }

  & section{
  	position: relative;
  	width: 100%;
  	padding-bottom: 10px;

  	&:not(:first-child){
  	 border-top:1px solid #eee;
  	}
  }/*end section*/

  & .wishContainer{
    width: 90%;
    margin: 0 auto;

  	& .header{
     text-align: left;
     margin-bottom: 1em;

     & .displayAll{
     	margin-left: 2em;
     	opacity: .5;
     }
  	}
  }/*end wishContainer */

 }
</style>
