<template>
	<div id="header">
		<mt-header :title="title" fixed>
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<div style="width:100%;height:3rem"></div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				title:'其他'
			}
		},
		created:function(){
			//免费餐 
			if(this.$route.path=='/other/about'){
				this.title='关于我们';
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
	font:1.3rem/2rem '微软雅黑';	
	height: 3rem;
}
.mint-header.is-fixed{
	z-index: 9999;
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
