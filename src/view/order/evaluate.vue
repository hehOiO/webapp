<template>
	<div id="evaluate">
		<div class="shop">
			<div class="img">
				<img src="/static/images/goods/20171022-18.png" alt="">
			</div>
			<div class="shopname">学长的炸鸡汉堡（中南店）(中南店)</div>
		</div>
		<div class="js"></div>
		<div class="ev_lis" v-for="(item,index) in evaluate.food_evaluate">
			<div class="title" v-if="index==0"><span class="wg">评价商品</span><span class="normal">(文字评价或选择标签可得金币)</span></div>
			<div class="lis">
				<div class="food">
					<div class="name">{{ item.food_name }}</div>
					<div class="icon">
						<i class="fa fa-frown-o" aria-hidden="true" :class="{yellow:item.fast_evaluate == '差评'}" @click="item.fast_evaluate = '差评'"></i>
						<i class="fa fa-meh-o" aria-hidden="true" :class="{yellow:item.fast_evaluate == '中评'}" @click="item.fast_evaluate = '中评'"></i>
						<i class="fa fa-smile-o" aria-hidden="true" :class="{yellow:item.fast_evaluate == '好评'}" @click="item.fast_evaluate = '好评'"></i>
					</div>
				</div>
				<div class="lab">
					<div class="lis_lab lis_food" v-for="(lis,key) in item.rule" @click="lis.nq = !lis.nq" :class="{blue:lis.nq}">{{ lis.label }}</div>			
				</div>		
				<div class="more">
					<textarea name="" id="" cols="10" rows="3" placeholder="说说有哪些不满意" v-model="item.more_evaluate"></textarea>
				</div>
			</div>

		</div>
		<div class="js"></div>
		<div class="ev_lis">
			<div class="title">
				<div class="wg">评价商家服务</div>
				<div class="icon">
					<i class="fa fa-frown-o" aria-hidden="true" :class="{yellow:evaluate.shop_evaluate.fast_evaluate == '差评'}" @click="evaluate.shop_evaluate.fast_evaluate = '差评'"></i>
					<i class="fa fa-meh-o" aria-hidden="true" :class="{yellow:evaluate.shop_evaluate.fast_evaluate == '中评'}" @click="evaluate.shop_evaluate.fast_evaluate = '中评'"></i>
					<i class="fa fa-smile-o" aria-hidden="true" :class="{yellow:evaluate.shop_evaluate.fast_evaluate == '好评'}" @click="evaluate.shop_evaluate.fast_evaluate = '好评'"></i>
				</div>				
			</div>
			<div class="lis">
				<div class="lab">
					<div class="lis_lab" v-for="(item,index) in evaluate.shop_evaluate.rule" @click="item.nq =!item.nq" :class="{blue:item.nq}">{{ item.label }}</div>		
				</div>
				<div class="more">
					<textarea name="" id="" cols="10" rows="3" placeholder="说说有哪些不满意"  v-model="evaluate.shop_evaluate.more_evaluate"></textarea>
				</div>
			</div>
		</div>
		<div class="js"></div>
		<div class="ev_lis">
			<div class="title">
				<div class="wg">评价配送服务</div>
				<div class="icon">
					<i class="fa fa-frown-o" aria-hidden="true" :class="{yellow:evaluate.dc_evaluate.fast_evaluate == '差评'}" @click="evaluate.dc_evaluate.fast_evaluate = '差评'"></i>
					<i class="fa fa-meh-o" aria-hidden="true" :class="{yellow:evaluate.dc_evaluate.fast_evaluate == '中评'}" @click="evaluate.dc_evaluate.fast_evaluate = '中评'"></i>
					<i class="fa fa-smile-o" aria-hidden="true" :class="{yellow:evaluate.dc_evaluate.fast_evaluate == '好评'}" @click="evaluate.dc_evaluate.fast_evaluate = '好评'"></i>
				</div>				
			</div>
			<div class="lis">
				<div class="lab">
					<div class="lis_lab" v-for="(item,index) in evaluate.dc_evaluate.rule" @click="item.nq =!item.nq" :class="{blue:item.nq}">{{ item.label }}</div>
				</div>
				<div class="more">
					<textarea name="" id="" cols="10" rows="3" placeholder="说说有哪些不满意" v-model="evaluate.dc_evaluate.more_evaluate"></textarea>
				</div>
			</div>
		</div>	
		<div class="summary">
			<div class="label">送达时间</div>
			<div class="time">10分钟 17:57送达</div>
		</div>
		<p class="niming">你的评价将匿名发送给商家</p>	
		<div style="width: 30rem;height: 3.5rem"></div>
		<div class="bottom">
			<div class="info">评价后可获得<span>{{ $store.state.order_data.total_price * 10 }}</span>分</div>
			<div class="btn" @click="commit">提交评价</div>
		</div>
	</div>
</template>
<script>
	import evaluateLabel from '../../components/private/evaluate_label'
	export default {
		data(){
			return{
				fast_evaluate:[
						{
							icon:"fa fa-frown-o",
							value:'差评'
						},
						{
							icon:'fa fa-meh-o',
							value:'中评'
						},
						{
							icon:'fa fa-smile-o',
							value:'中评'
						}
				],
				shop_rule:[
					{
						nq:false,
						label:'配送快'
					},
					{
						nq:false,
						label:'准时到达'
					},
					{
						nq:false,
						label:'送货上门'
					},
					{
						nq:false,
						label:'餐品保存完好'
					},
					{
						nq:false,
						label:'主动联系'
					},
					{
						nq:false,
						label:'态度很好'
					}
				],
				dc_rule:[
					{
						nq:false,
						label:'衣着整洁'
					},
					{
						nq:false,
						label:'餐品完好'
					},
					{
						nq:false,
						label:'准时到达'
					},
					{
						nq:false,
						label:'服务态度好'
					},
					{
						nq:false,
						label:'送餐快'
					},
					{
						nq:false,
						label:'穿着专业'
					}
				],
				evaluate:{
						uid:'',
						shop_id:'',
						order_number:'',
						did:'',
						food_evaluate:[
						],
						shop_evaluate:{
							fast_evaluate:'中评',
							label_evaluate:'',
							more_evaluate:''
						},
						dc_evaluate:{
							fast_evaluate:'中评',
							label_evaluate:'',
							more_evaluate:''
						}
				},
				url:'',
				order_number:'',
			}
		},
		components:{
			evaluateLabel
		},
		created:function(){
			const self=this;
			self.order_number=self.$route.query.order_number;
			self.get_order_info();
			self.url=self.$config.url;

		},
		methods:{
			get_order_info(){
				const self=this;
				self.$store.dispatch('getOrderinfo',self.order_number).then(function(){
					let order_data=self.$store.state.order_data;
					self.evaluate.uid=order_data.uid;
					self.evaluate.shop_id=order_data.shop_id;
					self.evaluate.order_number=order_data.order_number;
					self.evaluate.did=order_data.did;
					self.evaluate.dc_evaluate.rule=self.dc_rule;
					self.evaluate.shop_evaluate.rule=self.shop_rule;
					self.evaluate.score = order_data.total_price*10;  
					for(let i=0;i<order_data.order_detail.length;i++){
						let food_evaluate =new Object();
						food_evaluate.food_id = order_data.order_detail[i].food_id;
						food_evaluate.fast_evaluate='中评';
						food_evaluate.label_evaluate='';
						food_evaluate.more_evaluate='';
						food_evaluate.rule=[
								{
									nq:false,
									label:'干净卫生'
								},
								{
									nq:false,
									label:'食材新鲜'
								},
								{
									nq:false,
									label:'分量足'
								},
								{
									nq:false,
									label:'味道好'
								},
								{
									nq:false,
									label:'包装精美'
								},
								{
									nq:false,
									label:'很实惠'
								}
						];
						food_evaluate.food_name=order_data.order_detail[i].food_name;
						self.evaluate.food_evaluate.push(food_evaluate);			
					}			
				},function(){
					self.$router.push({path:'/user/register'});
				});					
			},
			commit(){
				const self=this;
				let label_evaluate='';
				for(let i=0;i<self.evaluate.food_evaluate.length;i++){
					label_evaluate='';
					for(let j=0;j<self.evaluate.food_evaluate[i].rule.length;j++){
						if(self.evaluate.food_evaluate[i].rule[j].nq == true){
							 label_evaluate +=  self.evaluate.food_evaluate[i].rule[j].label+',';
						}
					}
					self.evaluate.food_evaluate[i].label_evaluate = label_evaluate.substr(0,label_evaluate.length-1);
				}
				label_evaluate='';
				for(let i=0;i<self.evaluate.dc_evaluate.rule.length;i++){
					if(self.evaluate.dc_evaluate.rule[i].nq == true){
						label_evaluate +=  self.evaluate.dc_evaluate.rule[i].label+',';
					}
				}
				self.evaluate.dc_evaluate.label_evaluate=label_evaluate.substr(0,label_evaluate.length-1);
				label_evaluate='';
				for(let i=0;i<self.evaluate.shop_evaluate.rule.length;i++){
					if(self.evaluate.shop_evaluate.rule[i].nq == true){
						label_evaluate +=  self.evaluate.shop_evaluate.rule[i].label+',';
					}
				}
				self.evaluate.shop_evaluate.label_evaluate=label_evaluate.substr(0,label_evaluate.length-1);
				let url = self.url+'evaluate/insert';
		        let success=function(res){
		        	if(res.data.code ==200){
		        		self.$router.push({path:'/menu_order'});
		        	}else{
		        		self.$config.throw_notice(res.data.msg);
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'post',self.evaluate,success,error);  					
			}
		}
	}	
</script>
<style scoped lang="scss">
@mixin gloal{
   width:27rem; 
   padding:1rem 1.5rem;
   text-align: left;
   margin-top: -1px;
   background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#evaluate{
	width: 30rem;
}	
.js{
	width: 30rem;
	clear: left;
	height: 1rem;
}
.shop{
	@include gloal;
	display: flex;
	justify-content:flex-start;

	.img{
		width: 3rem;
		height: 3rem;
		margin-right: 1rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.shopname{
		@include font(1.3rem,3rem,#000);

	}
}
.ev_lis{
	@include gloal;
	.title{
		width: 100%;
		display: flex;
		justify-content: space-between;
		.wg{	
			@include font(1.1rem,2.5rem,#000);
			font-weight: bold;
		}
		.normal{
			@include font(0.95rem,2.5rem,#999);
		}
			.icon{
				@include font(1.8rem,2.2rem,#000);
			}
			.yellow{
				color:#FFAA0C;
			}
	}
	.lis{
		width: 100%;
		.food{
			width: 100%;
			display: flex;
			height: 2.5rem;
			justify-content: space-between;
			.name{
				@include font(1.2rem,2.2rem,#333);
			}
			.icon{
				@include font(1.8rem,2.2rem,#000);
			}
			.yellow{
				color:#FFAA0C;
			}

		}
		.lab{
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			.lis_lab{
				padding: 0 0.6rem;
				@include font(0.95rem,1.8rem,#999)
				margin-right: 0.8rem;
				margin-bottom: 0.7rem;
				border:1px solid #ddd;

			}
			.blue{
				color:#26A2FF;
				border:1px solid #26A2FF;
			}
		}
		.more{
			width: 100%;
			textarea{
				width: 100%;
				border:1px solid #ddd;
				background-color: #F9F9F9;
				@include font(0.95rem,1.3rem,#333);
				padding: 0.4rem;
			}
		}
	}
}
.summary{
	@include gloal;
	display: flex;
	justify-content: space-between;

	.label{
		@include font(0.95rem,3rem,#666);
	}
	.time{
		@include font(0.95rem,3rem,#0089DC);
	}
}	
.niming{
	width: 28rem;
	padding:0 1rem;
	@include font(0.95rem,2.5rem,#333);
	text-align: left;
}
.bottom{
	width: 30rem;
	position: fixed;	
	height: 3.5rem;

	text-align: left;
	bottom: 0px;
	z-index: 1;
	display: flex;
	.info{
		width: 60%;
		padding: 0 5%;
		height: 100%;
		background-color: #424242;
		@include font(1.1rem,3.5rem,#fff);
		span{
			color:#02D260;
		}
	}
	.btn{
		width: 30%;
		height: 100%;
		background-color:#00D762;
		text-align: center;
		@include font(1.3rem,3.5rem,#fff);
	}
}
</style>