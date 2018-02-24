<template>
	<div id="discover">
		<mt-header title="发现" fixed>
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<div style="height: 2.5rem;width: 30rem"></div>
		<div class="lab_select">

				<div class="lis" v-for="(item,index) in lab_select_data">
					<router-link :to="{path:item.link}">
						<div class="content">
							<div class="txt">
								<p class="fon1" :style="{'color':item.color}">{{ item.name }}</p>
								<p class="fon2">{{ item.summary }}</p>
							</div>
							<div class="icon">
								<img :src="item.img" alt="">
							</div>
						</div>
					</router-link>
				</div>

			<div style="clear: left;width: 100%"></div>
		</div>
		<div class="js"></div>
		<router-link :to="{path:'/activity/freelunch'}">
			<div class="logo">
				<img src="/static/images/27-1.jpg" alt="">
			</div>
		</router-link>
		<div class="js" style="height: 0.9rem"></div>
		<div class="ac_lis" v-for="(item,index) in recomment_data">
			<div class="title">
				<p class="p1"><i class="fa fa-long-arrow-right" aria-hidden="true"></i><span style="color:#F13939"><i :class="item.icon" aria-hidden="true"></i></span>&nbsp;{{ item.typename }}<i class="fa fa-long-arrow-left" aria-hidden="true"></i></p>
				<p class="p2">{{ item.summary }}</p>
			</div>
			<div class="body_img">
				<div class="img" v-for="(lis,key) in item.shop">
					<img :src="lis.img" alt="">
					<div class="txt">
						<p class="pic_txt1">{{ lis.name }}</p>
						<p class="pic_txt2">￥{{ lis.price }}</p>
					</div>
				</div>
				<div style="clear: left;"></div>
			</div>
			<div class="more">查看更多&nbsp;&nbsp;></div>

		</div>

	</div>
</template>
<script>
export default {
	data(){
		return{
			lab_select_data:[
				{
					name:'积分商城',
					summary:'0元好物在这里',
					color:'#FF9700',
					img:'/static/images/upload/icon/icon-1.jpg',
					link:'/integralshop/user'
				},
				{
					name:'必吃爆料',
					summary:'最夯外卖指南',
					color:'#F5785D',
					img:'/static/images/upload/icon/icon-2.jpg',
					link:'/activity/show'					
				},
				{
					name:'推荐有奖',
					summary:'五元现金拿不停',
					color:'#1BA9E1',
					img:'/static/images/upload/icon/icon-3.jpg',
					link:'/activity/recommend'				
				},
				{
					name:'周边优惠',
					summary:'领取口碑好礼',
					color:'#ED6660',
					img:'/static/images/upload/icon/icon-4.jpg',
					link:'/activity/discount'					
				}
			],
			recomment_data:[
				{
					typename:'美食热推',
					icon:'fa fa-thumbs-o-up',
					summary:'你的口味，我都懂得',
					shop:[
						{
							name:'水蒸蛋',
							price:'10',
							img:'/static/images/upload/2017_9_27_1.jpg'
						},
						{
							name:'午餐肉',
							price:'20',
							img:'/static/images/upload/2017_9_27_2.jpg'
						},
						{
							name:'牛肉汤',
							price:'24',
							img:'/static/images/upload/2017_9_27_3.jpg'
						}						
					]
				},
				{
					typename:'天天特价',
					icon:'fa fa-tag',
					summary:'特价商品，一网打尽',
					shop:[
						{
							name:'水蒸蛋2',
							price:'11',
							img:'/static/images/upload/2017_9_27_1.jpg'
						},
						{
							name:'午餐肉2',
							price:'21',
							img:'/static/images/upload/2017_9_27_2.jpg'
						},
						{
							name:'牛肉汤2',
							price:'25',
							img:'/static/images/upload/2017_9_27_3.jpg'
						}						
					]
				}
			]
		}
	},
	methods:{
		back(){
			return;		
		}
	}
}
</script>
<style>
.mint-header{
	height: 3rem;
	font:1.5rem/2rem '微软雅黑';	
}
.mintui{
	font:1.5rem/2rem '微软雅黑';		
}
</style>
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
#discover{
	width: 30rem;
}
.js{
	width: 100%;
	height: 0.7rem;
	clear: left;
}
.lab_select{

	width: 100%;
	background-color: #fff;
	.lis{
		width: 12.8rem;
		padding: 1rem;
		border: 1px solid #F5F5F5;
		height: 5rem;
		float: left;
		background-color: #fff;
		.content{
			width: 100%;
			height: 100%;
			.txt{
				width: 60%;
				height: 100%;
				text-align: left;
				float: left;
				.fon1{
					height: 2.1rem;
					width: 100%;
					@include font(1.3rem,2.1rem,#FF9700);
				}
				.fon2{
					height: 2rem;
					width: 100%;
					@include font(0.95rem,2rem,#999);					
				}
			}
			.icon{
				width: 40%;
				float: left;
				img{
					width: 70%;

				}
			}
		}
	}
}
.logo{
	width: 100%;
	img{
		width: 100%;
	}
}
.ac_lis{
	@include gloal;
	margin-bottom: 1rem;
	background-color: #fff;
	.title{
		width: 100%;
		text-align: center;
		margin-bottom: 0.8rem;
		.p1{
			width: 100%;
			@include font(1.4rem,1.7rem,#000);
			font-weight: bold;
			i{
				font-size: 1.3rem;
			}
		}
		.p2{
			width: 100%;
			@include font(0.85rem,1.2rem,#999);

		}
	}
	.body_img{
		width: 100%;
		border-bottom: 1.5rem;
		.img{
			width: 31.1%;
			margin-right:0.625rem;
			float: left;
			img{
				width: 100%;
			}
			img:last-child{
				margin-right: 0;

			}
			.txt{
				width: 100%;
				.pic_txt1{
					width: 100%;
					@include font(1rem,2.2rem,#333);
				}
				.pic_txt2{
					width: 100%;
					@include font(0.9rem,1.8rem,#FF5E46);
				}
			}
		}
	}
	.more{
		width: 100%;
	 	text-align: center;
	 	@include font(1.05rem,3rem,#999);
	}
}
</style>