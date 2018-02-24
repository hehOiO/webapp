<template>
	<div id="register">
		<div style="width: 30rem;height: 3rem;"></div>
		<div class="webicon">
			<router-link :to="{path:'/'}"><div class="img">
				<img src="/static/images/webflag.png" alt="">
			</div></router-link>
		</div>
		<div class="input" v-if="select_mode == 'model3'">
			<div class="body">
				<div class="content">
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="text" placeholder="邮箱/用户名" v-model="form.username"></div>
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="password" placeholder="密码" v-model="form.password"><span class="btn" style="top:0.9rem"></span></div>
					<button @click="confirm">确定</button>
					<p><span @click="select_mode='model1'">返回上一级</span></p>
				</div>				
			</div>
		</div>
		<div class="input" v-if="!(select_mode == 'model3')">
			<div class="label">
				<div class="font">
					<span class="f1" :class="{blue_line:select_mode == 'model1'}" @click="select_mode = 'model1'">短信登录</span>
					<span class="f2" :class="{blue_line:select_mode == 'model2'}" @click="select_mode =  'model2'">密码登录</span>
					<div style="clear:both;"></div>
				</div>
			</div>
			<div class="body">
				<div class="content" v-if="select_mode == 'model1'">
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="text" placeholder="手机号" maxlength="11" v-model="moblie"><span class="btn" @click="send_code" :class="{blue:moblie_enable}">{{ code_text }}</span></div>
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="text" placeholder="验证码" v-model="code"></div>
					<div class="xy">温馨提示：未注册淘点帐号的手机号，登录时将自动注册，且代表您已同意<router-link :to="{path:'other/xy'}">《用户服务协议》</router-link></div>
					<button @click="register">注册</button>
				</div>
				<div class="content" v-if="select_mode == 'model2'">
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="text" placeholder="手机号/邮箱/用户名" v-model="form.username"></div>
					<div style="width: 100%;position: relative;margin-bottom: 1rem"><input type="password" placeholder="密码" v-model="form.password"><span class="btn" style="top:0.9rem"></span></div>
					<button @click="login">登录</button>
				</div>
				<div class="content">
					<p><router-link :to="{path:'/other/about'}" style="margin-right: 2rem;">关于我们</router-link><router-link :to="{path:'/'}">返回主页</router-link></p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				select_mode:'model1',
				input_mode:'password',
				input_value:false,
				url:'',
				moblie:'',
				moblie_enable:false,
				downtime:true,
				code_text:'发送验证码',
				clock:'',
				clock_i:60,
				code:'',
				form:{
					username:'',
					password:''					
				},
				sessionid:'',
				sessionnum:''
			}
		},
		created:function(){
			this.url=this.$config.url;
		},
		watch:{
			input_value(){
				if(this.input_value){
					this.input_mode='text';
				}else{
					this.input_mode='password';
				}
			},
			//监听手机号变化
			moblie(){
				let moblie_reg=/^1[3|4|5|7|8][0-9]{9}$/;
				if(moblie_reg.test(this.moblie) && this.downtime){
					this.moblie_enable=true;
				}else{
					this.moblie_enable=false;
				}
			},
			//监听倒计时
			downtime(){
				if(this.downtime){
					this.moblie_enable=true;					
				}else{
					this.clock=setInterval(this.startdown,1000);
					this.moblie_enable=false;
				}
			}
		},
		methods:{
			//发送验证码
			send_code(){
				const self = this;
				if(!self.moblie_enable){
					return;
				}
            	let url = self.url +'validate/message?tel='+this.moblie;
                let success=function(res){
					 if(res.data.code == 200){
					 	self.data = res.data.data;	
					 	self.downtime=false;

						self.$cookie.set('SID',self.data.sid, { expires: '3m' });			 	
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
					clearInterval(self.clock);
					self.downtime=true;
					self.clock_i=60;
					self.code_text='发送验证码';
				}
			},
			//注册
			register(){
				let SID = this.$cookie.get('SID');
				const self = this;
				if(this.code == '' || this.moblie == ''){
					self.$config.throw_notice('手机号或验证码未填写');
					return false;
				}
            	let url = self.url +'user/mb_register?code='+this.code+'&SID='+SID+'&moblie='+self.moblie;
                let success=function(res){
					 if(res.data.code == 200){
					 	 if(res.data.data.model == 0){
					 	 	self.select_mode = 'model3';

					 	 }else{

					 	 	self.$cookie.set('userID',res.data.data.userID, { expires: '7D' });	
					 	 	self.$router.push({path:'/menu_user'});
					 	 }
					 }else{
					 	self.$config.throw_notice('验证码错误');
                     } 
                }
                let error = function(res){
                	self.$config.throw_notice('验证异常');
                }
                self.$config.apirequest(url,'get',[],success,error);				
			},
			confirm(){
				const self = this;
				let data=self.form;
				data.moblie=self.moblie;
            	let url = self.url +'user/register';
                let success=function(res){
					 if(res.data.code == 200){
							self.$config.throw_notice('注册成功');
							window.location.reload();
					 }else{
					 	self.$config.throw_notice(res.data.msg);
                     }                      
                }
                let error = function(res){
                	self.$config.throw_notice('注册失败');
                }
                self.$config.apirequest(url,'post',data,success,error);					
			},
			login(){
				const self = this;
				let data=self.form;
            	let url = self.url +'user/login';
                let success=function(res){
					 if(res.data.code == 200){
					 	self.$cookie.set('userID',res.data.data.userID, { expires: '7D' });	
					 	self.$router.push({path:'/menu_user'});
					 }else{
					 	self.$config.throw_notice('登录失败');
                     } 
                }
                let error = function(res){
                	self.$config.throw_notice('登录异常');
                }
                self.$config.apirequest(url,'post',data,success,error);					
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
#register{
	width: 30rem;
	height: 53rem;
	background: #fff;
}
.webicon{
	width: 30rem;
	height: 5rem;
	.img{
		width: 12rem;
		height: 5rem;
		margin:0 auto;
		img{
			width: 100%;
			height:100%;
		}
	}
}
.input{
	width: 30rem;
	margin-top: 3rem;
	.label{
		width: 100%;
		.font{
			width: 12rem;
			margin:0 auto;
			span{
				@include font(1.1rem,2.2rem,#000);
			}
			.f1{
				float: left;
			}
			.f2{
				float: right;
			}
			.blue_line{
				border-bottom: 3px solid #45AFFF;
			}
		}
	}
	.body{
		margin-top: 2rem;
		width: 24rem;
		padding: 0 3rem;
		.content{
			width: 100%;
			input{
				width: 95%;
				padding-left: 3%;
				border:1px solid #DDDDDD;
				height: 3.5rem;
				border-radius: 0.5rem;
				@include font(1.2rem,2.2rem,#000);
			}
			.btn{
				position: absolute;
				z-index: 1;
				right: 1rem;
				@include font(1.1rem,3.5rem,#999);
			}
			.blue{
				color:#1B9DFF;
			}
			.xy{
				width: 100%;
				text-align: left;
				@include font(1.1rem,1.8rem,#999);
				margin-bottom:1.5rem;
				a{
					@include font(1.1rem,1.8rem,#45AFFF);
				}
			}
			button{
				width: 100%;
				border: 0;
				height: 3.2rem;
				background-color:#4CD96F;
				@include font(1.3rem,1.8rem,#fff);
				border-radius: 0.5rem;
				margin-bottom: 1rem;
			}
			p{
				width: 100%;
				@include font(0.95rem,1.8rem,#999);
				a{
					@include font(0.95rem,1.8rem,#999);
				}
			}
		}
	}
}
</style>

