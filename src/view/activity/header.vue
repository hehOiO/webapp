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
				title:'活动专题'
			}
		},
		created:function(){
			//免费餐 
			if(this.$route.path=='/activity/freelunch'){
				this.title='霸王餐';
			}else if(this.$route.path=='/activity/freelunch/my'){
				this.title='我的餐券';
			//推荐有奖
			}else if(this.$route.path=='/activity/recommend'){
				this.title='推荐有奖';
			//活动规则	
			}else if(this.$route.path=='/activity/recommend/rule'){
				this.title='活动规则';
			//限时抢购
			}else if(this.$route.path=='/activity/timelimit'){
				this.title='限时抢购';
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
