<template>
	<div id="confirm">
		<router-link :to="{path:'/address/checkout',query:{order_number:order_number}}">
			<div class="address_temp">
				<div class="content">
					<span class="left" style="font-size: 1.1rem"><i class="fa fa-map-marker blue" aria-hidden="true"></i><span v-if="!order_data.sh_address">请添加一个收货地址</span><span v-if="order_data.sh_address">送至{{ order_data.sh_address }}</span></span>
					<span class="right"><i class="fa fa-chevron-right" aria-hidden="true" style="margin-top:0.9rem"></i></span>
				</div>
			</div>
		</router-link>
		<div class="js"></div>
		<div class="sent_time">
			<div class="content" @click="time_checkout">
				<span class="left"><i class="fa fa-clock-o blue" aria-hidden="true"></i>送达时间</span>
				<span class="right"><span class="blue" style="margin-right: 1rem;">尽快送达|预计到达{{ order_data.estimate_time }}</span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>

			</div>			
		</div>
		<div class="js"></div>
		<div class="yh_temp" @click="pay_checkout">
			<div class="content">
				<span class="left">支付方式</span>
				<span class="right"><span class="gray" style="margin-right: 1rem;">{{ order_data.pay_method }}</span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>				
			</div>
		</div>
		<div class="yh_temp" @click="red_checkout">
			<div class="content">
				<span class="left" style="color:#999">红包</span>
				<span class="right"><span class="gray" style="margin-right: 1rem;">
					<span v-if="order_data.discount == null">选择地址后使用红包</span>
					<span v-if="order_data.discount != null">已使用{{ order_data.discount }}元红包</span>
					</span><i class="fa fa-chevron-right" aria-hidden="true"></i>
				</span>				
			</div>
		</div>
		<div class="js"></div>
		<div class="order">
			<div class="title">
				<img src="/static/images/shop/shop1.png" alt="">
				<span>棒槌烧麦(黄龙店)</span>
				<div style="clear: left;"></div>
			</div>
			<div class="body">
				<div class="base">
					<div v-for="(item,index) in order_data.order_detail">
						<span class="goods">{{ item.food_name}}</span>
						<span class="price">￥{{ (parseFloat(item.price)+parseInt(item.chf))*item.food_num }}</span>
						<span class="num">x{{ item.food_num }}</span>
						<div style="clear: both;"></div>
					</div>
				</div>
				<div class="tz">
					<p>
						<span class="goods">配送费</span>
						<span class="price">￥{{ order_data.psf }}</span>
						<div style="clear: both;"></div>
					</p>
				</div>
				<div class="yh">
					<p v-if="order_data.discount">
						<span class="goods"><span class="lab red">减</span>红包优惠</span>
						<span class="price">-￥{{ order_data.discount }}</span>
						<div style="clear: both;"></div>
					</p>						
				</div>
				<div class="total">
					<p>
						<span class="goods" style="margin-right: 1rem">订单&nbsp;￥{{ order_data.total_price+parseFloat(order_data.psf) }}</span>
						<span class="goods">优惠&nbsp;￥{{ order_data.discount || 0}}</span>
						<span class="price">待支付&nbsp;￥{{ new_price }}</span>
						<div style="clear: both;"></div>						
					</p>
				</div>
			</div>
		</div>
		<div class="js"></div>
		<router-link :to="{path:'/order/hobby',query:{order_number:$route.query.order_number}}">
			<div class="bz">
				<div class="content">
					<span class="left">订单备注</span>
					<span class="right"><span class="gray" style="margin-right: 1rem;"><span v-if="!order_data.base_summary">口味、偏好等</span><span v-if="order_data.base_summary">{{ order_data.base_summary | summary_substr }}{{ ','+order_data.more_summary | summary_substr}}</span></span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>				
				</div>			
			</div>
		</router-link>
		<div class="yh_temp">
			<div class="content">
				<span class="left" style="color:#999">发票信息</span>
				<span class="right"><span class="gray" >未满103.0元，不能开发票</span></span>				
			</div>
		</div>
		<div class="js" style="height: 4.1rem"></div>

		<div class="pay">
			<div class="pay_info">
				<span class="big_font">待支付&nbsp;￥{{ new_price }}</span>
				<span class="small_font">|&nbsp;优惠&nbsp;￥{{ order_data.discount || 0}}</span>
			</div>
			<div class="pay_btn" @click="go_to_pay">确认下单</div>
			<div style="clear: both;"></div>
		</div>
		
		<div style="width: 30rem;height: 100%;background-color: rgba(0,0,0,0.6);position: fixed;top:0;overflow: hidden;z-index: 999" id="modal" v-if="pickervisible">
			<datetime :time="order_data.estimate_time" @confirm="handlevalue" @cancle="handlecancle"></datetime>	
		</div>

		<alertmodal :visible="pay_visible" @payClose="payClose" :title="pay_title">
			<div class="pay_select">
				<ul>
					<li style="height: 0.5rem;width: 100%">
						
					</li>
					<li v-for="(item,index) in pay_mehtod_data">
						<span class="name">{{ item }}</span>
						<span><input type="radio" name="pay_method" :checked="item == order_data.pay_method" class="pay_input" :value="item" @click="order_data.pay_method=item"></span>
						<div style="clear: both;"></div>
					</li>

				</ul>

			</div>
		</alertmodal>
	</div>
</template>
<script>
import datetime from '../../components/private/datetime'
import alertmodal from '../../components/private/alert_modal'
	export default{
		data(){
			return{
				pickervisible:false,
				time:'17:05',
				pay_visible:false,
				pay_title:'支付方式',
				order_number:'',
				url:'',
				order_data:'',
				pay_mehtod_data:['在线支付','支付宝支付','微信支付','银联支付'],
				discount:2,
				str:''
			}
		},
		created:function(){
			const self=this;
			self.$store.dispatch('getUserinfo').then(function() {
				self.url=self.$config.url;
				self.order_number=self.$route.query.order_number;
				//获取订单信息
				self.get_order_info();
			}, function() {

			});
		},
		mounted:function(){
			$('#modal').css('height','100%');
			
		},
		computed:{
			new_price(){
				let discount = this.order_data.discount == null?0:parseFloat(this.order_data.discount); 
				return parseFloat(this.order_data.total_price)+parseFloat(this.order_data.psf)-discount;
			}
		},
	    filters: {
	        summary_substr: (value)=>{
	            return value.length>12?value.substr(0,12)+'...':value;
	        }
	    },
		components:{
			datetime,
			alertmodal
		},
		watch:{
			pickervisible(){
				if(this.pickervisible){
					$("body").css({overflow:"hidden"});
				}else{
					$("body").css({overflow:"scroll"});
				}
			},
		},
		methods:{
			//获取订单信息
			get_order_info(){
				const self=this;
				self.$store.dispatch('getOrderinfo',self.order_number).then(function(){
					self.order_data = self.$store.state.order_data;
				},function(){
					self.$router.push({path:'/user/register'});
				});	
			},
			time_checkout(){
				this.pickervisible=true;
			},
			red_checkout(){
				if(this.order_data.sh_address != undefined ){
					this.$router.push({path:'/favourable/checkout',query:{order_number:this.order_number}});
				}else{
					return;
				}
			},
			handlevalue(value){
				this.order_data.estimate_time=value;
				this.pickervisible=false;
			},
			handlecancle(){
				this.pickervisible=false;
			},
			pay_checkout(){
				this.pay_visible=true;
			},
			payClose(value){
				this.pay_visible=value;
			},
			//去支付
			go_to_pay(){
				if(this.order_data.order_number== null){
					this.$config.throw_notice('订单不存在');
					return;
				}else if(this.order_data.sh_address== null){
					this.$config.throw_notice('请选择一个收货地址');
					return;					
				}
				let new_order_data=new Object();
				//赋予新价格
				new_order_data.sh_time=this.order_data.estimate_time;
				new_order_data.total_price=this.new_price;
				new_order_data.order_status=2;
				new_order_data.order_number=this.order_data.order_number;
				this.$store.state.order_data=new_order_data;
				const self=this;
				self.$store.dispatch('changeOrder',self.order_number).then(function(){
					self.$router.push({path:'/order/pay',query:{order_number:self.order_data.order_number}});	
				},function(res){
					self.$config.throw_notice(res);
				});					
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
#confirm{
	width: 30rem;
}
.js{
	width: 100%;
	height: 1rem;
	clear: left;
}
.content{
	width: 100%;
	height: 3rem;
	text-align: left;
	@include font(1.3rem,3rem,#333);
	.blue{
		color: #3190E8;
	}
	.left{
		float: left;
		i{
			font-size: 1.6rem;
			margin-right: 1rem;

		}
	}
	.right{
		float: right;
		i{
			font-size: 1rem;
			color: #333;
			color:#999;
		}
	}
}	
.address_temp{
	@include gloal;
	background: #fff;
	border-bottom: 2px dashed #cc0000;

}
.sent_time{
	@include gloal;
	background: #fff;
	.content{
		height:2rem;
		@include font(1.3rem,2rem,#333);	
		.left{
			font-weight: bold;
		}	
	}
}
.yh_temp{
	@include gloal;
	background: #fff;
	border-bottom: 1px solid #ddd;
	.content{
		height:2rem;
		.gray{
			color:#999;
			@include font(1.05rem,2rem,#999);
		}
		@include font(1.3rem,2rem,#333);	
		.left{
			font-weight: bold;
		}
		.right{
			@include font(1rem,2rem,#333);
		}	
	}		
}
.order{
	@include gloal;
	padding-bottom:0.5rem; 
	background: #fff;
	.title{
		width: 100%;
		height: 2rem;
		@include font(1.2rem,2rem,#333);
		padding-bottom: 1rem;
		border-bottom: 1px solid #eee;
		img{
			width: 2rem;
			height: 2rem;
			margin-right: 0.8rem;
			float: left;
		}
	}
	.body{
		width: 100%;
		margin-top: 1rem;
		.base{
			width: 100%;
			margin-bottom: 1rem;
			div{
				width: 100%;
				@include font(1.1rem,2.5rem,#333);
				.goods{
					float: left;
				}
				.num{
					margin-right: 2rem;
					float: right;
				}
				.price{
					float: right;
				}	
			}
		}
		.tz{
			width: 100%;
			margin-bottom: 1rem;
			p{
				width: 100%;
				@include font(0.9rem,2.5rem,#333);
				.goods{
					float: left;
				}
				.price{
					float: right;
				}	
			}
		}
		.yh{
			@extend .tz;
			p{
				.price{
					color:#FF4A07;
				}
				.lab{
					padding:0 0.2rem;
					color:#fff;
					margin-right: 0.3rem;
				}
				.green{
					background-color: #3CC791
				}
				.red{
					background-color: #F07373
				}
			}
		}
		.total{
			@extend .tz;
			margin-bottom: 0px;
			p{
				@include font(1.1rem,2.5rem,#000);
				font-weight: bold;
				.price{
					@include font(1rem,2.5rem,#000);
					font-weight: bold;
				}
			}
		}
	}	
}
.bz{
	@extend .yh_temp;
}
.pay{
	width: 30rem;
	height: 4rem;
	background-color: #3C3C3C;	
	position:fixed;
	bottom: 0px;
	.pay_info{
		width: 21rem;
		padding-left: 1rem;
		height: 100%;
		float: left;
		text-align: left;
		.big_font{
			@include font(1.4rem,3.8rem,#fff);
			margin-right:0.4rem;
		}
		.small_font{
			@include font(0.9rem,3.8rem,#999);
		}
	}
	.pay_btn{
		width: 8rem;
		height: 100%;
		background-color:#00D762;
		float: right;
		@include font(1.4rem,3.8rem,#fff);
	}
}
.pay_select{
	width: 28rem;
	padding: 0 1rem;
	ul{
		li{
			width: 100%;
			.name{
				padding: 0.3rem 0rem;
				@include font(1.3rem,1.5rem,#333);
				float: left;
			}
			input[type='radio']{
				height: 2.5rem;
				width: 1.5rem;
				float: right;
			}
		}
	}
}
</style>


