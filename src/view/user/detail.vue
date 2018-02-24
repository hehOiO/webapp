<template>
	<div id="detail">
		<div class="base_info">
			<div class="photo">
				<span class="left">
					头像
				</span>
				<span class="right">
					<img src="/static/images/default.png" alt="">
					<i class="fa fa-chevron-right" aria-hidden="true" ></i>
				</span>
				<div style="clear: both;"></div>
			</div>
			<div class="username">
				<span class="left">
					用户名
				</span>
				<span class="right">
					{{ $store.state.userinfo.username | strHidden(3,3) }}
				</span>
				<div style="clear: both;"></div>
			</div>

		</div>
		<div class="js"></div>
		<div class="bt">
			账号绑定
		</div>
		<router-link :to="{path:'/user/mobile',query:{uid:'1'}}">
			<div class="lis">
				<span class="left">
					<i class="fa fa-mobile" aria-hidden="true" style="font-size: 1.6rem;color: #0097FF;margin-right: 0.8rem"></i>手机
				</span>
				<span class="right">
					{{ $store.state.userinfo.moblie | strHidden(3,4) }}
				</span>	
				<div style="clear: both;"></div>			
			</div>
		</router-link>
		<div class="js"></div>
		<div class="bt">
			安全设置
		</div>
		<router-link :to="{path:'/user/password',query:{uid:'1'}}">
			<div class="lis">
					<span class="left">
						登录密码
					</span>
					<span class="right">
						<span style="color:#0097FF">修改</span><i class="fa fa-chevron-right" aria-hidden="true" ></i>
					</span>	
					<div style="clear: both;"></div>			
			</div>
		</router-link>
		<div class="js" style="height: 1rem"></div>
		<div class="lis">
			<p class="exit" @click="login_out">退出登录</p>		
		</div>		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				user_data:{
					username:'象山吴彦祖',
					photo:'',
					mobile:'18205859672'
				}
			}
		},
		created:function(){
			const self = this;
			//获取用户信息
			self.$store.dispatch('getUserinfo').then(function() {

			}, function() {
				self.$router.push({path:'/menu_user'});
			});
		},
		methods:{
			login_out(){
				const self = this;
				self.$cookie.delete('userID');
				window.location.reload();
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
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#detail{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 0.7rem;
}
.base_info{
	@include gloal;
	background-color: #fff;
	padding-bottom: 0px;
	.photo{
		width: 100%;
		height: 4.5rem;
		border-bottom: 1px solid #eee;
		padding-bottom:0.5rem;
		.left{
			float: left;
			@include font(1.3rem,4.5rem,#000);
			font-weight: bold;
		}
		.right{
			float: right;

			img{
				width: 3.5rem;
				height: 3.5rem;
				margin-top: 0.5rem;
				float: left;

			}
			i{
				margin-top: 2rem;
				margin-left: 0.5rem;
				float: right;
				color:#999;
			}
		}
	}
	.username{
		width: 100%;
		height: 3rem;
		border-bottom: 1px solid #eee;
		padding-bottom:0.5rem;
		.left{
			float: left;
			@include font(1.3rem,3rem,#000);
			font-weight: bold;
		}
		.right{
			float: right;
			@include font(1.2rem,3rem,#666);
		}
	}
}
.bt{
	width: 28rem;
	padding: 0 1rem;
	text-align: left;
	@include font(1rem,2.5rem,#999);	
}	
.lis{
	@include gloal;
	background-color: #fff;
	.left{
		float: left;
		@include font(1.3rem,1.5rem,#000);
		font-weight: bold;
	}
	.right{
		float: right;
		@include font(1.2rem,1.5rem,#666);

		i{
			color:#999;
			margin-left: 0.6rem;
		}
	}
	.exit{
		@include font(1.3rem,1.8rem,#FF5339);
		text-align: center;
		width: 100%;
		font-weight: bold;
	}
}

</style>