<template>
	<div id="recommend">
		<div class="banner">
			<img src="/static/images/banner_re.png" alt="">
		</div>
		<rescroll></rescroll>
		<div class="invite">
			<div class="p1">
				<div class="body">
					<img src="/static/images/blue_yaoqing.png" alt="">
					<h2>最高可额外多得125元现金</h2>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="p2">
				<div class="body">
					<div class="mode">现金</div>
					<div class="moeny"><span class="symbol">￥</span><span class="price">125</span></div>
					<div style="clear: left;"></div>
				</div>
			</div>
			<div class="p3">
				<div class="body">
					邀请人数达2人，可额外获得5元<br>
					邀请人数达5人，可额外获得20元<br>
					邀请人数达50人，可额外获得100元
				</div>
			</div>
			<div class="p4">
				<div class="body">
					<p class="blue_font">每邀请1位好友下首单 可得<em>5元</em></p>
					<div class="btn">
						<button @click="share">立即邀请</button>
					</div>
					<router-link :to="{path:'/activity/recommend/rule'}"><p class="yellow_font">邀请规则>>&nbsp;<i class="fa fa-question-circle-o" aria-hidden="true"></i></p></router-link>
				</div>
			</div>
		</div>
		<div class="lis_temp">
			<div class="title">
				我的收益
			</div>
			<div class="body">
				<div class="item">
					<p class="fon1"><span style="color: #F55C33">0</span>元</p>
					<p class="fon2">预计收益</p>
				</div>
				<div class="item">
					<p class="fon1"><span style="color: #F55C33">0</span>元</p>
					<p class="fon2">实际收益</p>
				</div>
				<div class="item">
					<p class="fon1"><span style="color: #F55C33">0</span>人</p>
					<p class="fon2">成功邀请</p>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="bottom">再成功邀请2人，可得额外奖励<em style="color:#F55C33">5元</em></div>
		</div>
		<div class="lis_temp">
			<div class="title">
				收益明细
			</div>
			<div class="body">
				<p style="width: 27rem">暂时为空</p>
			</div>
		</div>
		<alertmodal :visible="re_visible" @payClose="reClose" :title="re_title">
			<share></share>
		</alertmodal>
	</div>

</template>
<script>
import alertmodal from '../../../components/private/alert_modal'
import share from '../../../components/private/share'
import rescroll from '../../../components/private/rescroll'
	export default{
		data(){
			return{
				re_visible:false,
				re_title:'去邀请好友'
			}
		},
		created:function(){

		},
		components:{
			alertmodal,
			share,
			rescroll
		},
		methods:{
			reClose(value){
				this.re_visible=value;
			},
			share(){
				this.re_visible=true;
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
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#recommend{
	width: 30rem;
}
.banner{
	width: 30rem;
	height: 20rem;
	img{
		width: 100%;
		height: 100%;
	}
}

.invite{
	width: 30rem;
	background-color: #F9F9F9;
	padding: 1rem 0;
	position: relative;
	top:-3rem;
	.p1{
		width:30rem;
		margin-top: 2rem;
		.body{
			width: 14rem;
			margin:0 auto;
			img{
				width: 14rem;
			}
			h2{
				@include font(1.2rem,2rem,#999);	
			}
		}
	}
	.p2{
		width:30rem;
		margin-top:1.5rem;
		.body{
			width: 14rem;
			margin:0 auto;
			height: 6rem;
			background:url('/static/images/duihuaquan.png') no-repeat;
			background-size: 100%;
			.mode{
				float: left;
				width: 1.8rem;
				@include font(1.8rem,2rem,#F56038);
				margin-left: 0.6rem;
				margin-top: 0.8rem;
			}
			.moeny{
				float: left;
				margin-left: 1.9rem;
				margin-top: 0.8rem;
				.symbol{
					@include font(1.6rem,4.2rem,#F56038);
				}
				.price{
					@include font(4rem,4.2rem,#F56038);
					font-weight: bolder;
				}				
			}
		}
	}
	.p3{
		@extend .p1;
		margin-top: 1.5rem;
		.body{
			@include font(0.9rem,1.4rem,#999);
		}
	}
	.p4{
		@extend .p3;
		.body{
			width: 100%;
			.blue_font{
				@include font(1.1rem,1.4rem,#1D3F79);
				margin-bottom: 1rem;
				em{
					color:#F55C33;
				}
			}
			.btn{
				width: 22rem;
				height:3.5rem;
				margin:0 auto;
				margin-bottom: 1rem;
				button{
					width: 100%;
					height: 100%;
					@include font(1.6rem,3.4rem,#fff);
					text-align: center;
					border: 0;
					background-color: #E2C561;
					border-radius: 2rem;
				}
				
			}
			.yellow_font{
				@include font(0.9rem,1.4rem,#E2C561);
			}
		}
	}
}
.lis_temp{
	position: relative;
	top:-3rem;
	width: 30rem;
	background-color: #fff;
	.title{
		@include gloal;
		padding:0.5rem 1rem;
		@include font(1.3rem,1.5rem,#333);	
		margin-left: 0.6rem;
	}
	.title:before{
	    content: "";
	    position: absolute;
	    top: 0.493333rem;
	    left: 0.7rem;
	    width: 0.3rem;
	    height: 1.4rem;
	    background-color: #cfaf68;
	    border-radius: 0.2rem;		
	}
	.body{
		width: 100%;
		padding: 1.5rem 1rem;

		.item{
			width: 9rem;
			float: left;
			text-align: center;
			.fon1{
				@include font(1rem,1.4rem,#333);				
			}
			.fon2{
				@include font(0.9rem,1.4rem,#666);
			}	
		}
	}
	.bottom{
		width: 100%;
		@include font(1.1rem,2rem,#333);
		padding-bottom: 1rem;
	}
}

</style>