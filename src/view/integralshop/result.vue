<template>
	<div id="result">
		<div class="toask">
			<div class="item">
				<div class="top">
					<img src="/static/images/green.png" alt="">
					<div>恭喜你兑换成功</div>
				</div>
				<div class="bottom">
					关注首页“兑换记录”，掌握订单最新状态~
				</div>
			</div>
		</div>
		<div class="js" style="height: 1rem"></div>
		<div class="base_info">
			<img :src="data.pic" alt="">
			<div class="font">
				{{ data.good_name }}</br>
				{{ new_effective_time }}({{ accuracy_date }})
			</div>
		</div>
		<div class="exchange">
			<div class="price"><span class="th">兑换价格:</span>{{ data.need_score }}积分</div>
			<div class="number">
				<div><span class="th">券码</span><span id="coupon" value="data.coupon_code">{{ data.coupon_code }}</span></div>
				<div class="action">
					<a href="javascript:;" class="copy" data-clipboard-target="#coupon"> 
						复制
					</a>
				</div>
			</div>
		</div>
		<div class="js"></div>
		<div class="detail_info">
			<div class="item" v-if="data.summary">
				<div class="titie">商品简介</div>
				<div class="body" v-html="data.summary">
					
				</div>
			</div>
			<div class="item" v-if="data.flow">
				<div class="titie">商品流程</div>
				<div class="body" v-html="data.flow">
					
				</div>
			</div>
			<div class="item" v-if="data.matter">
				<div class="titie">注意事项</div>
				<div class="body" v-html="data.matter">
					
				</div>
			</div>
		</div>
		<div class="js"></div>
		<div class="order_number">
			<span class="th">订单编号：</span>
			{{ data.order_number }}
		</div>
		<div class="js"></div>
		<div class="home">
			<button class="item" @click="go_to_index">回到首页</button>
		</div>
	</div>
</template>
<script>
	import clipboard from "clipboard";
	export default {
		data(){
			return {
				url:'',
				data:''
			}
		},
		created:function(){
			const self=this;
			self.copy();
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.get_order_info();
			}, function() {
			});			
		},
		computed:{
			new_effective_time(){
				if(this.data.effective_time !=undefined && this.data.effective_time != ''){
					return '还剩下' + this.data.effective_time + '天';
				}else{
					return '无限期';
				}
			},
			accuracy_date(){
				if(this.data.effective_time !=undefined && this.data.effective_time != ''){
					let now_date=new Date(this.data.create_time);

					let new_date=new Date(now_date.getTime()+parseInt(this.data.effective_time)*24*60*60*1000);
					new_date = new_date.getFullYear()+'-'+(new_date.getMonth()+1)+'-'+new_date.getDate();
					return '至'+new_date;
				}else{
					return '';
				}				
			}
		},
		methods:{
			copy(){
				const self=this;
				let clip = new clipboard('.copy');
				clip.on('success', function(e) {
					self.$config.throw_notice('复制成功');
					e.clearSelection();
				});
			},
			get_order_info(){
				const self=this;
				if(self.$route.query.order_number == undefined ){
					self.$router.go(-1);
					return;
				}
				let url=self.url+'Integralshop/getOrderInfo?order_number='+self.$route.query.order_number;
		        let success=function(res){
		        	if(res.data.code == 200){
		        		self.data = res.data.data;
		        	}else{
		        		self.$config.throw_notice('订单不存在');
		        		self.$router.push({path:'/Integralshop'});
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  				
			},
			go_to_index(){
				this.$router.push({path:'/integralshop'});
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
#result{
	width:30rem;
}	
.toask{
	@include gloal;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 7rem;
	box-shadow: 1px 2px 5px #ddd;
	.item{
		display: flex;
		justify-content:center;
		flex-wrap: wrap;

		.top{
			@extend .item;	
			@include font(1.6rem,2.8rem,#000);
			img{
				height: 3rem;
				width: 3rem;
				margin-right: 1rem;
			}	
		}
		.bottom{
			@include font(1rem,2.5rem,#118F26);
		}
	}
}
.base_info{
	@include gloal;
	display: flex;
	justify-content: flex-start;
	height: 4.5rem;
	background-color:#FFA734;
	padding: 1.5rem;
	img{
		width: 4.5rem;
		height: 4.5rem;
		margin-right: 1.5rem;
	}
	.font{
		@include font(1.3rem,2.2rem,#fff);
	}
}
.exchange{
	@extend .toask;
	height: 5rem;
	justify-content: flex-start;
	flex-wrap: wrap;
	.price{
		width: 100%;
		@include font(1.2rem,2rem,#000);
		.th{
			@include font(1.2rem,2rem,#999);
			margin-right: 1rem;
		}
	}
	.number{
		@extend .price;
		margin-top: -0.7rem;
		display: flex;
		justify-content: space-between;
		a{
			font-size: 1.1rem;
			color:#FF6000;
			text-decoration: underline;
		}
	}
}
.detail_info{
	@include gloal;
	padding: 1rem;
	background-color:#fff;
	@include font(1.1rem,1.6rem,#333);
	display: flex;
	flex-wrap: wrap;
	.item{
		margin-bottom: 1rem;
		width: 100%;
		word-wrap:break-word;

		.titie{
			font-size: 1.2rem;
			width:100%;
			margin-bottom: 0.4rem;
		}
		.body{
			font-size: 1.1rem;
			width:100%;
			margin-bottom: 0.4rem;			
		}
	}
}
.order_number{
	@include gloal;
	padding: 1.5rem;

	@include font(1rem,1.6rem,#333);
	background: #fff;
	.th{
		color:#999;
	}
}
.home{
	@include gloal;
	padding: 1rem;
	display: flex;
	justify-content: center;
	background: #fff;
	.item{
		border:1px solid #FF6000;
		height: 3.5rem;
		@include font(1.1rem,3.4rem,#FF6000);
		background: #fff;
		padding: 0 1rem;
		border-radius: 0.6rem;
	} 
}
</style>