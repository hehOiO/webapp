<template>
	<div class="detail">
		<div class="banner">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="(item,index) in data.big_pic"><img :src="item" alt="" ></mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="base_info">
			<div class="shop_name">{{ data.good_name }}</div>
			<div class="money"><span class="number">{{ data.need_score }}</span><span class="unit">积分</span><span class="price">￥{{ data.cost_price | split_price}}</span></div>
		</div>
		<div class="js"></div>
		<div class="detail_info">
			<div class="title">
				<i class="fa fa-caret-right" aria-hidden="true" style="margin-right: 0.3rem"></i>详情说明
			</div>
			<div class="content">
				<div class="item" v-if="data.summary">
					<div class="p1">商品简介</div>
					<div class="p2" v-html="data.summary">
					</div>
				</div>
				<div class="item" v-if="data.flow">
					<div class="p1">兑换流程</div>
					<div class="p2" v-html="data.flow">
					</div>
				</div>
				<div class="item" v-if="data.matter">
					<div class="p1">注意事项</div>
					<div class="p2" v-html="data.matter">
					</div>
				</div>
			</div>
		</div>
		<div class="inform">
			<div class="item">{{ $config.copyright }}</div>
		</div>
		<div class="js" style="height: 4rem"></div>
		<div class="btn">
			<button :class="{no_enable:btn_text != '立即兑换',enable:btn_text == '立即兑换'}" :disabled="btn_text != '立即兑换'" @click="build_order">{{ btn_text }}</button>
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default{
		data(){
			return {
				url:'',
				id:'',
				data:''
			}
		},
		filters:{
			split_price(value){
				value = parseFloat(value);
				return value.toFixed(1);
			}
		},
		computed:{
			btn_text(){
				if(this.$store.state.score != '' && this.$store.state.score > this.data.need_score ){
					return '立即兑换';
				}else{
					return '积分不足';
				}
			}
		},
		created:function(){
			const self=this;
			self.url=self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {

					self.id = self.$route.query.id;
					self.fetch_info(); 
				})	
			}, function() {
			});			
		},	
		methods:{
			fetch_info(){
				const self=this;
				let url = self.url+'Integralshop/fetchInfo/'+self.id;
		        let success=function(res){
					if(res.data.code == 200){
						self.data =res.data.data;
					}else{
						self.$config.throw_notice('失败');
						self.$router.push({path:'/Integralshop'});
					}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  				
			},
			build_order(){
				const self=this;
				Indicator.open({
				  text: '正在生成订单中...',
				  spinnerType: 'fading-circle'
				});
				setTimeout(self.put_order,1500);
			},
			put_order(){
				const self=this;
				let url = self.url+'Integralshop/bulid/order';
				let data = {
					good_id:self.id,
					uid:self.$store.state.userinfo.id,
					effective_time:self.data.effective_time,
					need_score:self.data.need_score,
					limit_num:self.data.limit_num
				}
		        let success=function(res){
		        	Indicator.close();
		        	if(res.data.code == 200){
		        		self.$router.push({path:'/Integralshop/result',query:{order_number:res.data.data}});
		        	}else{
		        		self.$config.throw_notice(res.data.msg);
		        	}
		        }
		        let error = function(res){
		          Indicator.close();
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'post',data,success,error);  
			}
		}
	}
</script>
<style lang="scss" scoped>
@mixin gloal{
   width:28rem; 
   padding:0 1rem;
   text-align: left;
    margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
.js{
	width: 100%;
	clear: left;
	height: 1.5rem;
}
#detail{
	width:30rem;
}
.banner{
	width: 30rem;
	height: 13rem;
	img{
		width: 100%;
		height: 100%;
	}
}
.base_info{
	@include gloal;
	background-color:#fff;
	text-align: left;
	.shop_name{
		padding:0.4rem 0;
		@include font(1.5rem,2.4rem,#333);
	}
	.money{
		height: 2.6rem;
		width: 100%;
		.number{
			@include font(1.8rem,2.5rem,#FF6000);
			margin-right: 0.4rem;
		}
		.unit{
			@include font(1.1rem,2.5rem,#FF6000);
			margin-right: 0.6rem;
		}
		.price{
			text-decoration: line-through;
			@include font(0.95rem,2.5rem,#999);
		}
	}
}	
.detail_info{
	@include gloal;
	background: #fff;
	box-shadow: 1px 1px 2px #ddd;
	.title{
		width: 100%;
		height: 2.6rem;
		@include font(0.95rem,2.6rem,#999);
		border-bottom: 1px solid #ddd;
	}
	.content{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 2rem;
		
		.item{
			width: 100%;
			margin-top: 2rem;

			.p1{
				margin-bottom: 1rem;
				@include font(1.3rem,2.4rem,#000);
				font-weight: bold;
			}
			.p2{
				@include font(1.1rem,1.6rem,#333);
				width: 28rem;
				word-wrap:break-word;
			}
		}
	}
}
.inform{
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items:center;
	.item{
		padding: 0 0.6rem;
		@include font(1.2rem,1.7rem,#CCCCCC);
		margin-top: -0.8rem;
	}
}
.btn{
	@include gloal;
	padding: 0.6rem 1rem;
	height: 3.8rem;
	background: #fff;
	position: fixed;
	bottom: 0px;
	box-shadow: 3px -2px 5px #999;
	button{
		width: 100%;
		height: 100%;
		border: 0px;
		border-radius: 0.5rem;
	}
	.no_enable{
		background-color: #CCCCCC;
		@include font(1.4rem,3.8rem,#fff);
	}
	.enable{
		background-color: #26A2FF;
		@include font(1.4rem,3.8rem,#fff);
	}
}
</style>