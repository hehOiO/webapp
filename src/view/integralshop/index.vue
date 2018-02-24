<template>
	<div class="index">
		<div class="myscore">
			<div class="big">{{ $store.state.score }}&nbsp;<i class="fa fa-chevron-right" aria-hidden="true" style="font-weight: normal;font-size: 1.2rem;position: relative;top:-0.2rem"></i></div>
			<div class="small">我的积分&nbsp;<i class="fa fa-question-circle-o" aria-hidden="true"></i></div>
		</div>
		<div class="overview">
			<div class="item">
				<span class="p1">兑换商品</span><br>
				<span class="p2">好物随心换</span>
			</div>
		</div>
		<div class="shop_area">
			<div class="item" v-for="(item,index) in data" :class="{double:(index+1)%2 == 0?true:false}" @click="go_to_detail(item.id,item.type)">
				<div class="p1">{{ item.good_name }}</div>
				<div class="p2"><span style="color:#FF5339;margin-right: 0.4rem">{{ item.need_score }}</span>积分<span class="label">{{ item.type | set_type }}</span></div>
				<div class="img">
					<img :src="item.pic" alt="">
				</div>
			</div>
		</div>
		<div class="more">
			<a href="">查看更多&nbsp;></a>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				url:'',
				data:''
			}
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
					self.getRecommend(); 
				})	
			}, function() {
			});

		},
		filters:{
			set_type($value){
				var type_data = ['限时优惠','特价换购','0元抽奖'];
				return type_data[$value];
			}
		},
		methods:{
			getRecommend(){
				const self =this;
				let url = self.url+'Integralshop/getRecommend';
		        let success=function(res){
		        	if(res.data.code == 200 ){
		        		self.data = res.data.data; 

		        	}else{
		        		self.$config.throw_notice('获取信息失败');
		        		self.$router.push({path:'/menu_user'});
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  
			},
			go_to_detail(id,type){
				if(type == 2){
					for(let i=0;i<this.data.length;i++){
						if(this.data[i].id == id){
							if(this.data[i].luck_type == 1){
								this.$router.push({path:'/activity/luckdraw',query:{good_id:id}});
							}else if(this.data[i].luck_type == 0){
								this.$router.push({path:'/activity/flop',query:{good_id:id}});
							}else if(this.data[i].luck_type == 2){
								this.$router.push({path:'/activity/guaguale',query:{good_id:id}});
							}
						}
					}
				}else{
					this.$router.push({path:'/integralshop/detail',query:{id:id}});
				}
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
.js{
	width: 100%;
	clear: left;
	height: 2.5rem;
}
#index{
	width:30rem;
}
.myscore{
	@include gloal;
	background-color: #26A2FF;
	height: 5rem;
	.big{
		width: 100%;
		@include font(2.4rem,2.6rem,#fff);
		font-weight: bold;
	}
	.small{
		width: 100%;
		@include font(1.1rem,2rem,#fff);


	}
}
.overview{
	width: 30rem;
	height: 5rem;
	background:url('/static/images/scorebg.png');
	display: flex;
	justify-content: center;
	align-items: center;
	.item{
		padding:0 0.6rem;
		.p1{
			@include font(1.3rem,1.5rem,#000);
			font-weight: bold;
		}
		.p2{
			@include font(0.8rem,1rem,#666);
		}
	}
}
.shop_area{
	width: 30rem;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	background-color:#fff;
	.item{
		text-align: left;
		padding: 1rem;
		width: 12.95rem;
		border-top:0.1rem solid #ddd;
		border-bottom: 0.1rem solid #ddd;
		border-right: 0.1rem solid #ddd;
		.p1{
			width: 100%;
			@include font(1.05rem,1.7rem,#000);
		}
		.p2{
			width: 100%;
			@include font(0.95rem,1.6rem,#999);
			.label{
				margin-left: 0.6rem;
				padding: 0 0.4rem;
				@include font(0.8rem,1.5rem,#fff);
				background-color:#F94843;
				border-radius: 0.4rem;
			}
		}
		.img{
			width: 100%;
			padding-bottom: 1rem;
			img{
				width: 100%;
			}
		}
	}
	.double{
		border-right: 0px;
	}
}	
.more{
	width: 100%;
	height: 3rem;
	a{
		@include font(1.1rem,3rem,#999);
		text-align: center;
		background: #fff;	
	}

}
</style>