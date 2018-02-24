<template>
	<div id="order">
		<mt-header title="订单" fixed>
		  <mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<div style="height: 2.5rem;width: 30rem"></div>	
		<div class="empty" v-if="empty">--对不起,暂无订单--</div>	
		<div class="lis" v-for="(item,index) in order">
			<div class="content">
				<div class="photo">
					<img :src="item.shopimg" alt="">
				</div>
				<div class="txt">
					<div class="top">
						<div class="title"><span class="fon1">{{ item.shopname | name_substr }}&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true" style="font-size: 1rem;margin-t"></i></span><span class="fon2">{{ item.order_status }}</span></div>
						<div style="clear: both"></div>
						<div class="time">
							{{ item.create_time }}
						</div>
					</div>
					<router-link :to="{path:'/order/detail',query:{order_number:item.order_number}}">
						<div class="middle">
							<span class="fon1">{{ item.food[0].food_name }}</span>
							<span class="fon1">等{{ item.food.length }}件商品</span>


							<span class="fon2">￥{{ item.total_price | to_price }}</span>



							<div style="clear: both"></div>
						</div>
					</router-link>
					<div class="bottom">
						<div class="btn" v-if="item.order_status == '等支付'">
							<mt-button type="primary" plain style="font-size: 1rem">去支付</mt-button>
						</div>
						<div class="btn" v-if="item.order_status == '待收货'">
							<mt-button type="primary" plain style="font-size: 1rem" @click="collect(item.order_number)">确认收货</mt-button>
						</div>
						<div class="btn" v-if="item.order_status == '待评价'">
							<mt-button type="primary" plain style="font-size: 1rem">再来一单</mt-button>
							<mt-button type="danger" plain style="margin-left:1rem;font-size: 1rem" @click="go_to_evaluate(item.order_number)">评价得{{ parseInt(item.total_price*10) }}积分</mt-button>
						</div>
						<div style="clear: right;"></div>
					</div>
				</div>
				<div style="clear: left;"></div>
			</div>
		</div>		
	</div>
</template>
<script>
export default{
	data(){
		return {
			order:[

			],
			url:'',
			empty:false
		}
	},
    filters: {
        to_price: (value)=>{

            return value.toFixed(1); 
        },
        name_substr: (value)=>{
            return value.length>10?value.substr(0,10)+'...':value; 
        }   
    },	
   	created:function(){
   		const self=this;
		self.$store.dispatch('getUserinfo').then(function() {
			self.url=self.$config.url;
			self.get_all_order();
		}, function() {

		});
   	},
	methods:{
		back(){
			return;		
		},
		get_all_order(){
		      const self=this;
		      let url=self.url+'order/all';
		      let data=new Object();
		      data.uid=self.$store.state.userinfo.id;
		      let success=function(res){
		      	if(res.data.code == 200){
		      		self.order= res.data.data;
		      		self.empty=false;
		      	}else{
		      		self.empty=true;
		      		self.$config.throw_notice('暂无订单');
		      	}
		      }
		      let error = function(res){
		      	self.empty=true;
		      	self.$config.throw_notice('网络异常');
		      }
		      self.$config.apirequest(url,'post',data,success,error);   
		},
		go_to_evaluate(order_number){
			this.$router.push({path:'/order/evaluate',query:{order_number:order_number}});
		},
		//确认收货
		collect(order_number){
			const self=this;
			let new_order_data=new Object();
			new_order_data.order_status=4;
			new_order_data.order_number=order_number;
			self.$store.state.order_data=new_order_data;
			self.$store.dispatch('changeOrder',order_number).then(function(){
				window.location.reload();
			},function(res){
				self.$config.throw_notice(res);
			});				
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
#order{
	width: 30rem;
}
.empty{
	width: 100%;
	position: absolute;
	top:45%;
	text-align: center;
	@include font(1.2rem,2.2rem,#333);
}
.lis{
	@include gloal;
	background-color: #fff;
	margin-top: 1rem;
	.content{
		width: 100%;
		.photo{
			width: 8%;
			padding:0 2%; 
			float: left;
			img{
				width: 100%;
			}
		}
		.txt{
			float: left;
			width: 87%;

			.top{
				width: 100%;
				padding-bottom: 0.8rem;
				border-bottom: 1px solid #eee;
				.title{
					width: 100%;
					.fon1{
						@include font(1.3rem,1.8rem,#333);
						float: left;
					}
					.fon2{
						@include font(1rem,1.8rem,#333);
						float: right;						
					}
				}
				.time{
					width: 100%;
					@include font(0.85rem,1.5rem,#999);
				}
			}
			.middle{
				width: 100%;
				padding: 1rem 0;
				border-bottom: 1px solid #eee;
				.fon1{
					float: left;
					@include font(1rem,1.3rem,#333);
				}
				.fon2{
					float: right;
					@include font(1.1rem,1.3rem,#333);
					font-weight: bold;
				}
			}
			.bottom{
				width: 100%;
				padding: 0.5rem 0 0 0;	
				.btn{
					display: flex;
					justify-content: flex-end;
				}		
			}
		}
	}
}	
</style>