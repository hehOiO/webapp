<template>
	<div id="index">
		<div class="js"></div>
		<div class="title">
			常见问题
		</div>
		<div class="lis" v-for="(item,index) in help_data">
			<div class="left">
				<p class="icon"><i :class="item.icon" aria-hidden="true"></i></p>
				<p class="text">{{ item.typename }}</p>
			</div>
			<div class="right">
				<router-link :to="{path:'/help/detail'}"><div class="dd" style="border-bottom:0">{{ item.question[0].title | answer_substr }}</div></router-link>
				<router-link :to="{path:'/help/detail'}"><div class="dd">{{ item.question[1].title | answer_substr }}</div></router-link>
			</div>
			<div style="clear: both"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				help_data:[
					{
						typename:'催单问题',
						icon:'fa fa-clock-o',
						question:[
							{
								title:'我的订单还没有送到，我要催单',
								answer:'继续催!'
							},
							{
								title:'商家和骑手都联系不上怎么办？',
								answer:'听天由命吧!'
							}
						]
					},
					{
						typename:'退单问题',
						icon:'fa fa-file-text-o',
						question:[
							{
								title:'长时间没有收到餐，我要退单',
								answer:'呵呵！'
							},
							{
								title:'我申请退单以后，商家不同意怎么办？',
								answer:'认栽呗!'
							}
						]
					},
					{
						typename:'活动问题',
						icon:'fa fa-newspaper-o',
						question:[
							{
								title:'我是新用户，但是没有享受新用户立减/不能用新用户红包怎么办？',
								answer:'人丑！'
							},
							{
								title:'我的红包不能用怎么办？',
								answer:'脸黑!'
							}
						]
					},
					{
						typename:'我要投诉',
						icon:'fa fa-pencil-square-o',
						question:[
							{
								title:'我要投诉餐厅/骑手怎么投诉？',
								answer:'没渠道的，放弃吧！'
							},
							{
								title:'我收到的餐品有异物/不卫生怎么办？',
								answer:'自己选的，能怪谁!'
							}
						]
					},
				]
			}
		},
	    filters: {
	        answer_substr: (value)=>{
	            return value.length>21?value.substr(0,21)+'...':value;
	        }
	    },	
		methods:{

		}
   }
</script>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
   margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#index{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 1rem;
}
.title{
	@include gloal;
	padding-top:0rem;
	padding-bottom: 0.3rem;
	@include font(1rem,1.1rem,#666);
}
.lis{
	margin-bottom: 0.7rem;
	width: 30rem;
	background-color: #fff;
	.left{
		width: 7rem;
		height: 6rem;
		border: 1px solid #eee;
		float: left;
		.icon{
			margin-top: 1.2rem;
			@include font(1.8rem,1.6rem,#009EFF);

		}
		.text{
			@include font(1rem,1.8rem,#333);
		}
	}
	.right{
		float: left;
		width: 22.7rem;
		height: 6rem;
		.dd{
			border: 1px solid #eee;
			padding-left: 0.7rem;
			height: 3rem;
			width: 22rem;
			text-align: left;;
			@include font(1rem,2.9rem,#666);
		}
	}
}
</style>
