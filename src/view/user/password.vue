<template>
	<div id="password">
		<div class="content">
			<input type="password" class="ipt" placeholder="旧密码" v-model="old_password" >
			<input type="password" class="ipt" placeholder="新密码" v-model="new_password">
			<input type="password" class="ipt" placeholder="确认密码" v-model="confirm">
		</div>
		<button class="btn blue" @click="keep">确认并保存</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				old_password:'',
				new_password:'',
				confirm:'',
				url:''
			}
		},
		created:function(){
			//获取用户信息
			this.$store.dispatch('getUserinfo');	
			this.url=this.$config.url;		
		},
		methods:{
			keep(){
				const self=this;
				let data = {
					old_password:self.old_password,
					new_password:self.new_password,
					confirm:self.confirm,
					uid:self.$store.state.userinfo.id
				}
            	let url = self.url +'user/changepassword';
                let success=function(res){
                  	if(res.data.code == 200){
                  		self.$cookie.set('userID',res.data.data.userID, { expires: '7D' });	
                  		self.$config.throw_notice('修改成功');
                  		self.$router.go(-1);
                  	}else{
                  		self.$config.throw_notice(res.data.msg);
                  	}
                }
                let error = function(res){
                	console.log('网络异常');
                }
                self.$config.apirequest(url,'post',data,success,error);
			}
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
.content{
	@include gloal;
	background-color: #fff;
	padding-bottom: 0px;
	.ipt{
		width: 96%;
		margin-left: 1%;
		height: 2.4rem;
		border: 1px solid #EAEAEA;
		background-color: #F2F2F2;
		@include font(1.1rem,2,#000);
		padding-left: 2%;
		margin-bottom: 0.6rem;
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

