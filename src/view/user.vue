<template>
	<div id="user">
		<mt-header title="我的" fixed>
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<div style="height: 2.5rem;width: 30rem"></div>
		<div class="overview">
				<div class="content" @click="go_to_detail">
					<div class="photo">
						<img :src="user_data.photo== undefined ||user_data.photo==''?'/static/images/default.png':user_data.photo" alt="">
					</div>
					<div class="txt">
						<div class="left">
							<p class="p1"><span v-if="$store.state.userinfo">{{ $store.state.userinfo.username | strHidden(2,2)}}</span><span v-if="!$store.state.userinfo"><router-link :to="{path:'/user/register'}">登录/注册</router-link></span></p>
							<p class="p2"><i class="fa fa-mobile" aria-hidden="true" style="font-size: 1.1rem"></i>&nbsp;&nbsp;<span v-if="!$store.state.userinfo">登录后享受更多特权</span><span v-if="$store.state.userinfo">{{ $store.state.userinfo.moblie | strHidden(3,4)}}</span></p>
						</div>
						<div class="right">
							<i class="fa fa-chevron-right" aria-hidden="true"></i>
						</div>
						<div style="clear: both;"></div>	
					</div>
					<div style="clear: left;"></div>
				</div>
		</div>

		<div class="activity">

				<div class="lab">
					<div class="fon1">
						<div v-if="!$store.state.userinfo" style="width:2rem;height:2rem;background: #FF5F3E;border-radius: 50%;margin-bottom: 0.5rem;"><i class="fa fa-envelope-o" aria-hidden="true"  style="color:#fff;line-height: 2rem;"></i></div>
						<router-link :to="{path:'/favourable/detail'}">
							<div v-if="$store.state.userinfo"><span class="bold">{{ packetData.length }}</span><span class="no_bold">个</span></div>
						</router-link>
					</div>
					<p class="fon2">优惠</p>
				</div>


				<div class="lab">
					<div class="fon1" v-if="!$store.state.userinfo">
						<div  style="width:2rem;height:2rem;background: #6AC20B;border-radius: 50%;margin-bottom: 0.5rem;"><i class="fa fa-calculator" aria-hidden="true"  style="color:#fff;line-height: 2rem;"></i></div>
					</div>
					<router-link :to="{path:'/integralshop/user'}"><div class="fon1" v-if="$store.state.userinfo">
						<div><span class="bold">{{ $store.state.score }}</span><span class="no_bold">分</span></div>
					</div></router-link>

					<p class="fon2">积分</p>				
				</div>
	
		</div>
		<div class="js" style="height: 0.7rem"></div>
		<div class="navigation">
			<router-link :to="{path:'/address/detail',query:{uid:1}}">
				<div class="nav_lis">
					<span style="float: left;"><i class="fa fa-map-marker" aria-hidden="true" style="color:#4AA5F0"></i>我的地址</span>
					<span style="float: right;font-size: 1.1rem;color: #999;"><i class="fa fa-chevron-right" aria-hidden="true" style="margin-right: 0px"></i></span>
				</div>
			</router-link>
			<div class="js" style="height: 0.6rem"></div>
			<div class="nav_lis" @click="integralshop">
				<span style="float: left;"><i class="fa fa-shopping-bag" aria-hidden="true" style="color:#94D94A"></i></i>积分商城</span>
				<span style="float: right;font-size: 1.1rem;color: #999;"><i class="fa fa-chevron-right" aria-hidden="true" style="margin-right: 0px"></i></span>
			</div>
			<div class="js" style="height: 0.6rem"></div>
			<router-link :to="{path:'/help/index',query:{uid:1}}">
				<div class="nav_lis" style="border-bottom: 0">
					<span style="float: left;"><i class="fa fa-user-circle" aria-hidden="true" style="color:#4AA5F0"></i></i>我的客服</span>
					<span style="float: right;font-size: 1.1rem;color: #999;"><i class="fa fa-chevron-right" aria-hidden="true" style="margin-right: 0px"></i></span>
				</div>
			</router-link>
			<div class="nav_lis" @click="appupload">
				<span style="float: left;"><i class="fa fa-diamond" aria-hidden="true" style="color:#4AA5F0"></i></i>下载淘点APP</span>
				<span style="float: right;font-size: 1.1rem;color: #999;"><i class="fa fa-chevron-right" aria-hidden="true" style="margin-right: 0px"></i></span>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			user_data:{a:'2333'},
			url:'',
			hb:false,
			packetData:[],
			packetData_num:0
		}
	},
	created:function(){
		const self=this;
		self.url=self.$config.url;
		//获取用户信息
		self.$store.dispatch('getUserinfo').then(() => {
			self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
				self.get_red_info();
			})	
		})	
	},
	methods:{
		back(){
			return;	
		},
		integralshop(){
			if(this.$store.state.userinfo){
				this.$router.push({path:'/integralshop'});
			}else{
				this.$router.push({path:'/user/register'});
			}
		},
		appupload(){
			this.$config.throw_notice('APP暂未开发完成');
		},
		go_to_detail(){

			if(this.$store.state.userinfo){

				this.$router.push({path:'/user/detail'});
			}else{
				this.$router.push({path:'/user/register'});
			}

		},
		//获取红包信息
		get_red_info(){
			const self =this;
			let url = self.url+'discount/getRedInfo/'+self.$store.state.userinfo.id;
		       let success=function(res){
		       	if(res.data.code == 200){
		       		self.packetData=res.data.data;
		       	}
		       }
		       let error = function(res){
		         self.$config.throw_notice('网络异常');
		       }
		       self.$config.apirequest(url,'get',[],success,error);  				
		}
	}
}
</script>	
<style lang="scss" scoped>
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
#user{
	width: 30rem;
}
.overview{
	@include gloal;
	background-color:#26A2FF;
	padding-bottom: 2rem;
	.content{
		width: 100%;
		margin-top:1rem;
		.photo{
			width: 5rem;
			height: 5rem;
			float: left;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.txt{
			width: 21rem;
			margin-left: 1rem;
			float: left;
			margin-top: 0.4rem;
			height: 4.6rem;
			.left{
				height: 100%;
				float: left;
				.p1{
					@include font(1.6rem,2.2rem,#fff);
					font-weight: bold;
					a{
						color:#fff;
					}
				}
				.p2{
					@include font(0.95rem,2.2rem,#fff);					
				}
			}
			.right{
				height:100%;
				float: right;
				@include font(1.2rem,4.6rem,#fff);
				i{
					margin-top: 1.5rem;
				}
			}
		}
	}
}
.activity{
	width: 30rem;
	background-color: #fff;
	height: 6rem;
	padding: 1rem 0;
	.lab{
		width:49.6%;
		float: left;
		height: 6rem;
		border-right: 1px solid #eee;

		.fon1{
			margin-top: 1rem;
			display: flex;
			justify-content: center;

			.bold{
				@include font(2.2rem,2.2rem,#FF5F3E);
				font-weight: bold;
			}
			.no_bold{
				@include font(1.2rem,2.2rem,#FF5F3E);
			}
		}
		.fon2{
			@include font(1.2rem,1.7rem,#666);
			font-weight: bold;
		}
	}
}
.js{
	width: 100%;
	height: 0.7rem;
	clear: left;
}
.navigation{
	width: 30rem;
	.nav_lis{
		@include gloal;
		border: 1px solid #ddd;
		height: 2.3rem;
		background-color: #fff;
		@include font(1.4rem,2.3rem,#000);
		i{
			margin-right: 1rem;
			width:1.4rem;
		}
	}
}
</style>