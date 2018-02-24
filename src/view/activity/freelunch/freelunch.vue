<template>
	<div id="freelunch">
		<div class="navigation">
			<ul>
				<li ><span :class="{btmline:navBarOf == 0}" @click="card">霸王餐</span></li>
				<li ><span :class="{btmline:navBarOf == 1}" @click="cardplus">霸王餐plus</span><span class="hot">hot</span></li>
				<li class="voucher" @click="go_to_my"><i class="fa fa-money" aria-hidden="true" ></i><span style="border: 0">我的餐券</span></li>
			</ul>
		</div>
		<div class="pic">
			<div class="bottom">
				<p class="p1">每满30人次，即抽取1人获得 <span>20元无门槛红包</span></p>
				<div class="progress">
					<div class="out"></div>
					<div class="in" :style="{width:(30-activity_data.length)/30*100+'%'}" ></div>
				</div>
				<p class="p2"><span>总需人次：30人</span>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;<span>剩余人次：{{ 30-activity_data.length}}人</span></p>

			</div>

		</div>
		<div class="period">
			您没有参与本期活动，立即参与领红包吧！
		</div>
		<div class="air">
			<div class="left">
				<p class="top">往期幸运星</p>
				<p class="bottom">中奖直播</p>
			</div>
			<div class="right">
				<scroll></scroll>
				<div class="icon"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
				<div style="clear: both;"></div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="js"></div>
		<div class="person">
			<div class="title">
				<span style="float: left;">本期参与人</span>
				<span class="date">2017-10-09 13:38:57 开始</span>
				<div style="clear: both;"></div>
			</div>
				
			<div class="body">
				<ul>
					<li v-for="(item,index) in activity_data">
						<img :src="item.photo" alt="">
						<div class="text">
							<p class="name">{{ item.name }}</p>
							<p class="date">{{ item.date }}</p>
						</div>
						<div style="clear: both;"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="js" style="height: 4rem;"></div>
		<div class="btn">
			<button>立即参与</button>
		</div>
	</div>
</template>
<script>
	import scroll from '../../../components/private/scroll'
	export default{
		data(){
			return{
				navBarOf:-1,
				activity_data:[
					{
						name:'大鸡棚',
						photo:'/static/images/default.png',
						date:'2017-10-09 13:38:55.883',
						moblie:'13511115555'
					},
					{
						name:'大挺狗',
						photo:'/static/images/default.png',
						date:'2017-10-09 12:38:55.883',
						moblie:'18511115555'
					},
					{
						name:'听儿子',
						photo:'/static/images/default.png',
						date:'2017-10-09 13:39:55.883',
						moblie:'16521115455'
					},
					{
						name:'土逼',
						photo:'/static/images/default.png',
						date:'2017-10-09 13:34:55.883',
						moblie:'16511215555'
					},
					{
						name:'大土鳖',
						photo:'/static/images/default.png',
						date:'2017-10-09 13:32:55.883',
						moblie:'13511113555'
					}
				]
			}
		},
		created:function(){
		},
		components:{
			scroll
		},
		methods:{
			//跳转到我的餐券
			go_to_my(){
				this.$router.push({path:'/activity/freelunch/my'});
			},
			card(){
				this.navBarOf=0;
			},
			cardplus(){
				this.navBarOf=1;
			}
		}
   }
</script>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
    margin-top: -1px;
    background-color: #fff;
}
$top-background:#01AAED;
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}	
#freelunch{
	width: 30rem;
}	
.js{
	clear:left;
	height: 1rem;
	width: 30rem;
}
.navigation{
	width: 30rem;
	height: 3.5rem;
	background: #008CFF;
	margin-top:-1px;
	ul{
		width: 26rem;
		padding: 1rem 0rem 0rem 1.5rem;
		.voucher{
			float: right;
			text-align: right;
			margin-right: -1.5rem;
			width:7rem;
			border-left:2px dashed #fff;
		}
		li{
			padding: 0 0.5rem;
			margin-right: 0.8rem;
			float: left;
			position: relative;

			span{
				@include font(1.15rem,2rem,#fff);
				padding-bottom: 0.3rem;
				height: 2.5rem;
			}
			.btmline{
				border-bottom: 2px solid #fff;
				font-weight: bold;
			}
			i{
				font-size: 1.3rem;
				color:#fff;
				margin-right: 0.4rem;

			}
			.hot{
				position: absolute;
			    left: 5rem;
			    top: -0.6rem;
			    height: 1rem;
			    line-height: 1rem;
			    white-space: nowrap;
			    border-radius: 0.55rem;
			    padding: 0 .16rem;
			    font-size: 0.75rem;
			    font-weight: 400;
			    color: #fff;
			    background-color: #ff5339;
			}
			.hot:after {
			    content: "";
			    position: absolute;
			    left: 20%;
			    top: 96%;
			    width: 0;
			    height: 0;
			    border-style: solid;
			    border-width: 0.45rem 0.45rem 0 0;
			    border-color: #fc692a transparent transparent;
			}
		}
	}
}
.pic{
	width: 30rem;
	height: 20rem;
	background:url('/static/images/freelunch.png');
	background-repeat: no-repeat;
	background-size: 100%;
	position: relative;
	.bottom{
		width: 100%;
		position:absolute;
		bottom:0;
		padding:1rem 0rem;
		height:4rem;
		background: rgba(0,0,0,0.2);
		.p1{
			width: 100%;
			@include font(0.95rem,1.5rem,#fff);
			position: relative;
		}
		.progress{
			width: 80%;
			position: relative;
			margin:0.4rem 0;
			left: 10%;
			top:0;
			.out{
				width:100%;
				margin:0 auto;
				background: #fff;
				height:0.5rem;
				border-radius: 0.3rem;
				background-color: rgba(0,0,0,0.7);
				top:0;
				position: absolute;
			}
			.in{
				@extend .out;
				background: linear-gradient(90deg,#efab0b,#fffbba);
			}
		}
		.p2{
			position: relative;
			top:0.8rem;
			width: 100%;
			@include font(1.1rem,1.5rem,#fff)
			font-weight: bold;
		}
	}
}
.period{
	width: 28rem;
	margin:1rem;
	background-color: #fff;
	height: 2rem;
	padding: 1rem 0;
	@include font(1.2rem,2rem,#999)
}
.air{
	@include gloal;
	.left{
		float: left;
		height: 4rem;
		padding-right: 1rem;
		text-align: center;
		border-right: 1px solid #eee;
		.top{
			@include font(1.3rem,2rem,#FF6225);
			height: 2.2rem;	
			border-bottom: 2px solid #FF6225;
			font-weight: bold;		
		}
		.bottom{
			@include font(1.1rem,2rem,#FF6225);
		}
	}

	.right{
		float: left;
		margin-left: 1rem;
		width: 19rem;
		height: 2.5rem;
		padding: 0.75rem 0;

		.icon{
			float: right;
			height: 4rem;
			i{
				font-size: 1.4rem;
				line-height: 3rem;
				color: #999;
			}
		}
	}
}
.person{
	@include gloal;
	.title{
		width:100%;
		@include font(1.2rem,2rem,#000);
		padding-bottom: 0.5rem;
		border-bottom:1px solid #eee;
		.date{
			float: right;
			@include font(1.2rem,2rem,#999);
		}
	}
	.body{
		width: 100%;
		ul{
			li{
				width: 100%;
				height: 2.5rem;
				padding: 1rem 0;
				border-bottom: 1px solid #eee;
				img{
					float: left;
					height: 2.5rem;
					width: 2.5rem;
					margin-right: 1.2rem;
				}
				.text{
					float: left;
					.name{
						@include font(1.1rem,1.4rem,#000);
					}
					.date{
						@include font(1rem,1.4rem,#999);
					}
				}
			}
		}
	}
}
.btn{
	padding: 0.5rem;
	width: 29rem;
	position: fixed;
	bottom: 0px;
	height: 3.5rem;
	background-color: #fff;
	button{
		width: 29rem;
		height: 3.5rem;
		background-color: #2395FF;
		@include font(1.3rem,3.4rem,#fff);
		border:0;
		border-radius: 0.5rem;
	}
}
</style>
