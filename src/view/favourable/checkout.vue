<template>
	<div id="checkout">
		<div class="section" v-for="(item,index) in packetData" v-if="order_data" :class="{visible:!(parseFloat(order_data.total_price)+parseFloat(order_data.psf)>item.threshold)}">
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
						<div class="danger" v-if="parseFloat(order_data.total_price)+parseFloat(order_data.psf)>item.threshold" @click="check_red(item.id)">立即使用</div>
						<div class="danger" v-if="!(parseFloat(order_data.total_price)+parseFloat(order_data.psf)>item.threshold)">不可用</div>
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
				packetData:[

				],
				order_data:''
			}
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {	
				self.order_number = self.$route.query.order_number;
				//获取订单信息
				self.get_order_info();

			}, function() {

			});	
		},
		methods:{
			//获取订单信息
			get_order_info(){
				const self=this;
				self.$store.dispatch('getOrderinfo',self.order_number).then(function(){
					self.order_data=self.$store.state.order_data;
					//获取红包信息
					self.get_red_info();
				},function(){
					self.$router.push({path:'/user/register'});
				});	
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
			},
			//选中红包
			check_red(id){
				let new_order_data=new Object();
				new_order_data.order_status=1;
				new_order_data.order_number=this.order_data.order_number;
				new_order_data.red_id = id;
				this.$store.state.order_data=new_order_data;
				const self=this;
				self.$store.dispatch('changeOrder',self.order_number).then(function(){
					self.$router.go(-1);
				},function(res){
					self.$config.throw_notice(res);
				});	
			}
		}
	}
</script>
<style scoped lang="scss">
@mixin global{
   width:30rem; 
   background-color: #fff;	
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#checkout{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 0.6rem;
}
.visible{
	filter: grayscale(100%);
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