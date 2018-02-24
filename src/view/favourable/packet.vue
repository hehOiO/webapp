<template>
	<div id="packet">
			<div class="js"></div>
		<div class="lab">
			<div class="lis">
				<div class="body">
					<div class="txt">
						<p class="fon1">推荐有奖</p>
						<p class="fon2">5元现金拿不停</p>
					</div>
					<div class="img">
						<img src="/static/images/upload/packet-1.png" alt="">
					</div>
					<div style="clear: left;"></div>
				</div>
			</div>

			<div class="lis" style="float: right;">
				<div class="body">
					<div class="txt">
						<p class="fon1">免费霸王餐</p>
						<p class="fon2">领20元红包</p>
					</div>
					<div class="img">
						<img src="/static/images/upload/packet-1.png" alt="">
					</div>
					<div style="clear: left;"></div>
				</div>
			</div>
		</div>
		<div class="js"></div>
		<div class="section" v-for="(item,index) in packetData">
			<div class="top">
				<div class="nr_1">
					<p class="fon1"><span class="coin">￥</span><span class="int">{{ item.price }}</span><span class="decimal"></span></p>
					<p class="fon2">满{{ item.threshold }}元可用</p>
				</div>
				<div class="nr_2">
					<p class="title">{{ item.name}}</p>
					<p class="time">{{ item.create_time }}至</p>
					<p class="time">{{ item.end_time }}</p>
				</div>
				<div class="nr_3">
					<div class="today">有效期{{ item.limit_time }}日</div>
					<div class="btn">
						<div class="danger">立即使用</div>
					</div>
				</div>
				<div style="clear: left;"></div>
			</div>
			<div class="bottom" v-if="item.address_condtion">
				{{ item.address_condtion }}
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:[
			'packetData'
		],
		methods:{

		}
   }
</script>
<style scoped lang="scss">
@mixin global{
   width:28rem; 
   margin:0 1rem;
   background-color: #fff;	
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#packet{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 1rem;
}
.lab{
	@include global;
	.lis{
		width: 12.5rem;
		padding-left: 1rem;
		float: left;
		height: 5rem;
		background-color: #fff;
		box-shadow: 2px 2px 3px #ddd;
		.body{
			width: 100%;
			padding-top: 1rem;
			.txt{
				width: 50%;
				float: left;
				text-align: left;
				.fon1{
					width: 100%;
					@include font(1.1rem,1.5rem,#666);
					font-weight: 800;
				}
				.fon2{
					width: 100%;
					@include font(0.8rem,1.2rem,#999);
				}
			}
			.img{
				float: left;
				width: 45%;
				margin-top: -0.5rem;
				img{
					width:100%;
				}
			}
		}
	}
}
.section{
	@include global;
	box-shadow: 2px 2px 3px #ddd;
	padding: 1rem 0 0.5rem 0;
	margin-bottom: 1rem;
	.top{
		width: 100%;
		padding-bottom: 0.5rem;
		.nr_1{
			margin-top: 0.5rem;
			width: 8rem;
			height: 3rem;
			float: left;
			.fon1{
				text-align: center;
				@include font(1.2rem,1.8rem,#FF0025);
				.coin{
					font-size: 1rem;
				}
				.int{
					font-size: 2rem;
					font-weight: bold;
				}
				.decimal{
					font-size: 1.4rem;
				}
			}
			.fon2{
				@include font(0.8rem,1rem,#666);
			}
		}
		.nr_2{
			text-align: left;
			float: left;
			.title{
				@include font(1.1rem,1.7rem,#000);
				font-weight: bold;
			}
			.time{
				@include font(0.9rem,1.2rem,#000);
			}
			.moblie{
				@include font(0.9rem,1.2rem,#000);
			}
		}
		.nr_3{
			margin-top: 0.5rem;
			float: right;
			width: 6rem;
			text-align: center;
			.today{
				width: 100%;
				@include font(0.9rem,1.5rem,#FF0025);
			}
			.btn{
				width: 100%;
				.danger{
					margin:0 auto;
					width: 4rem;
					text-align: center;
					@include font(0.85rem,1.45rem,#FF0025);
					height: 1.5rem;

					font-weight: bold;
					border-radius: 0.75rem;
					border:1px solid #FF0025;
					background-color: #fff;
				}
			}
		}
	}
	.bottom{
		width: 26rem;
		height: 2.5rem;
		padding-left: 2rem;
		@include font(0.9rem,2.4rem,#666);
		text-align: left;
	}
}
</style>

