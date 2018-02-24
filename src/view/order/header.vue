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
				title:'我的订单'
			}
		},
		created:function(){
			if(this.$route.path=='/order/confirm'){
				this.title='确认订单';
			}else if(this.$route.path=='/order/detail'){
				this.title='订单详情';
			}else if(this.$route.path=='/order/hobby'){
				this.title='订单备注';
			}else if(this.$route.path=='/order/detail'){
				this.title='订单详情';
			}else if(this.$route.path=='/order/evaluate'){
				this.title='订单评价';
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
