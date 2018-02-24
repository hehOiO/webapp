<template>
	<div id="detail">
		<div class="lis" v-for="(item,index) in address_data" >
			<div class="info" @click="address_checkout(item.id)">
				<p class="base"><span style="font-weight: bold;color:#000;line-height: 1.8rem;">{{ item.name }}</span>&nbsp;{{ item.sex}} {{ item.moblie }}</p>
				<p class="address"><span class="lab blue" :class="{red:item.label == '家'?true:false }" v-if="item.label">{{item.label}}</span>{{ item.address+item.tz_address | address_substr}}</p>
			</div>
			<div class="icon">
				<router-link :to="{path:'/address/edit',query:{id:item.id}}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></router-link>
			</div>
			<div style="clear: both"></div>
		</div>
		<router-link :to="{path:'/address/edit'}"><div class="add_class">
			<i class="fa fa-plus-square-o" aria-hidden="true" style="margin-right: 0.3rem"></i> 新增收货地址
		</div></router-link>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				address_data:[
				],
				uid:'',
				url:''
			}
		},
		created:function(){
			const self=this;
			//获取用户信息
			self.$store.dispatch('getUserinfo').then(() => {
				self.get_info();
			})	
			self.url=self.$config.url;

		},
		mounted:function(){
			
		},
	    filters: {
	        address_substr: (value)=>{
	            return value.length>18?value.substr(0,18)+'...':value;
	        }
	    },
	    watch:{

	    },	
		methods:{
			//获取用户信息
			get_info(){
				const self=this;
				let uid = self.$store.state.userinfo.id;
            	let url = self.url +'user/address/get_info/'+uid;
                let success=function(res){
					if(res.data.code == 200){
						self.address_data=res.data.data;
					}else{
						this.$config.throw_notice('获取地址信息失败')
					}       
                }
                let error = function(res){
                	self.$config.throw_notice('失败');
                }
                self.$config.apirequest(url,'get',[],success,error);	
			},
			address_checkout(id){
				const self=this;
				let uid = self.$store.state.userinfo.id;
            	let url = self.url +'user/address/checkout/'+id+'?order_number='+self.$route.query.order_number;
                let success=function(res){
					if(res.data.code == 200){
						self.$router.go(-1);
					}else{
						self.$config.throw_notice(res.data.msg);
						self.$router.go(-1);
					}       
                }
                let error = function(res){
                	self.$config.throw_notice('网络异常');
                }
                self.$config.apirequest(url,'get',[],success,error);					
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
#detail{
	width: 30rem;
}
.lis{
	@include gloal;
	background-color: #fff;
	border-bottom: 1px solid #ccc;
	.info{
		float: left;
		.base{
			@include font(1.4rem,1.8rem,#666);
		}
		.address{
			@include font(1.1rem,1.8rem,#666);
			.lab{
				padding: 0 0.2rem;
				text-align: center;
				margin-right: 0.3rem;
				color: #fff;
			}
			.blue{
				background-color: #2395FF;
			}
			.red{
				background-color:#FF5722;
			}
		}
	}
	.icon{
		float: right;
		@include font(1.6rem,3.6rem,#666);
		a{
			color:#666;
		}

	}
}
.add_class{
	width:30rem;
	height: 4.5rem;
	background-color: #fff;
	position: fixed;
	bottom:0;
	text-align: center;
	@include font(1.4rem,4.4rem,#3190E8);

	border: 1px solid #ddd;
}
</style>