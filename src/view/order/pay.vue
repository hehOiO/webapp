<template>
	<div id="pay">
		<div class="table" v-if="!pay_status">
			<ul>
				<li>
					<div class="title">订单编号:</div>
					<div class="content">{{ order_data.order_number }}</div>
				</li>
				<li>
					<div class="title">订单名称:</div>
					<div class="content">{{ order_data.order_name }}</div>
				</li>
				<li>
					<div class="title">收货人:</div>
					<div class="content">{{ order_data.sh_person }}</div>
				</li>
				<li>
					<div class="title">收货时间:</div>
					<div class="content">{{ order_data.sh_time }}</div>
				</li>
				<li>
					<div class="title">收货地址:</div>
					<div class="content">{{ order_data.sh_address }}</div>
				</li>
				<li>
					<div class="title">支付方式:</div>
					<div class="content">{{ order_data.pay_method }}</div>
				</li>
				<li>
					<div class="title">订单状态:</div>
					<div class="content">{{ order_data.order_status }}</div>
				</li>
				<li>
					<div class="btn"><mt-button type="primary" size="large" @click="confirm_pay">确认支付</mt-button></div>
				</li>
			</ul>
		</div>
		<div class="table" v-if="pay_status">
			<div style="text-align: center;font:1.3rem/5rem '微软雅黑';width: 100%">请打开微信扫描图中二维码</div>
			<div class="qrcode">
				<img :src="img_url" alt="">
			</div>
			<div class="btn"><mt-button type="primary" size="large" @click="pay_status=false">返回上一级</mt-button></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				order_number:'',
				order_data:'',
				pay_status:false,
				url:'',
				qrcode:'',
				clock:''
			}
		},
		created:function(){
			const self=this;
			self.order_number=self.$route.query.order_number;
			self.url=self.$config.url;
			self.get_order_info();
		},
		computed:{
			img_url(){
				if(this.qrcode !=''){
					return this.url+'pay/qrcode?text='+this.qrcode;

				}else{
					return '';
				}
			}
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
			//确认订单
			confirm_pay(){
				const self =this;
				let url = self.url+'order/pay/find/'+self.$route.query.order_number;
		        let success=function(res){
		        	if(res.data.code == 200){
		        		self.qrcode=res.data.data;
		        		self.pay_status=true;
		        		self.clock=setInterval(self.check_pay,2000);
		        	}else{
		        		self.$config.throw_notice(res.data.msg);
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  
			},
			//检测订单是否完成
			check_pay(){
				const self=this;
				self.$store.dispatch('getOrderinfo',self.order_number).then(function(){
					if(self.$store.state.order_data.order_status == '待收货'){
						self.$config.throw_notice('支付成功');
						clearInterval(self.clock);
						self.$router.push({path:'/menu_order'});
					}
				},function(){
					self.$config.throw_notice('网络异常');
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
#pay{
	width: 30rem;
	background-color: #fff;
}
.js{
	width: 100%;
	height: 1rem;
	clear: left;
}
.table{
	@include gloal;
	ul{
		width: 100%;
		li{
			width: 100%;
			height: 2.2rem;
			clear: left;
			.title{
				float: left;
				@include font(1.3rem,2.5rem,#000);
				font-weight: bold;
				margin-right: 1rem;
			}
			.content{
				float: left;
				@include font(1.1rem,2.5rem,#666);
			}
			.btn{
				margin-top: 1rem;
			}
		}
	}
	.qrcode{
		width: 80%;
		margin-left: 10%;
		margin-bottom: 2rem;
		img{
			width: 100%;
			height: 100%;
			height: 19rem
		}
	}
}	
</style>