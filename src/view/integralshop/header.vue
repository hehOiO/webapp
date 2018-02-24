<template>
	<div id="header">
		<mt-header :title="title">
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				title:'积分商城'
			}
		},
		created:function(){
			if(this.$route.path=='/integralshop/user'){
				this.title='我的积分';
			}else if(this.$route.path=='/integralshop/text'){
				this.title='积分说明';
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
