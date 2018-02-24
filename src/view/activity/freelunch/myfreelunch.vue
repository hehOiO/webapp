<template>
	<div id="my">
		<div class="top">
			<div class="money"><span class="big">{{ winning_price }}</span><span class="small">元</span></div>
			<div class="lab">中奖总金额</div>
		</div>
		<mt-navbar v-model="selected">
			  <mt-tab-item id="我参与的">我参与的</mt-tab-item>
			  <mt-tab-item id="中奖纪录">中奖纪录</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="我参与的">
				<div class="myjoin">
					<div class="body">
						<ul>
							<li v-for="(item,index) in reward_history">
								<div class="left">
									<div class="icon"><i :class="item.icon" aria-hidden="true" ></i></div>
									<div class="name">
										<p class="goods">{{ item.goods_name }}</p>
										<p class="periods">第{{ item.periods }}期 | 我已参与{{ item.num }}次</p>
									</div>
									<div style="clear: left;"></div>
								</div>
								<div class="right">
									{{ item.whether==0?'未中奖':'已中奖' }}&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
								</div>
								<div style="clear: both;"></div>
							</li>
						</ul>
					</div>
				</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="中奖纪录">
				<div class="myjoin">
					<div class="body">
						<ul>
							<li v-for="(item,index) in winning_data">
								<div class="left">
									<div class="icon"><i :class="item.icon" aria-hidden="true" ></i></div>
									<div class="name">
										<p class="goods">{{ item.goods_name }}</p>
										<p class="periods">第{{ item.periods }}期 | 我已参与{{ item.num }}次</p>
									</div>
									<div style="clear: left;"></div>
								</div>
								<div class="right">
									{{ item.whether==0?'未中奖':'已中奖' }}&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>
								</div>
								<div style="clear: both;"></div>
							</li>
						</ul>
					</div>
				</div>
		  </mt-tab-container-item>

		</mt-tab-container>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				selected:'我参与的',
				reward_history:[
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817049',
						num:5,
						whether:0,
						money:20
					},
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817051',
						num:2,
						whether:0,
						money:20
					},
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817053',
						num:1,
						whether:0,
						money:20
					},
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817055',
						num:2,
						whether:1,
						money:20
					},
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817056',
						num:3,
						whether:1,
						money:20						
					},
					{
						icon:'fa fa-money',
						goods_name:'霸王餐',
						periods:'7817058',
						num:2,
						whether:0,
						money:20
					}
				],
				winning_data:[
				],
				winning_price:0
			}
		},
		created:function(){
			this.winning_ajax();
		},
		mounted:function(){
			//统计中奖金额
			this.winning_count()
		},
		methods:{
			winning_count(){
				for(let i=0;i<this.reward_history.length;i++){
					if(this.reward_history[i].whether == 1){
						this.winning_price += this.reward_history[i].money;
					}
				}
			},
			winning_ajax(){
				for(let i=0;i<this.reward_history.length;i++){
					if(this.reward_history[i].whether == 1){
						this.winning_data.push(this.reward_history[i]);
					}
				}				
			}
		}
   }
</script>
<style>
.mint-tab-item-label{
	font:1.1rem/1.5rem '微软雅黑';		
}	
</style>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
    margin-top: -1px;
    background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
.js{
	height: 0.32rem;
	clear: left;
	background-color: #fff;
	width: 100%;
}
#my{
	width:30rem;
}
.top{
	width: 30rem;
	margin-top:-1px;
	padding-top:4rem;
	height: 7rem;
	background-color: #26A2FF;
	.money{
		width: 100%;
		.big{
			@include font(3rem,3.5rem,#fff)
			font-weight: bold;
		}
		.small{
			color:#fff;
		}
	}
	.lab{
		width: 100%;
		color:#fff;
		font-size: 0.9rem;
	}
}
.myjoin{
	width: 100%;
	margin-top: 0.25rem;
	.body{
		@include gloal;
		padding-bottom: 0;
		ul{
			li{
				width: 100%;
				padding-bottom: 1.5rem;
				.left{
					float: left;
					height: 2.5rem;
					.icon{
						float: left;
						margin-right: 1rem;

						i{
							font-size: 3.1rem;
							color:#FFD783;
						}
					}
					.name{
						float: left;
						margin-top: 0.3rem;
						.goods{
							@include font(1.1rem,1.3rem,#333);
						}
						.periods{
							@include font(0.9rem,1.3rem,#999);
						}
					}
				}
				.right{
					float: right;
					text-align: right;
					@include font(1rem,3rem,#999);
				}
			}
		}
	}
}
</style>
