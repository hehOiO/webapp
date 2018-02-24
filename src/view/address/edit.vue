<template>
	<div id="edit">

		<div class="lis">
			<div class="lab">联系人</div>
			<div class="ipt">
				<div><input type="text" placeholder="请输入您的姓名" v-model="person_info.name"></div>
				<div class="sex_attr">
					<span class="sex_lab" :class="{blue:person_info.sex == '先生'}" @click="person_info.sex='先生'">先生</span>
					<span class="sex_lab" :class="{blue:person_info.sex == '女士'}" @click="person_info.sex='女士'">女士</span>
					<div style="clear: left;"></div>
				</div>
			</div>	
			<div style="clear: both"></div>	
		</div>
		<div class="lis">
			<div class="lab">电话</div>
			<div class="ipt">
				<div >
					<input type="text" placeholder="请输入您的手机号" v-model="person_info.moblie" style="float: left;">
					<i class="fa fa-plus" aria-hidden="true" @click="tz_moblie_show =!tz_moblie_show"></i>
					<div style="clear: both"></div>
				</div>
				<div  v-if="tz_moblie_show" style="margin-top: 1rem;">
					<input type="text" placeholder="备用手机号" v-model="person_info.tz_moblie">
				</div>
			</div>	
			<div style="clear: both"></div>	
		</div>
		<div class="lis">
			<div class="lab">地址</div>
			<div class="ipt">
				<div>    
					<input type="text" placeholder="请输入您的地址" v-model="person_info.address" @focus="showPicker">
					<my-address :showAddressPicker="showAddressPicker" @save-address="saveAddress" @hide-picker="hidePicker" :init="person_info.address"></my-address>
    			</div>
				<div class="tz_address">
					<textarea placeholder="详细地址" v-model="person_info.tz_address"></textarea>
				</div>
			</div>	
			<div style="clear: both"></div>	
		</div>
		<div class="lis">
			<div class="lab">标签</div>
			<div class="ipt">
				<div class="sex_attr" style="margin-top: 0">
					<span class="sex_lab" :class="{blue:person_info.label == '家'}" @click="person_info.label='家'">家</span>
					<span class="sex_lab" :class="{blue:person_info.label == '学校'}" @click="person_info.label='学校'">学校</span>
					<span class="sex_lab" :class="{blue:person_info.label == '公司'}" @click="person_info.label='公司'">公司</span>
					<div style="clear: left;"></div>
				</div>
			</div>	
			<div style="clear: both"></div>	
		</div>
		<button class="btn green" @click="keep">确认并保存</button>

	</div>
</template>
<script>
	import MyAddress from '../../components/address-picker/Address.vue'
	export default{
		data(){
			return{
		        showAddressPicker: false,
		        person_info:{},
		        tz_moblie_show:false,
		        validation1:'',
		        id:''
			}
		},
		created:function(){
			//获取用户信息
			this.$store.dispatch('getUserinfo');	
			this.url=this.$config.url;
			this.person_info={
		        	name:'',
		        	sex:0,
		        	moblie:'',
		        	tz_moblie:'',
		        	address:'',
		        	tz_address:'',
		        	label:''
		     }
		   this.id = this.$route.query.id ;

		},
	    components: {
	      MyAddress,

	    },
	    watch:{
	    	person_info(){
	    		if(this.person_info.tz_moblie!=undefined){
	    			if(this.person_info.tz_moblie !=''){
	    				this.tz_moblie_show=true;

	    			}	    			
	    		}
	    	},
	    	id(){
	    		if(this.id != undefined){
	    			this.fetch_info();
	    			this.person_info.id=this.id;
	    		}
	    	}
	    },
		methods:{
	      hidePicker() {
	        this.showAddressPicker = false
	      },
	      showPicker() {
	        this.showAddressPicker = true
	      },
	      saveAddress(val) {
	        this.person_info.address = val
	        this.showAddressPicker = !this.showAddressPicker
	      },
	      //保存地址
	      keep(){
				const self = this;
				let data = self.person_info;
				data.uid=this.$store.state.userinfo.id;
            	let url = self.url +'user/address/insert';
            	data.coordinate = data.address.replace(/-/g,'')+data.tz_address;
                let success=function(res){
					if(res.data.code == 200 ){
						if(self.id != undefined){
							self.$config.throw_notice('地址修改成功');
						}else{
							self.$config.throw_notice('新地址填写成功');
						}	
						self.$router.go(-1);
					}else{
						self.$config.throw_notice(res.data.msg);
					}               
                }
                let error = function(res){
                	self.$config.throw_notice('失败');
                }
                self.$config.apirequest(url,'post',data,success,error);	
	      },
	      fetch_info(){
				const self=this;
            	let url = self.url +'user/address/fetch_info/'+this.id;
                let success=function(res){
                	if(res.data.code == 200){
                		self.person_info=res.data.data;
                	}else{
                		self.$config.throw_notice('获取地址信息失败');
                		self.$router.go(-1);
                	}
                }
                let error = function(res){
                	self.$config.throw_notice('失败');
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
#edit{
	width: 30rem;
}	
.lis{
	@include gloal;
	background-color: #fff;
	border-bottom:1px solid #ddd;
	.lab{
		float: left;
		@include font(1.3rem,2.2rem,#000);
		font-weight: bold;
		width: 6rem;
	}
	.ipt{
		float: left;
		width: 21rem;
		input{
			width: 18rem;
			height: 2rem;
			@include font(1.1rem,1.8rem,#000);
			border:0;
			outline-style: none;
		}
		i{
			float: right;
			font-size: 1.5rem;
			line-height: 2.2rem;
			color:#0D95EB;
		}
		.tz_address{
			margin-top: 1rem;
			width: 18rem;
			textarea{
				width: 100%;
				border: 0;
				outline: none;
				@include font(1.1rem,2.1rem,#000);
			}	
		}
		.sex_attr{
			margin-top: 1rem;
			width: 18rem;
			.sex_lab{
				float: left;
				text-align: center;
				padding: 0 1.2rem;
				border:1px solid #ddd;
				margin-right: 1.5rem;
				@include font(1.1rem,2.1rem,#000);
			}
			.blue{
				background-color:#EEF7FF;
				color:#2395FF;
			}

		}
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
.green{
	background-color: #00D762;
}

</style>

