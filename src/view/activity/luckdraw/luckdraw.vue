<template>
	<div id="luckdraw">
		<div class="banner">
			<img src="/static/images/cjimg/luckbg.jpg" alt="">
		</div>
		<div class="btn">
			<a href="javascript:;">{{ activity_data.need_score }}积分/次</a>
		</div>
		<div class="shanDeng" id="deng" >
			<div id="luck" ><!-- luck -->
				<table>
					<tr>
						<td class="luck-unit luck-unit-0"><img :src="activity_data.luck_detail[0].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-1"><img :src="activity_data.luck_detail[1].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-2"><img :src="activity_data.luck_detail[2].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-3"><img :src="activity_data.luck_detail[3].prize_pic" v-if="activity_data.luck_detail"></td>
					</tr>
					<tr>
						<td class="luck-unit luck-unit-11"><img :src="activity_data.luck_detail[11].prize_pic" v-if="activity_data.luck_detail"></td>
						<td rowspan="2" colspan="2" class="cjBtn" id="btn" @click="start" :disabled="btn_visible"></td>
						<td class="luck-unit luck-unit-4"><img :src="activity_data.luck_detail[4].prize_pic" v-if="activity_data.luck_detail"> </td>
					</tr>
					<tr>
						<td class="luck-unit luck-unit-10"><img :src="activity_data.luck_detail[10].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-5"><img :src="activity_data.luck_detail[5].prize_pic" v-if="activity_data.luck_detail"></td>
					</tr>
					<tr>
						<td class="luck-unit luck-unit-9"><img :src="activity_data.luck_detail[9].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-8"><img :src="activity_data.luck_detail[8].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-7"><img :src="activity_data.luck_detail[7].prize_pic" v-if="activity_data.luck_detail"></td>
						<td class="luck-unit luck-unit-6"><img :src="activity_data.luck_detail[6].prize_pic" v-if="activity_data.luck_detail"></td>
					</tr>
				</table>
			</div><!-- luckEnd -->
		</div>
		<div class="btn">
			<a href="javascript:;">您的积分:{{ $store.state.score }}</a>
		</div>
		<div class="activity_name">
			<span>活动名称:</span>
			<span style="font-weight: bold;">{{ activity_data.activity_name }}</span>
		</div>	
		<div class="activity_body" v-html="activity_data.summary">
		</div>	
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				luck:{
					index:-1,	//当前转动到哪个位置，起点位置
					count:0,	//总共有多少个位置
					timer:0,	//setTimeout的ID，用clearTimeout清除
					speed:20,	//初始转动速度
					times:0,	//转动次数
					cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
					prize:-1,	//中奖位置
					init:function(id){
						if ($("#"+id).find(".luck-unit").length>0) {
							this.obj = $("#"+id);

							this.count = $("#"+id).find(".luck-unit").length;
							
							$("#"+id).find(".luck-unit-"+this.index).addClass("active");
						};

					},
					roll:function(){
						var index = this.index;
						var count = this.count;

						var luck = this.obj;

						// console.log(id);
						 $(luck).find(".luck-unit-"+index).removeClass("active");
						index += 1;
						if (index>count-1) {
							index = 0;
						};
						 $(luck).find(".luck-unit-"+index).addClass("active");
						this.index=index;
						return false;
					},
					stop:function(index){
						this.prize=index;
						return false;
					}
				},
				click:false,
				num:0,
				btn_visible:false,

				url:'',
				activity_data:'',
				winning:'',
				n:0
			}
		},
		created:function(){

		},
		mounted:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
					self.get_luck_info();
				})	
			}, function() {

			});	
		},
		computed:{

		},
		watch:{
		},
		methods:{
			//获取活动信息
			get_luck_info(){
            	const self = this;
            	let url = self.url +'IntegralMall/getFlopInfo/'+self.$route.query.good_id
                let success=function(res){  
                   if(res.data.code == 200){
                   		self.activity_data = res.data.data;
						self.luck.init('luck');
						self.shandeng();
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
			//启动
			start(){
				if(this.$store.state.score < this.activity_data.need_score){
					this.$config.throw_notice('所需积分不足');
					return;					
				}
				this.$store.state.score -=  this.activity_data.need_score;
				if(!this.btn_visible){
					//按下弹起效果
					$("#btn").addClass("cjBtnDom");
					setTimeout(function(){	
						$("#btn").removeClass("cjBtnDom");
					},200);	
				}
				if(this.click) {
					return false;
				}else{
					this.luck.speed=100;
					this.start_luck_data();
					this.btn_visible=true;
					this.click=true;
					return false;
				}

			},
			//闪灯效果
			shandeng(){
				let self=this;
				$(".shanDeng").attr("class",function(){
					setInterval(function(){ 
						self.num++;
						if(self.num%2==0){
							$('#deng').addClass("shanDeng2");
						}else{
							$('#deng').addClass("shanDeng");
							$('#deng').removeClass('shanDeng2');
						}
					},500)
				})
			},
			//滚动
			roll(){
				this.luck.times += 1;
				this.luck.roll();
				if (this.luck.times > this.luck.cycle+13 && this.luck.prize==this.luck.index) {
					clearTimeout(this.luck.timer);
					if(this.winning.prize_name == '谢谢参与'){
						MessageBox.alert('很抱歉您没有中奖哦').then(action => {

						});	
					}else{
						MessageBox.alert('恭喜你获得了'+this.winning.prize_name+',请到中奖记录页面填写详细信息').then(action => {
	
						});	
					}
					this.btn_visible=false;
					this.luck.prize=-1;
					this.luck.times=0;
					this.click=false;
				}else{
					if (this.luck.times<this.luck.cycle) {
						this.luck.speed -= 10;
						
					}else if(this.luck.times==this.luck.cycle) {
						this.luck.prize = this.n;	
					}else{
						if (this.luck.times > this.luck.cycle+13 && ((this.luck.prize==0 && this.luck.index==7) || this.luck.prize==this.luck.index+1)) {
							this.luck.speed += 110;
						}else{
							this.luck.speed += 20;
						}
					}
					if (this.luck.speed<40) {
						this.luck.speed=40;
					};

					this.luck.timer = setTimeout(this.roll,this.luck.speed);
				}
				return false;
			},
			start_luck_data(){
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
                		for(let i=0;i<self.activity_data.luck_detail.length;i++){
                			if(self.activity_data.luck_detail[i].id == self.winning.id){
                				self.n = i;
                			}
                		}
                		self.roll();
                	}else{
                		self.$config.throw_notice('抽奖失败');
                	}
                }
                let error = function(res){
                	this.$config.throw_notice('网络异常');
                }
                this.$config.apirequest(url,'post',data,success,error);			
			}		
		}
   }
</script>
<style>
.activity_body p{
	font-size: 0.95rem;
	line-height: 1.8rem;
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
#luckdraw{
	width: 30rem;
	background-color:#FF5405;
	padding-bottom: 3rem;
}	
.banner{
	width:30rem;
	img{
		width: 100%;
	}
}
.btn{
	width: 100%;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	a{
		height: 2.2rem;
		padding:0 1rem;
		border-radius: 1.1rem;
		border:1px solid #fff;

		@include font(1.1rem,2.3rem,#fff)
	}
}
.shanDeng,.shanDeng2{
	width: 26.5rem;
	height: 27rem;
	background-size: 100%;
	background-repeat: no-repeat;
	margin: 0rem auto 0 auto;

}

	.shanDeng{
		background-image: url(/static/images/cjimg/shandeng1.png);
	}
	.shanDeng2{
		background-image: url(/static/images/cjimg/shandeng2.png);
	}

	#btn .cjBtnDom,#btn .cjBtn,.shanDeng .active,.shanDeng td{
		width: 5rem;
		height: 5rem;
		background-repeat: no-repeat;
		background-size: 100%;
		img{
			width:100%;
			height: 100%;
		}
	}

	#btn.cjBtn{
		background-image: url(/static/images/cjimg/buttonUp.png);
	}
	#btn.cjBtnDom{
		background-image: url(/static/images/cjimg/buttonDown.png);
	}


	#luck .active{
		background-image: url(/static/images/cjimg/active.png);
	}
	.shanDeng td{
		text-align: center;
		background-image: url(/static/images/cjimg/proBj.png);
	}
	.shanDeng table{
		padding-left: 2.6rem;
		padding-top: 2.2rem;
	}
	.activity_name{
		width: 28rem;
		padding: 0 1rem;
		text-align: center;
		@include font(1.4rem,2.5rem,#fff);
		padding-bottom: 0.6rem;
	}
	.activity_body{
		width: 28rem;
		padding: 0 1rem;
		text-align: left;
		@include font(1.1rem,1.6rem,#fff);	
		word-wrap: break-word;	
	}
</style>
