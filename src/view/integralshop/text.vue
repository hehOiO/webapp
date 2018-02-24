<template>
	<div id="text">
		<div class="js"></div>
		<div class="txt1" v-for="(item,index) in rule">
			<p class="title">Q{{ index+1 }}: {{ item.question }}</p>
			<div class="js" style="height: 0.6rem"></div>
			<div class="body">
				<p class="overview">{{ item.answer.title }}</p>
				<ul v-if="item.answer.body">
					<li v-for="(lis,key) in item.answer.body">{{ lis }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				rule:[
					{
						question:'怎么获得积分？',
						answer:{
							title:'在线支付的订单将获得订单积分奖励：',
							body:[
								'积分将在用户完成评价后获得,会根据订单实际支付金额和评价的质量发放。',
								'每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。'
							]
						}
					},
					{
						question:'积分用来做什么？',
						answer:{
							title:'可以在积分商城兑换各种礼品。'
						}
					},					
				]
			}
		},
		mounted:()=>{

		},
		methods:{

		}
   }
</script>

<style scoped lang="scss">
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
.js{
	width: 100%;
	clear: left;
	height: 2.5rem;
}
#text{
	width:30rem;
	background-color: #fff;
	padding-bottom: 1.5rem;
}
.txt1{
	text-align:left;
	width: 28rem;
	padding:0 1rem;
	margin-bottom: 1.5rem;
	.title{
		@include font(1.2rem,1.5rem,#000);
		font-weight: bold;
	}
	.body{

		.overview{
			margin-bottom: 0.5rem;
			@include font(1rem,1.5rem,#666);
		}
		ul{
			width: 100%;
			li{
				width: 90%;
				margin-left: 10%;
				@include font(0.9rem,1.3rem,#666);
				list-style-type:disc;
				margin-bottom: 0.2rem;
			}
		}
	}
}	 
</style>