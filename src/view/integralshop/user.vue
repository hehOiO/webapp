<template>
	<div id="header">
		<div class="blue_frame">
			<div class="white_frame">
				<p class="fon1">
					<span class="left">当前积分</span>
					<router-link :to="{path:'/integralshop/text'}"><span class="right">积分说明</span></router-link>
					<div style="clear: both"></div>
				</p>
				<p class="fon2">
					<span class="left"><span class="big">{{ $store.state.score }}</span><span class="small">分</span></span>
					<div style="clear: both"></div>
				</p>
				<div class="btn">
					<mt-button type="danger" size='large' @click="go_to_shop">积分兑换商品</mt-button>
				</div>
			</div>
		</div>
		<div class="exchange">
			<button @click="go_to_history">兑换记录</button>
		</div>
		<div class="js"></div>
		<div class="history">
			<div class="title">最近30天积分记录</div>
			<div class="body">
				<ul>
					<li v-for="(item,index) in score_history">
						<span>{{ item.create_time }}</span>
						<span>{{ item.summary }}分</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				score_history:''
			}
		},
		created:function(){
			const self=this;
			self.url=self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
					self.get_score_history()
				})	
			}, function() {
			});				
		},
		methods:{
			go_to_shop(){
				this.$config.throw_notice('积分商城暂未开放');
			},
			get_score_history(){
				const self =this;
				let url = self.url+'Integralshop/getScoreHistory/'+self.$store.state.userinfo.id;
		        let success=function(res){
					if(res.data.code == 200){
						self.score_history=res.data.data;
					}else{
						self.$config.throw_notice('获取积分记录失败');
					}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  				
			},
			go_to_history(){
				this.$router.push({path:'/integralshop/exchangeHistory'});
			}
		}
   }
</script>
<style scoped lang="scss">
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#header{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 0.7rem;
}
.blue_frame{
	margin-top: -1px;
	width: 28.4rem;
	padding: 1.2rem 0.8rem 1.2rem 0.8rem;
	background-color: #26A2FF;
	.white_frame{
		background-color: #fff;
		width: 26.4rem;
		padding: 1rem 0.8rem;
		border-radius: 0.2rem;
		text-align: left;
		.fon1{
			width: 100%;
			.left{
				float: left;
				@include font(1rem,1.5rem,#999);
			}
			.right{
				float: right;
				@include font(1rem,1.5rem,#359BE8);
			}
		}
		.fon2{
			width: 100%;
			margin-top: 1rem;
			.big{
				@include font(3.4rem,3.8rem,#00D762);
			}
			.small{
				@include font(1rem,1.2rem,#00D762);
			}
		}
		.btn{
			margin-top: 1rem;
			width: 100%;
		}
	}
}
.exchange{
	width: 30rem;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	button{
		border:0;;
		background-color:#EF4F4F;
		width:90%;
		height: 3rem;
		@include font(1.2rem,3rem,#fff);
	}
}
.history{
	width: 28rem;
	padding: 0 1rem;
	.title{
		text-align: left;
		@include font(1.1rem,1.2rem,#666);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #ddd;
	}
	.body{
		width: 100%;
		ul{
			li{
				width: 100%;
				height: 3rem;
				@include font(1.1rem,2.9rem,#666);

				border-bottom: 1px solid #ddd;
				display: flex;
				justify-content: space-between;

			}
		}
	}
}
</style>