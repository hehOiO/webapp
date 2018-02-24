<template>
	<div id="exchange">
		<div class="js"></div>
		<div class="content">
			<input type="text" class="ipt" placeholder="请输入兑换码" v-model="ex_code">
			<i class="fa fa-times" aria-hidden="true" v-if="close_show" @click="clear_code"></i>
		</div>
		<div class="js"></div>
		<button class="btn" :class="{blue:close_show}" @click="save">确认并保存</button>		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				ex_code:'',
				close_show:false,
				url:''
			}
		},
		mounted:()=>{
			$('#exchange .ipt').css('width','96%');
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {	
			}, function() {
			});			
		},
		watch:{
			ex_code(){
				if(this.ex_code.length>0){
					$('#exchange .ipt').css('width','88%');
					this.close_show=true;
				}else{
					$('#exchange .ipt').css('width','96%');
					this.close_show=false;
				}
			}
		},
		methods:{
			//清除兑换码
			clear_code(){
				this.ex_code='';
			},
			//保存
			save(){
				const self =this;
				let url = self.url+'discount/exchange';
				let data ={
					'uid':self.$store.state.userinfo.id,
					'coupon_code':self.ex_code
				};
		        let success=function(res){
		       		if(res.data.code == 200){
		       			self.$config.throw_notice('兑换成功,请返回优惠页查看');
		       			self.ex_code='';
		       		}else{
		       			self.$config.throw_notice(res.data.msg);
		       		}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'post',data,success,error);  				
			},

		}
   }
</script>
<style scoped lang="scss">
@mixin gloal{
   width:28.8rem; 
   padding:0.6rem;
   text-align: left;
    margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#exchange{
	width: 30rem;
}
.js{
	clear: left;
	width: 100%;
	height: 0.6rem;
}
.content{
	@include gloal;
	background-color: #fff;
	padding-bottom: 0px;
	.ipt{
		margin-left: 1%;
		height: 2.4rem;
		border: 1px solid #EAEAEA;
		background-color: #F2F2F2;
		@include font(1.1rem,2rem,#000);
		padding-left: 2%;
		margin-bottom: 0.6rem;
	}
	i{
		float: right;
		font-size: 1.8rem;
		color:#666;
		line-height: 2.8rem;
		margin-right: 0.2rem;
	}
}
.btn{
	width: 28.6rem;
	border: 0px;

	border-radius: 0.5rem;
	text-align: center;
	height: 3rem;
	@include font(1.3rem,2.8rem,#fff);
}
.blue{
	background-color: #0097FF;
}	
</style>

