<template>
	<div id="flop">
		<div class="banner">
			<img :src="activity_data.activity_pic" alt="">
		</div>
		<div class="body">
			<div class="status">
				<div class="item">
					我的积分:&nbsp;{{ $store.state.score }}
				</div>
				<div class="item">
					{{ activity_data.need_score }}积分/每次
				</div>
			</div>
			<div class="luck">
				<div class="content" v-if="data">
					<div class="item">
						<div class="face">
							<div class="img">
								<img :src="data[0].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[0].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>
					</div>

					<div class="item">
						<div class="face">
							<div class="img">
								<img :src="data[1].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[1].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>					
					</div>
					<div class="item clear_right" >
						<div class="face">
							<div class="img">
								<img :src="data[2].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[2].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>						
					</div>
					<div class="item">
						<div class="face">
							<div class="img">
								<img :src="data[3].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[3].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>						
					</div>
					<div class="btn" style="border: 0" @click="start">
						<img src="/static/images/cjimg/fpbtn.png" alt="" style="width: 100%;height:100%">
					</div>
					<div class="item clear_right" >
						<div class="face">
							<div class="img">
								<img :src="data[4].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[4].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>						
					</div>
					<div class="item clear_bottom">
						<div class="face">
							<div class="img">
								<img :src="data[5].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[5].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>						
					</div>
					<div class="item clear_bottom">
						<div class="face">
							<div class="img">
								<img :src="data[6].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[6].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>							
					</div>
					<div class="item clear_bottom clear_right" >
						<div class="face">
							<div class="img">
								<img :src="data[7].prize_pic" alt="">
							</div>
							<div class="text">
								{{ data[7].prize_name }}
							</div>
						</div>
						<div class="back">
							<img src="/static/images/cjimg/pk.png" alt="">
						</div>							
					</div>
				</div>
			</div>
			<div class="summary">
				<div class="activity_name">
					活动名称:
					<span style="font-weight: bold;">{{ activity_data.activity_name }}</span>
				</div>

				<div class="activity_body"  v-html="activity_data.summary">
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{

				btn_enabel:true,
				url:'',
				activity_data:'',
				winning:''
			}
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
					self.get_flop_info();
				})	
			}, function() {

			});

		},
		computed:{
			data(){
				return this.activity_data.luck_detail;
				
			}
		},
		methods:{
			//获取活动信息
			get_flop_info(){
            	const self = this;
            	let url = self.url +'IntegralMall/getFlopInfo/'+self.$route.query.good_id
                let success=function(res){  
                   if(res.data.code == 200){
                   		self.activity_data = res.data.data;

                   }else{
                   		self.$config.throw_notice('活动不存在');
						self.$router.push("/");
                   }
                }
                let error = function(res){
                	this.$config.throw_notice('网络异常');
                }
                this.$config.apirequest(url,'get',[],success,error);					
			},
			start(){
				const self=this;
				if(self.$store.state.userinfo == '' || self.$store.state.userinfo.id == undefined ){
					self.$config.throw_notice('请登录后开始');
					return;		
				}
				if(self.$store.state.score < self.activity_data.need_score){
					self.$config.throw_notice('所需积分不足');
					return;					
				}
				self.$store.state.score -= self.activity_data.need_score;
				if(!self.btn_enabel){
					self.$config.throw_notice('游戏已经开始');
					return;
				}

				$('.content .btn img').animate({right:"-2px",'bottom':"-2px"});
				$('.content .btn img').animate({right:"0px",'bottom':"0px"},function(){
					self.btn_enabel=false;
					$('.content .item').find('.face').css('transform','rotateY(-180deg)');
					$('.content .item').find('.back').css('transform','rotateY(0deg)');
					self.flop_start();
				});

			},
			//开始抽奖
			flop_start(){
            	const self = this;
            	let url = self.url +'IntegralMall/luck';
            	let data = {
            		luck_id:self.activity_data.id,
            		uid:self.$store.state.userinfo.id,
            		need_score:self.activity_data.need_score
            	}
                let success=function(res){  
                	if(res.data.code == 200){
                		self.winning=res.data.data;
                		setTimeout(self.item_click,500);
                	}else{
                		self.$config.throw_notice('抽奖失败');
                		self.init();
                	}
                }
                let error = function(res){
                	this.$config.throw_notice('网络异常');
                	self.init();
                }
                this.$config.apirequest(url,'post',data,success,error);
			},
			item_click(){
				const self = this;
				let num = $('.content .item').length;
				let obj = $('.content .item');

				for(let i=0;i<num;i++){
					(function(i){
						obj.eq(i).click(function(){
							let newarr = [];
							let n;
							for(let k=0;k<self.data.length;k++){
								newarr[k] = self.data[k];
								if(self.data[k].id==self.winning.id){
									n = k;
								}
							}
							self.$set(self.data,i,self.data[n]);
							newarr.splice(n,1);
							newarr = self.shuffle(newarr);
							for(let j=0;j<self.data.length;j++){
								if(j>i){
									self.$set(self.data,j,newarr[j-1]);
								}else if(j<i){
									self.$set(self.data,j,newarr[j]);
								}
							}
							obj.eq(i).find('.face').css('transform','rotateY(0deg)');
							obj.eq(i).find('.back').css('transform','rotateY(180deg)');
							setTimeout(function() {
								if(self.data[i].is_enable == 1){
									MessageBox.alert('很抱歉您没有中奖哦').then(action => {
										self.init();
									});	
								}else{
									MessageBox.alert('恭喜你获得了'+self.data[i].prize_name+',请到中奖记录页面填写详细信息').then(action => {
										self.init();
									});										
								}
							
							}, 1000);

						});
					})(i)
				}
			},
			init(){
				const self=this;
				let obj = $('.content .item');
				obj.find('.face').css('transform','rotateY(0deg)');
				obj.find('.back').css('transform','rotateY(180deg)');
				obj.unbind();
				self.btn_enabel=true;
			},
			shuffle(array){
			    var i,x,j;
			    let newarr=array;
			    for(i=newarr.length;i>0;i--){
				        j = Math.floor(Math.random()*i);
				        x = newarr[j];
				        newarr[j] = newarr[i-1];
				        newarr[i-1] = x;

			    }

			    return newarr;
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
   background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#flop{
	width: 30rem;	
}	
.banner{
	width: 30rem;
	img{
		width: 100%;
	}
}
.body{
	@include gloal;
	background-color:#710603;
	display: flex;
	flex-wrap: wrap;
	padding-top: 0;
	justify-content: flex-start;
	.status{
		width: 100%;
		height: 2.5rem;
		@include font(1rem,2.5rem,#fff);
		display: flex;
		justify-content: space-between;
	}
	.luck{
		width: 100%;
		height: 28rem;
		background:url('/static/images/cjimg/nrbg.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.content{
			width: 23rem;
			height: 23rem;
			display: flex;
			flex-wrap: wrap;
			.btn{
				margin-right: 1rem;
				margin-bottom: 1rem;
				width: 7rem;
				height: 7rem;		
				img{
					position: relative;
				}
			}
			.item{
				margin-right: 1rem;
				margin-bottom: 1rem;
				width: 7rem;
				height: 7rem;
				position: relative;
				transform-style: preserve-3d;
				backface-visibility: hidden;
				.back,.face{
					transition: transform 1s;
					position: absolute;
				}
				.back{
					width: 100%;
					height: 100%;
					transform: rotateY(180deg);
					img{
						width: 100%;
						height: 100%
					}				
				}
				.face{
					width: 6.80rem;
					height: 6.80rem;
					border:0.08rem solid #000;
					transform: rotateY(0deg);
					.img{
						height: 5.4rem;
						width: 100%;
						background-color: #fff;
						display: flex;
						justify-content: center;
						img{
							width: 4rem;
						}
					}
					.text{
						width: 100%;
						height: 1.4rem;
						background-color: #E4E3E1;
						text-align: center;
						@include font(0.9rem,1.4rem,#333);
					}					
				}

			}	
			.clear_right{
				margin-right: 0rem;
			}
			.clear_bottom{
				margin-bottom: 0rem;
			}
		}
	}
	.summary{
		width: 100%;
		padding-top: 2rem;
		@include font(0.9rem,2rem,#fff);
		.activity_name{


			@include font(1.5rem,2.5rem,#fff);
			width: 100%;
			text-align: center;
		}
		.activity_summary{
			@include font(1.3rem,2.5rem,#fff);
			width: 100%;
			text-align: center;	
		}
		.activity_body{
			word-wrap: break-word;
		}
	}
}
</style>