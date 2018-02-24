<template>
	<div id="detail">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="红包">红包</mt-tab-item>
		  <mt-tab-item id="代金券">商家代金券{{coupon.length}}张</mt-tab-item>
		</mt-navbar> 
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="红包">
				<redpacket :packetData="packetData"></redpacket>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="代金券">
				<business-coupon :coupon="coupon"></business-coupon>
		  </mt-tab-container-item>

		</mt-tab-container>
	</div>
</template>
<script>
	//红包
	import redpacket from './packet'
	//商家代金券
	import businessCoupon from './coupon'
	export default{
		data(){
			return{
				selected:'红包',
				packetData:[

				],
				coupon:[
					{
						name:'棒槌烧麦代金券',
						money_int:'1',
						money_decimal:'2',
						condition:'满20元可用',							
						date:'2017-09-28到期',
						//额外条件
						attach_condition:'限手机号18205859672使用',
						surplus:'剩2日',
						//地区条件
						address_condtion:'限杭州地区使用'
					},
					{
						name:'学长的炸鸡汉堡',
						money_int:'2',
						money_decimal:'5',
						condition:'满30元可用',							
						date:'2017-09-28到期',
						surplus:'剩2日'
					}					
				]
			}
		},
		components:{
			redpacket:redpacket,
			businessCoupon:businessCoupon
		},
		created:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {	
				self.get_red_info();
			}, function() {

			});					
		},
		methods:{
			get_red_info(){
				const self =this;
				let url = self.url+'discount/getRedInfo/'+self.$store.state.userinfo.id;
		        let success=function(res){
		        	if(res.data.code == 200){
		        		self.packetData=res.data.data;

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
<style>
.mint-navbar{
	margin-top: -1px;
	background-color: #26A2FF;
	color:rgba(255,255,255,0.7);
}
.mint-navbar .is-selected .mint-tab-item-label{
	color:#fff;	

}
#detail .mint-navbar .is-selected{
	border-bottom: 0;
}
#detail .mint-navbar .mint-tab-item-label{
	font-size: 1.1rem;
}

</style>
