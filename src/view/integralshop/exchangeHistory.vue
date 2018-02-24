<template>
	<div id="history">
		<div class="body">
			<div class="item" v-for="(item,index) in newdata" @click="go_to_detail(item.order_number)">
				<div class="img">
					<img :src="item.pic" alt="">
				</div>
				<div class="text">
					<div>{{ item.good_name }}</div>
					<div class="limit_time"><span>有效期至：{{ item.effective_time }}</span>
						<span class="flag scuess" v-if="item.is_enable == 1"><i class="fa fa-check" aria-hidden="true" style="margin-right: 0.3rem"></i>已兑换</span>
						<span class="flag warning" v-if="item.is_enable == 0"><i class="fa fa-times" aria-hidden="true" style="margin-right: 0.3rem"></i></i>未兑换</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				data:''
			}
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.get_all_order_info();
			}, function() {
			});			
		},
		computed:{
			newdata(){
				for(let i=0;i<this.data.length;i++){
					let effective_time = new Date(this.data[i].create_time);
					effective_time=new Date(effective_time.getTime()+parseInt(this.data[i].effective_time)*24*60*60*1000);
					effective_time = effective_time.getFullYear()+'-'+(effective_time.getMonth()+1)+'-'+effective_time.getDate();					
					this.data[i].effective_time =effective_time;
				}
				return this.data;
			}
		},
		methods:{
			get_all_order_info(){
				const self =this;
				let url = self.url+'Integralshop/getAllOrderInfo/'+self.$store.state.userinfo.id;
		        let success=function(res){
		        	if(res.data.code == 200){
		        		self.data = res.data.data;
		        	}else{
		        		self.$config.throw_notice('获取兑换信息记录失败');
		        		self.$router.go(-1);
		        	}	
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  						
			},
			go_to_detail(order_number){
				this.$router.push({path:'/integralshop/exchangeDetail',query:{order_number:order_number}});
			}
		}
	}
</script>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:0rem 1rem;
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
#history{
	width:30rem;
}
.body{
	@include gloal;
	padding: 0;
	.item{
		width:100%;
		padding:1rem;
		width: 100%;
		display: flex;
		background: #fff;
		.img{
			height: 5rem;

			img{
				height: 100%;
			}

		}
		.text{
			padding: 0.3rem;
			@include font(1.3rem,2rem,#333);
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			div{
				width: 100%;
			}
			.limit_time{
				display: flex;
				justify-content: space-between;
				.flag{
					font-size: 0.95rem;
				}
				.scuess{
					color:#48BB38;
				}
				.warning{
					color:#FFB800;
				}
			}
		
		}
	}
}	
</style>