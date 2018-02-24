<template>
	<div id="detail">
		<div class="base_info">
			<div class="photo">
				<div class="img">
					<img :src="order_data.shopimg" alt="">
				</div>
			</div>
			<div class="fon1">
				订单{{ order_data.order_status }}&nbsp;>
			</div>
			<div class="fon2">
				感谢你对{{ $config.webname }}的信任，期待再次光临
			</div>
			<div class="btn">
				<div class="content">
					<div class="nr" v-if="order_data.order_status=='待评价'">	
						<mt-button type="primary" style="width: 9rem;margin-right: 1rem;">在下一单</mt-button>
						<mt-button type="danger" style="width: 9rem;">评价得{{ order_data.total_price*10 }}积分</mt-button>
					</div>
					<div class="nr" v-if="order_data.order_status=='待收货'">	
						<mt-button type="primary" style="width: 9rem;margin-right: 1rem;">确认收货</mt-button>
					</div>
					<div class="nr" v-if="order_data.order_status=='待支付'">	
						<mt-button type="primary" style="width: 9rem;margin-right: 1rem;">去支付</mt-button>
					</div>
				</div>
			</div>

		</div>
		<div class="js"></div>
		<div class="price_info">
			<router-link :to="{path:'/shop',query:{id:order_data.shop_id }}">
				<div class="shopname">
					<img :src="order_data.shopimg" alt="">
					<span class="name">{{ order_data.shopname }}</span>
					<span class="icon" style="float: right;"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>	
					<div style="clear: both;"></div>
				</div>
			</router-link>
			<div class="info">
				<div class="lis" v-for="(item,index) in order_data.order_detail">
					<span class="icon" v-if="item.icon">{{ item.icon }}</span>
					<span class="name">{{ item.food_name }}</span>
					<span class="price">￥{{ (parseFloat(item.price)+parseFloat(item.chf))*item.food_num }}</span>
					<span class="num">x{{ item.food_num }}</span>
					<div style="clear: both;"></div>
				</div>
				<div class="lis" >

					<span class="name">配送费</span>
					<span class="price">￥{{ order_data.psf }}</span>
					<span class="num">x1</span>
					<div style="clear: both;"></div>
				</div>
				<div class="lis" >

					<span class="name">优惠</span>
					<span class="price fontorange">￥2</span>
					<span class="num">x1</span>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="total_price">
			    <span class="fon2">￥{{ order_data.total_price }}</span>
				<span class="fon1">实付</span>
				<div style="clear: right;"></div>
			</div>
		</div>
		<div class="js"></div>
		<div class="method">
			<div class="title">配送信息</div>
			<div class="content">
				<ul>
					<li>
						<span class="notice">送达时间:</span>
						<div class="main">
							<p>尽快送达 [ {{ order_data.sh_time }} ]</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
					<li>
						<span class="notice">送货地址:</span>
						<div class="main">
							<p>{{ order_data.sh_person }}{{ order_data.sh_sex }}</p>
							<p>{{ order_data.sh_moblie }}</p>
							<p>{{ order_data.sh_address }}</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
					<li>
						<span class="notice">配送方式:</span>
						<div class="main">
							<p>{{ order_data.DC_method}}</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="js"></div>
		<div class="method">
			<div class="title">订单信息</div>
			<div class="content">
				<ul>
					<li>
						<span class="notice">订单号:</span>
						<div class="main">
							<p>{{ order_data.order_number }}</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
					<li>
						<span class="notice">支付方式:</span>
						<div class="main">
							<p>{{ order_data.pay_method }}</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
					<li>
						<span class="notice">下单时间:</span>
						<div class="main">
							<p>{{ order_data.create_time }}</p>
						</div>
						<div style="clear: left;height: 1rem"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="js"></div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				data:{
					shop:{
						id:1,
						name:'饭优美(火炬大道店)'
					},
					price_info:{
						add:[
							{
								name:'御用肉燥饭+鸡排套餐',
								price:37.9,
								num:1
							},
							{
								name:'餐盒费',
								price:2.9,
								num:1
							},
							{
								name:'配送费',
								price:3,
								num:1
							}
						],
						minus:[
							{
								name:'在线支付立减优惠',
								price:27,
								icon:'满',
								icon_className:'red',
							},
							{
								name:'饮料一份',
								price:0,
								icon:'赠',
								icon_className:'green',
							},
							{
								name:'超级会员专享',
								price:27,
								icon:'红',
								icon_className:'orange',
							}
						]
					}
				},
				order_number:'',
				order_data:''
			}
		},
		created:function(){
			const self=this;
			self.order_number = self.$route.query.order_number;
			self.get_order_info();
		},
		methods:{
			//获取订单信息
			get_order_info(){
				const self=this;
				self.$store.dispatch('getOrderinfo',self.order_number).then(function(){
					self.order_data=self.$store.state.order_data;

				},function(){
					self.$router.push({path:'/user/register'});
				});	
			},
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
#detail{
	width: 30rem;
}
.js{
	width: 100%;
	height: 1rem;
	clear: left;
}
.base_info{
	@include gloal;
	background: #fff;
	padding-bottom: 0;
	.photo{
		width: 100%;
		margin-bottom: 1rem;
		.img{
			height: 6rem;
			width: 6rem;
			margin:0 auto;
			img{
				width: 100%;
				height: 100%;

			}
		}
	}
	.fon1{
		width: 100%;
		text-align: center;
		margin-bottom: 0.2rem;
		@include font(1.5rem,2rem,#000);
		font-weight: bolder;
	}
	.fon2{
		@extend .fon1;
		@include font(0.95rem,2rem,#999);
		font-weight: normal;		
	}
	.btn{
		width: 100%;
		margin-top: 0.5rem;
		.content{
			width: 19rem;
			margin:0 auto;
			height: 4rem;
			.nr{
				display: flex;
				justify-content: center;				
			}

		}
	}
}
.price_info{
	@include gloal;
	background: #fff;
	.shopname{
		width:100%;
		height: 3rem;
		@include font(1.2rem,2.9rem,#666);
		img{
			width: 2rem;
			height: 2rem;
			margin-top: 0.5rem;
			margin-right: 0.5rem;
			float: left;
		}
	}
	.info{
		width: 100%;
		border-bottom:2px solid #ddd;
		border-top:2px solid #ddd;
		padding: 0.2rem 0;
		@include font(1rem,2.9rem,#666);
		.lis{
			border-bottom:1px solid #ddd;

			height: 3rem;
			.icon{
				float: left;
				@include font(1rem,1rem,#666);
				padding: 0.3rem;
				color:#fff;
				margin-right: 0.5rem;
				margin-top: 0.6rem;
			}
			.red{
				background-color:#F07373;				
			}
			.green{
				background-color:#3CC791;
			}
			.orange{
				background-color:#FF7239;
			}
			.fontorange{
				color:orange;
			}
			.price{
				float: right;
				width: 3rem;
				text-align: right;
				margin-right: 0.3rem;
			}
			.name{
				float: left;
			}		
			.num{
				float: right;
				width: 3.5rem;
				text-align: left;
			}
		}

	}
	.total_price{
		margin-top: 1rem;
		widows: 100%;

		.fon1{
			float: right;
			@include font(1.1rem,2.2rem,#000);
		}
		.fon2{
			float: right;
			@include font(1.4rem,2.2rem,#000);
			font-weight: bold;			
		}
	}
}
.method{
	width: 100%;
	background: #fff;
	text-align: left;
	.title{
		width: 28rem;
		padding: 0 1rem;
		height: 3rem;
		border-bottom:1px solid #ddd;
		@include font(1.3rem,2.9rem,#333);
	}
	.content{
		width: 28rem;
		padding: 0 1rem;
		margin-top: 1rem;
		ul{
			width: 100%;
			li{
				width: 100%;

				.notice{
					@include font(1.15rem,2rem,#333);
					float: left;
					margin-right: 1rem;
				}
				.main{
					float: left;
					width: 21.5rem;
					p{
						@include font(1.15rem,2rem,#333);
					}
				}
			}
		}
	}
}
</style>
