<template>
	<div id="error">
		<mt-header title="淘点">
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<div class="wrap">
			<h1>404</h1>
			<div class="banner">
				<img src="/static/images/banner.png" alt="">
			</div>
			<div class="page">
				<h2>404,not found!</h2>
			</div>
			<div class="footer">
				<p>Taodian@淘点</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{

			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			}
		}
	}
</script>
<style>

.mint-header{
	width: 30rem;
	font:1.3rem/1.8rem '微软雅黑';	
	height: 3rem;
}
.mint-header .mint-tab-item-label{
	font:1.3rem/1.5rem '微软雅黑';		
}
.mint-header .mint-tab-item-icon{
	font:1.3rem/1.8rem '微软雅黑';
}
.mint-button-text{
	font:1rem/1.8rem '微软雅黑';		
}
</style>
<style scoped lang="scss">

#error{
	width: 30rem;
}
</style>


