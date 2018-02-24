<template>
	<div id="mobile">
		<div class="old" v-if="old">
			<div class="js"></div>
			<div class="lis">
				<span class="left">手机号</span>
				<span class="left" style="margin-left: 3rem;font-size: 1.1rem">{{ $store.state.userinfo.moblie | strHidden(3,3) }}</span>
				<span class="right"><mt-button type="primary" @click="get_code" :disabled="!downtime">{{code_text}}</mt-button></span>
				<div style="clear: both;"></div>
			</div>
			<div class="lis">
				<span class="left">验证码</span>
				<span class="left" style="margin-left: 3rem;font-size: 1.1rem"><input type="text" placeholder="请输入验证码" v-model="code"></span>
				<div style="clear: both;"></div>
			</div>
			<div class="js" style="height: 1rem"></div>
			<button class="btn" :class="{blue:btn_enabled}" :disabled="!btn_enabled" @click="bind_moblie">验证后绑定信息手机号</button>
		</div>
		<div class="new" v-if="!old">
			<div class="js"></div>
			<div class="lis">
				<span class="left" style="width: 7rem;">新手机号</span>
				<span class="left" style="font-size: 1.1rem"><input type="text" placeholder="请输入手机号" v-model="new_moblie" style="width: 11rem;margin-top:0.2rem"></span>
				<span class="right"><mt-button type="primary" @click="get_code" :disabled="!downtime">{{code_text}}</mt-button></span>
				<div style="clear: both;"></div>
			</div>
			<div class="lis">
				<span class="left" style="width: 7rem;">验证码</span>
				<span class="left" style="font-size: 1.1rem"><input type="text" placeholder="请输入验证码" v-model="new_code" ></span>
				<div style="clear: both;"></div>
			</div>
			<div class="js" style="height: 1rem"></div>
			<button class="btn" :class="{blue:!new_btn_enabled}" :disabled="new_btn_enabled" @click="bind_success">验证后绑定手机号</button>
		</div>			 
	</div>
</template>
<script>
	export default{
		data(){
			return{
				result_str:'',
				code:'',
				new_code:'',
				btn_enabled:false,
				user_data:{
					username:'象山吴彦祖',
					photo:'',
					mobile:'18205859672'
				},
				new_moblie:'',
				new_btn_enabled:false,
				old:true,
				downtime:true,
				url:'',
				clock_i:60,
				code_text:'发送验证码',
				clock:''
			}
		},
		created:function(){
			//获取用户信息
			this.$store.dispatch('getUserinfo');	
			this.url=this.$config.url;
		},
		watch:{
			code(){
				this.btn_enabled= this.code != '';
			},
			new_code(){
				this.new_btn_enabled= this.result_str == this.new_code;
			}
		},
		methods:{
			//获取验证码
			get_code(){
				let mobile_reg=/^[1][3,4,5,7,8][0-9]{9}$/;	
				
				if(this.old==false){
					if(!mobile_reg.test(this.new_moblie)){
						this.$config.throw_notice('手机号填写错误');
						return;	
					}
				}else{
					this.new_moblie=this.$store.state.userinfo.moblie;
				}
				this.ajax();
			},
			ajax(){
				const self=this;
            	let url = self.url +'validate/message?tel='+self.new_moblie;
                let success=function(res){
					 if(res.data.code == 200){
					 	self.downtime=false;
						self.$cookie.set('SID',res.data.data.sid, { expires: '3m' });	
						self.clock=setInterval(self.startdown,1000);		 	
					 }else{
					 	self.$config.throw_notice(res.data.msg);
                     }                      
                }
                let error = function(res){
                	self.$config.throw_notice('失败');
                }
                self.$config.apirequest(url,'get',[],success,error);	
			},
			//启动倒计时
			startdown(){
				const self=this;
				self.clock_i--;
				self.code_text =self.clock_i+'s后重新发送'
				if(self.clock_i<=0){
					self.end_time();
				}
			},
			end_time(){
				clearInterval(this.clock);
				this.downtime=true;
				this.clock_i=60;
				this.code_text='发送验证码';
			},
			bind_moblie(){
				let SID = this.$cookie.get('SID');
				const self = this;
            	let url = self.url +'user/checkcode?code='+this.code+'&SID='+SID+'&moblie='+self.new_moblie;
                let success=function(res){
					 if(res.data.code == 200){
					 	self.old=false;
					 	self.end_time();
					 	self.new_moblie='';
					 }else{
					 	self.$config.throw_notice('验证码错误');
                     } 
                }
                let error = function(res){
                	self.$config.throw_notice('验证异常');
                }
                self.$config.apirequest(url,'get',[],success,error);						
			},
			bind_success(){
				if(this.new_moblie == this.$store.state.userinfo.moblie){
					this.$config.throw_notice('不能与原手机号相同');
					return;
				}
				let SID = this.$cookie.get('SID');
				const self = this;
            	let url = self.url +'user/bindmoblie';
            	let data = {
            		SID:SID,
            		code:self.new_code,
            		moblie:self.new_moblie,
            		uid:this.$store.state.userinfo.id
            	};
                let success=function(res){
					 if(res.data.code == 200){
					 	self.$cookie.set('userID',res.data.data.userID, { expires: '7D' });	
					 	self.$config.throw_notice('更换手机号成功');
					 	self.$router.go(-1);
					 }else{
					 	self.$config.throw_notice('验证码错误');
                     } 
                }
                let error = function(res){
                	self.$config.throw_notice('网络异常');
                }
                self.$config.apirequest(url,'post',data,success,error);
			}
		}
   }
</script>

<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:0.7rem;
   text-align: left;
    margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#mobile{
	width: 30rem;
}
.js{
	width: 100%;
	height: 1rem;
	clear: left;
}
.lis{
	@include gloal;
	background-color: #fff;
	border-bottom: 1px solid #eee;
	.left{
		float: left;
		@include font(1.3rem,2rem,#000);
		input{
			width: 15rem;
			height: 1.6rem;
			@include font(1.1rem,1.5rem,#000);
			border: 0px;
			outline:none;
		}
	}
	.right{
		float:right;
	}
}
.btn{
	width: 28.6rem;
	border: 0px;

	border-radius: 0.5rem;
	text-align: center;
	height: 3.5rem;
	@include font(1.3rem,3.3rem,#fff);
}
.blue{
	background-color: #0097FF;
}		
</style>