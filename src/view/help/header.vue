<template>
	<div id="header">
		<mt-header title="我的客服">
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			//回退
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
