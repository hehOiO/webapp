<template>
	<div id="timelimit">
		<div class="topbar">
			<div class="lab_area">
				<div class="labs" v-for="(item,index) in nav_data" :class="{blue_bg:item.id == item }" @click="change_lab(item)">{{ item | get_name}}</div>
			</div>
		</div>
		<div class="js" style="height:4.2rem"></div>	
		<div class="good_lis" v-for="(item,index) in local_data">
			<router-link :to="{path:'/shop',query:{id:item.shop_id}}">
				<div class="shopinfo">
					<span class="icon"><img src="/static/images/house.png" alt=""></span>
					<span class="shopname">{{ item.shopname }}</span>
					<div style="clear: both;"></div>
				</div>
			</router-link>
			<div class="goodsinfo" v-for>
				<div class="img">
					<img :src="item.food_img" alt="">
				</div>
				<div class="text">
					<p class="p1">{{ item.food_name }}</p>
					<p class="p2">仅剩下{{ item.surplus }}份</p>
					<div class="p3">
						<div class="line_area">
							<div class="bc"></div>
							<div class="lc" :style="{width:(item.surplus/item.num)*100+'%'}"></div>
						</div>
					</div>
					<div class="p4"><span class="yh"><span style="font-size: 0.9rem">￥</span>{{ item.new_price }}</span><span class="yj">￥{{ item.old_price }}</span></div>
				</div>
				<div class="btn"><timedown :time="item.start_time" :href="{path:'/shop'}" ></timedown></div>
				<div style="clear: both;"></div>
			</div>
		</div>
	</div>
</template>
<script>
import timedown from '../../../components/private/timedown'
	export default{
		data(){
			return{
				lab_indexof:1,
				local_data:[],
				url:'',
				old_data:'',
			}
		},
		created:function(){
			const self = this;
			self.url=self.$config.url; 
			//获取限时抢购信息
			self.get_limit_data();

		},
		mounted:function(){

		},
		components:{
			timedown
		},
		filters:{
			get_name(value){
				let typename=['早餐','午餐','下午茶','晚餐','夜宵'];
				return typename[value-1];
			}
		},
		computed:{
			nav_data(){
				let data=new Array();
				if(this.old_data != ''){
					this.old_data.forEach(function(value, index, array) {
						data[index]=value['type'];
					});
					data = [...new Set(data)];
					return data;
				}
			},
		},
		methods:{
			get_Data(typeid){
				for(let i=0;i<this.old_data.length;i++){
					if(this.old_data[i].type == typeid){

						this.local_data.push(this.old_data[i]);
					}
				}
			},
			change_lab(id){
				this.local_data=[];
				this.lab_indexof=id;
				this.get_Data(this.lab_indexof);
			},
			get_limit_data(){
				const self =this;
				let url = self.url+'activity/limittime/getInfo';
		        let success=function(res){
					if(res.data.code == 200){
						self.old_data = res.data.data;
						self.lab_indexof=self.old_data[0].type;
						self.get_Data(self.lab_indexof); 
					}else{
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
    background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#timelimit{
	width: 30rem;
}
::-webkit-scrollbar {
	display: none;
}
.js{
	width: 100%;
	clear: left;
	height: 1rem;
}
.topbar{
	padding: 0.4rem 1rem;
	background-color: #fff; 
	position: fixed;
	z-index: 2;
	width:28rem;
	overflow-x:scroll;
	overflow-y:hidden;
	box-shadow: 1px 1px 3px #ccc;
	.lab_area{
		width: 37rem;
		.labs{
			text-align: center;
			height: 3rem;
			@include font(1rem,3rem,#000);
			width: 7rem;
			background-color: #F5F5F5;
			margin-right: 0.3rem;
			float: left;
		}
		.blue_bg{
			color:#fff;
			background: url('/static/images/bluejbian.png') no-repeat;
			background-size: 100%;
		}		
	}

}

.good_lis{
	@include gloal;
	background: #fff;
	margin-bottom: 0.5rem;
	.shopinfo{
		width: 100%;
		@include font(0.95rem,2rem,#999);
		.shopname{
			float: left;
		}
		.other{
			float: right;
		}
		.icon{
			float: left;
			margin-right: 0.3rem;
			margin-top: 0.1rem;
			img{
				width: 0.95rem;

			}
		}
	}
	.goodsinfo{
		margin-top: 0.8rem;
		width: 100%;
		.img{
			float: left;
			width: 7rem;
			height: 7rem;
			margin-right: 1rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			float: left;
			.p1{
				@include font(1.3rem,2rem,#000);
				font-weight: bold;
			}
			.p2{
				@include font(0.85rem,2rem,#FF3D21);
			}
			.p3{
				.line_area{
					width: 9rem;
					position: relative;
					.bc{
						width: 100%;
						height: 0.6rem;
						background: #DDDDDD;
						border-radius: 0.3rem;
						position: absolute;
						top:0;
					}
					.lc{
						@extend .bc;
						z-index: 1;
					    background-image: -webkit-linear-gradient(left, #ff8355, #ff5757);
					    background-image: -o-linear-gradient(left, #ff8355, #ff5757);
					    background-image: linear-gradient(to right, #ff8355, #ff5757);
					}
				}
			}
			.p4{
				position: relative;
				top:1rem;
				.yh{
					@include font(1.5rem,2rem,#FF3D21);
					margin-right: 0.4rem
				}
				.yj{
					@include font(0.9rem,2rem,#999);
				}
			}
		}
		.btn{
			float: right;

		}
	}
}
</style>
