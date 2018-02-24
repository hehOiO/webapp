<template>
	<div id="shop">
		<div class="header">
			<div class="summary">
              <ul>
                  <li>
                      <div class="img">
                       <img :src="shop_base_info.shopimg" alt="">
                      </div>
                      <div class="text">
                          <div class='p1'>{{ shop_base_info.shopname }}</div>
                          <div class="p2">{{ shop_base_info.DC_method }}/{{ shop_base_info.need_time+'分钟' }}送达/配送费￥{{ shop_base_info.price }}</div>
                          <div class="p3"><span style="margin-right: 0.3rem">公告：</span><span>{{ shop_base_info.gonggao }}</span>
                          </div>    
                      </div>
                      <div style="clear: left;"></div>
                  </li>
              </ul>
              <div style="clear: left;"></div>
              <div class="gg">
              		<div><i class="gzt i-green">首</i><span style="float: left;">新用户首单立减18元</span><span style="float: right;" @click="black_curtain_show(true)">4个活动&nbsp;<i class="fa fa-chevron-right" aria-hidden="true" ></i></span></div>
              </div>				
			</div>
		</div>
		<div class="body">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">商品</mt-tab-item>
			  <mt-tab-item id="2">评价</mt-tab-item>
			  <mt-tab-item id="3">店铺</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="1">
				<div class="goods wq5">
					<div class="cl">
						<ul>
							<li v-for="(item,index) in nav_data" :class="{'is_select':index == is_select?true:false}" @click="gotonav(index,'#'+item.link)"><div><img src="/static/images/hot.jpeg" v-if="item.icon">&nbsp;{{ item.type_name }} <span :attrnum="item.num" v-if="item.num>0"></span></div></li>
						</ul>		
					</div>
					<div class="zt">
						<div :id="item.link" class="label" v-for="(item,index) in nav_data">
							<div class="title">
								<div style="float: left;"><span class="bd">{{ item.type_name }}</span>
								{{ item.type_summary }}</div>
								<div class="abstract" ><span @click="type_summary_visible(index)">...</span>
									<div class="toast" @click="type_summary_visible(index)" v-if="item.summary_show"><span class="i"></span>{{ item.type_name }}&nbsp;{{ item.type_summary }}</div>
								</div>
							</div>
							<div class="centent">
								<ul>
									<li v-for="(lis,key) in item.food">
										<div class="img" @click="show(key,index)">
											<img :src="lis.food_img" alt="">
										</div>
										<div class="txt">
											<p class="p1" @click="show(key,index)">{{ lis.food_name }}</p>
											<p class="p2" style="color:#999" @click="show(key,index)">{{ '暂无简介' ||lis.food_summary }}</p>
											<p class="p3" @click="show(key,index)">月销:{{ lis.month_sales_volume+'份' || 0}}&nbsp;总销:{{ lis.sales_volume+'份' || 0 }}&nbsp;好评率:{{ lis.total_evaluate==0?0+'%':Math.floor(lis.praise/lis.total_evaluate*100)+'%' }}</p>
											<div class="price">￥{{ lis.price}}
												<div class="more">
												<numcompute @pricejs="pricecomputed" :food="lis" :goodsnum="lis.num" :link="item.link" :typeid="item.id"></numcompute>
												</div>
											</div>
										</div>
										<div style="clear: left;width: 100%;"></div>
									</li>


								</ul>
							</div>
							<div style="clear: left;"></div>
						</div>
						<div id="jk" class="label">
						</div>
						<div style="width:100%;height:4.5rem"></div>
					</div>
						<div style="width: 100%;height: 4.2rem"></div>
						<div class="buy">
									<div class="shop_car" v-if="shop_car_visible">									
										<div class="nav">
											<span style="font: 2rem/2.9rem '微软雅黑';font-weight: bold;color:#3190E8;float: left;margin-right: 0.5rem">|</span>
											<span class="bt">购物车</span>
											<span class="clear" @click="clear_car"><i class="fa fa-trash-o" aria-hidden="true" style="margin-right: 0.4rem"></i>清空</span>
											<div style="clear:both;"></div>
										</div>
										<div class="car_body">
											<div style="clear: left;width: 100%;height: 0.8rem;"></div>
											<ul>
												<li>
													<span style="float: left;">迷宗烧麦/5只</span>
													<span style="float: right;margin-top:0.15rem"><numcompute></numcompute></span>
													<span style="float: right;color:#FF6600;font-weight: bold;margin-right: 1rem">￥14</span>
													<div style="clear: both;width: 100%;height: 1.2rem;"></div>
												</li>
											</ul>
										</div>
									</div>
								<div style="width: 100%;position: relative;">
									<div class="shop_icon" :class="{'blue':total_num >0?true:false}" @click="shop_car">
										<span :attrnum="total_num" v-if="total_num>0?true:false"></span>
										<i class="fa fa-shopping-cart" aria-hidden="true" style="margin-top: 0.6rem"></i>
									</div>
									<div class="total_price">
										<p class="p1">￥{{ total_price<=0?0:total_price+shop_base_info.price  }}</p>
										<p class="p2">配送费￥{{ shop_base_info.price }}</p>
									</div>
									<div class="cmt">
										<span v-if="shop_base_info.start_fee-total_price > 0?true:false"><span v-if="total_price>0">还差</span>￥{{ shop_base_info.start_fee-total_price }}起送</span>
										<button class="btn" v-if="shop_base_info.start_fee-total_price <= 0?true:false" @click="bulid_order">去付款</button>
									</div>
								</div>
						</div>
				</div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">
				 <div class="comment wq5">
				 	<div class="js" style="height: 0.3rem;"></div>
					<div class="outline">
						<div class="out_left">
							<p class="p1">{{  shop_base_info.total_evaluate != 0?shop_base_info.praise/shop_base_info.total_evaluate*5:0 | go_in_to}}</p>
							<p class="p2">综合评价</p>
							<p class="p3">高于周边商家68.2%</p>
						</div>
						<div class="out_right">
							<div class="p1">
								<div style="float: left;">店铺评价</div>
								<div style="float: left;width: 70%;padding-left: 5%;position: relative;">
									<div style="width: 5rem;position: relative;top:0;left: 0;float: left;">
											<div class="rating-wrapper_36aX1_0">
												<div class="rating-gray_2uUsp_0">
													<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-gray"></use></svg>
												</div>
												<div class="rating-actived_1LSTB_0"  :style="{width:shop_base_info.total_evaluate != 0?shop_base_info.praise/shop_base_info.total_evaluate*100+'%':0+'%'}">
													<svg ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-actived"></use></svg>
												</div>
											</div>
											
									</div>
									<div class="score">{{  shop_base_info.total_evaluate != 0?shop_base_info.praise/shop_base_info.total_evaluate*5:0 | go_in_to }}</div>
								</div>
							</div>
							<div class="p1">
								<div style="float: left;">送达时间</div>
								<div style="float: left;width: 70%;padding-left: 5%;position: relative;">
									{{ shop_base_data.dist.time }}分钟
								</div>
							</div>
						</div>
						<div style="clear: left;"></div>
					</div>
					<div class="js" style="height: 0.8rem;"></div>
					<div class="label">
						<div class="lis" :class="{'good':item.fast_evaluate != '差评','is_active':index == lable_select?true:false,'fall':item.name == 'fall'}" v-for="(item,index) in evaluate_label" @click="change_pl(index,item.fast_evaluate)">{{ item.fast_evaluate }}({{ item.num }})</div>
						<div style="clear: left;"></div>
					</div>
					<div class="centent">
						<div class="js" style="height: 0.2rem;"></div>
						<div class="lis" v-for="(item,index) in comment">
							<div class="top">
								<div class="img">
									<img src="/static/images/default.png" alt="">
								</div>
								<div class="txt">
									<div class="base">
										<span class="user">{{ item.username | strHidden(3,3)}}</span>
										<span class="date">{{ item.create_time }}</span>
									</div>
									<div class="star">
										评价:<span style="color:#FF6600">{{ item.fast_evaluate }}</span>			
									</div>
									<div class="body">
										<div class="body_txt" v-if="item.more_evaluate">{{ item.more_evaluate }}</div>
										<div class="body_label" v-if="!item.more_evaluate">
											<div class="body_lis" v-for="(lis,key) in item.label_evaluate" v-if="item.label_evaluate[0]">{{ lis }}</div>
										</div>
									</div>
								</div>
							</div>
							<div style="clear: left;"></div>
						</div>
					</div>
					
				</div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="3">
				<div class="store wq5">
				 	<div class="js" style="height: 0.3rem;"></div>
				 	<div class="activity">
				 		<p class="p1">
				 			活动与服务
				 		</p>
				 		<p style="width: 100%;height: 0.5rem"></p>
              			<p class="gg gjs" v-for="(item,index) in shop_base_data.activity"><i class="gzt" :class="item.i_color">{{ item.type_name }}</i><span style="color: #666">{{ item.content }}</span></p>			
				 	</div>
				 	<div class="js" style="height: 0.6rem;"></div>
				 	<div class="activity">
				 		<p class="p1">
				 			商家实景
				 		</p>
				 			<div class="img">
				 				<div class="img_lis" v-for="(item,index) in shop_base_data.img_detail">
				 					<img :src="item.img[0]" alt="">
				 					<div class="img_txt">{{ item.label }}({{ item.img.length}}张)</div>
				 				</div>
				 			</div>
				 		
				 	</div>
				 	<div class="js" style="height: 0.6rem;"></div>
				 	<div class="activity">
				 		<p class="p1">
				 			商家信息
				 		</p>
				 		<p style="width: 100%;font:1rem/3rem '微软雅黑';color:#666;border-bottom: 1px solid #ddd">{{ shop_base_info.shopinfo || '暂无简介' }}</p>
				 		<div class="content">
				 			<div class="txt_lis">
				 				<div class="bold">商家电话</div>
				 				<div class="no_bold">{{ shop_base_info.moblie }}&nbsp;&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;&nbsp;</div>
				 			</div>
				 			<div class="txt_lis">
				 				<div class="bold">地址</div>
				 				<div class="no_bold">{{ shop_base_info.address }}&nbsp;&nbsp;</div>
				 			</div>
				 			<div class="txt_lis">
				 				<div class="bold">营业时间</div>
				 				<div class="no_bold">{{ shop_base_info.business_hours }}&nbsp;&nbsp;</div>
				 			</div>
				 		</div>
				 	</div>
				 	<div class="js" style="height: 0.6rem;"></div>
				 	<div class="activity">
				 		<div class="content">
				 			<router-link to="/shop/aptitude"><div class="txt_lis">
				 				<div class="bold" style="font-size: 1.3rem;">商家资质</div>
				 				<div class="no_bold"><i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;&nbsp;</div>
				 			</div></router-link>
				 		</div>
				 	</div>
				</div>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
		<modal name="hello-world" width="80%" height="60%">
			<div class="dialog">
				<img :src="goods_detail.food_img" alt="">
				<div class="txt">
					<p class="p1">{{ goods_detail.food_name }}</p>
					<p class="p2">月销:{{ goods_detail.month_sales_volume+'份' || 0}}&nbsp;总销:{{ goods_detail.sales_volume+'份' || 0 }}&nbsp;好评率:{{ goods_detail.total_evaluate==0?0+'%':Math.floor(goods_detail.praise/goods_detail.total_evaluate*100)+'%' }}</p>
					<div class="price">￥{{ goods_detail.price }}
					</div>
				</div>
			</div>
		</modal>
		<div class="black_curtain" v-show="black_curtain">
			<div class="title">西湖泡芙(杭州嘉里)</div>
			<div class="star">
					<div style="width: 8rem;position: relative;top:0;left: 35%;float: left;height: 100%;">
							<div class="rating-wrapper_36aX1_0">
								<div class="rating-gray_2uUsp_0">
									<svg style="width:8rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-gray"></use></svg>
								</div>
								<div class="rating-actived_1LSTB_0"  style="width:96% " >
									<svg style="width:8rem"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star-actived"></use></svg>
								</div>
							</div>										
					</div>									
			</div>
			<div class="activity">
				<div class="p2">
					<div class="label">优惠信息</div>
				</div>
              	<p class="gg gjs" v-for="(item,index) in shop_base_data.activity"><i class="gzt" :class="item.i_color">{{ item.type_name }}</i><span style="color: #fff">{{ item.content }}</span></p>
				<div class="p2">
					<div class="label">商家公告</div>
				</div>
				<p class="gg" style="text-align: left;color:#fff;font:0.9rem/2rem '微软雅黑'">{{ shop_base_data.affiche }}</p>
				<div class="close">
					<div class="lable" @click="black_curtain_show(false)"><i class="fa fa-times" aria-hidden="true"></i></div>
				</div>    	
			</div>
		</div>
		<div style="position: fixed;height: 100%;width: 100%;background-color:rgba(0,0,0,0.5);z-index: 1;top:0;" v-if="shop_car_visible"></div>
	</div>
</template>

<script>
import numcompute from '../../components/private/computed.vue'
export default{
	data(){
		return{
			shop_base_data:{
				id:'1',
				name:'棒槌烧麦',
				img:'/static/images/store1.png',
				dist:{
					method:'商家配送',
					time:'34',
					price:'5',
				},
				info_detail:{
					summary:'80年代 老香港的味道',
					phone:'18205859672',
					address:'杭州市西湖区黄姑山路48号13幢108室  ',
					time:'09:30-22:00'
				},
				activity:[
					{
						type_name:'首',
						i_color:'i-green',
						content:'新用户首单立减18元(不与其他活动共享)'
					},
					{
						type_name:'减',
						i_color:'i-red',
						content:'满20减2'
					},
					{
						type_name:'赠',
						i_color:'i-cyan',
						content:'满30赠小瓶可乐'
					},
					{
						type_name:'特',
						i_color:'i-orange',
						content:'双人餐'
					},
					{
						type_name:'保',
						i_color:'i-white',
						content:'已加入"外卖保"计划'
					}								
				],
				img_detail:[
					{
						label:'门面',
						img:[
							'/static/images/upload/shop-1-1.jpg'
						]
					},
					{
						label:'其他',
						img:[
							'/static/images/upload/shop-1-2.jpg'
						]
					},
					{
						label:'大堂',
						img:[
							'/static/images/upload/shop-1-3.jpg'
						]
					},
					{
						label:'后窗',
						img:[
							'/static/images/upload/shop-1-4.jpg'
						]
					}					
				],
				affiche:'欢迎光临，用餐高峰期请提前下单，谢谢。',
				evaluate:{
					//总分
					total_score:4.7,
					//服务分数
					service_score:4,
					//菜品分数
					dishes_score:3
				},
				comment:{
				}
			},
			lable_select:0,
			selected:'1',
			//当前选中导航下标
			is_select:0,
			//导航数据
			nav_data:[
			],
			//商品详情
			goods_detail:{},
			//总价
			total_price:0,
			total_num:0,
			screen_comment:[],
			black_curtain:false,
			//购物车版块显示
			shop_car_visible:false,
			//购物车数据
			shop_car_data:[
				{
					name:'迷宗烧麦/5只',
					single_price:14,
					num:1
				},
				{
					name:'虾仁烧麦',
					price:'14',
					num:1
				}
			],
			url:'',
			id:'',
			shop_base_info:{},
			order_id:0,
			evaluate_label:'',
			comment:[]
		}
	},
    //自定义在实例
    filters: {
        go_in_to: function(value) {
            return value.toFixed(2); 
        }
    },
    watch:{
    	shop_car_visible(){
    		if(this.shop_car_visible){
    			$('body').css('overflow','hidden');
    		}else{
    			$('body').css('overflow','scroll');
    		}
    	}
    },
	components:{
		numcompute:numcompute
	},
	computed:{

	},
	created:function(){
		const self=this;
		self.screen_comment=self.shop_base_data.comment.data;
		self.url=self.$config.url;
		//获取用户信息
		
		if(self.$route.query.id == undefined){
			self.$router.go(-1);
		}else{
			self.id=self.$route.query.id;
		}
		self.$store.dispatch('getUserinfo').then(function() {
			self.fetch_shopdata();
			self.get_Foodinfo();
			//获取商户评论标签
			self.get_evaluate_label();
		}, function() {
			self.fetch_shopdata();
			self.get_Foodinfo();
		});
	},
	mounted:function(){

	},
	methods:{
		//获取店铺信息
		fetch_shopdata(){
	        const self=this;
	        let url=self.url+'shop/fetchinfo?id='+self.id;
	        let newaddress=JSON.parse(self.$cookie.get('beginAddress'));
	        let data={coordinate:''};
	        data.coordinate=newaddress.coordinate;

	        let success=function(res){

	        	if(res.data.code == 200){
	        		self.shop_base_info=res.data.data;

	        	}else{
	        		self.$router.go(-1);
	        	}
	        }
	        let error = function(res){
	          self.$config.throw_notice('失败');
	        }
	        self.$config.apirequest(url,'post',data,success,error);  
		},
		//获取食物
		get_Foodinfo(){
	        const self=this;
	        let url=self.url+'food/getFoodinfo';
	        let data=new Object();
	        data.shop_id = self.id;
	        data.uid = self.$store.state.userinfo.id; 
	        let success=function(res){
	        	if(res.data.code == 200 ){
	        		self.nav_data=res.data.data.nav_data;
	        		//数据初始化
	        		for(let i=0;i<self.nav_data.length;i++){
	        			self.nav_data[i].icon=false;
	        			self.nav_data[i].link='type'+self.nav_data[i].id;
	        			self.$set(self.nav_data[i],'summary_show',false);
		  	 			self.total_num += self.nav_data[i].num;
	        		}
	        		//获取总价
	        		self.total_price=res.data.data.total_price;
	        		self.order_number=res.data.data.order_number;
	        		self.$store.commit('setShopCarData',self.nav_data)
	        	}else{
	        		self.$config.throw_notice(res.data.code);
	        	}
	        }
	        let error = function(res){
	            self.$config.throw_notice('失败');
	        }
	        self.$config.apirequest(url,'post',data,success,error); 			
		},
		//导航跳转
		gotonav(index,link){
			this.is_select=index;
			let new_link = this.$el.querySelector(link);
			if(new_link == null ){
				return false;
			}
             $('.zt').animate({  
                    scrollTop: new_link.offsetTop+'px'
             }, 300);  
		},
		//显示商品详细信息
		show (key,index) {
		  	this.goods_detail={};
		  	this.goods_detail=this.nav_data[index].food[key];
		  	this.$modal.show('hello-world');
		},
		//价格计算
		pricecomputed(value){
		  	 this.total_price += parseFloat(value.price);
		  	 this.total_num += parseFloat(value.goods_num);
		  	 for(let i=0;i<this.nav_data.length;i++){
		  	 	if(this.nav_data[i].link==value.link){
		  	 		this.nav_data[i].num+=parseFloat(value.goods_num);
		  	 	}
		  	 }
		  	 if(value.goods_num >0 ){
	             let wValue=0.9 * $('.shop_icon').width();  
	             let hValue=0.9 * $('.shop_icon').height(); 
	             $('.shop_icon').animate({  
					width: wValue,  
	                height: hValue,  
					left:'1.66rem', 
					top:'-0.68rem', 
	             }, 150); 
	             $('.shop_icon').animate({  
	             	width:'3.2rem',
	             	height:'3.2rem',  
	             	left:'1.5rem',
	             	top:'-1rem'
	             }, 150);  
		  	 }
		  	 if(this.$store.state.userinfo.id !='' && this.$store.state.userinfo.id != undefined){
			  	 //创建订单
			  	 this.create_order(value.food);
		  	 }

		},
		//订单创建和修改
		create_order(value){

			const self = this;
			//数据初始化
			let data=new Object();
			data={
				'uid':self.$store.state.userinfo.id,
				'shop_id':self.id,
				'food_name':value.food_name,
				'food.num':value.num,
				'chf':value.chf,
				'price':value.price,
				'food_id':value.id,
				'type_id':value.type_id,
				'need_time':self.shop_base_info.need_time
			};
	        let url=self.url+'order/insert';
	        let success=function(res){
	        	if(res.data.code == 200){
	        		self.order_number=res.data.data;
	        	}else{
	        		self.$config.throw_notice(res.data.msg);
	        	}
	        }
	        let error = function(res){
	            self.$config.throw_notice('失败');
	        }
	        //提交
	        self.$config.apirequest(url,'post',data,success,error); 
		},
		//获取商户评论标签
		get_evaluate_label(){
			const self=this;
	        let url=self.url+'shop/groupLabel/'+self.id;
	        let success=function(res){
	        	if(res.data.code  == 200 ){
	        		self.evaluate_label=res.data.data;
	        		let total_num=0
	        		for(let i=0;i<self.evaluate_label.length;i++){
	        			total_num += parseInt(self.evaluate_label[i].num);
	        		}
	        		self.evaluate_label.unshift({fast_evaluate:'全部',num:total_num});
	        		self.comment_axios('全部');
	        	}
	        }
	        let error = function(res){
	            self.$config.throw_notice('失败');
	        }
	        //提交
	        self.$config.apirequest(url,'get','',success,error); 			
		},
		//商品类型简介是否可见
		type_summary_visible(index){
			this.$set(this.nav_data[index],'summary_show',!this.nav_data[index].summary_show);
		},
		//评论类型切换
		change_pl(index,type){
			this.lable_select=index;
			this.comment_axios(type);
		},
		//查询指定类型的评论
		comment_axios(type){
			const self = this;
			switch(type){
				case '全部':
					type = -1;
				break;
				case '差评':
					type = 0;
				break;
				case '中评':
					type = 1;
				break;
				case '好评':
					type = 2;
				break;
			}
	        let url = self.url + 'shop/getshopevaluate?type='+type+'&shop_id='+self.id;
	        let success=function(res){
	        	if(res.data.code == 200){
	        		self.comment =  res.data.data;
	        	}else{
	        		self.$config.throw_notice('获取评论信息失败');
	        	}
	        }
	        let error = function(res){
	            self.$config.throw_notice('失败');
	        }
	        //提交
	        self.$config.apirequest(url,'get',[],success,error); 
		},
		black_curtain_show(flag){
			this.black_curtain=flag;
			$('.black_curtain').css('height','100%');
			if(this.black_curtain==true){
				$("body").css({overflow:"hidden"});
			}else{
				$("body").css({overflow:"scroll"});
			}

		},
		bulid_order(){
		  	 if(this.$store.state.userinfo.id !='' && this.$store.state.userinfo.id != undefined){
				this.$router.push({path:'/order/confirm',query:{'order_number':this.order_number}});
		  	 }else{
				this.$router.push({path:'/user/register'});
		  	 }

		},
		//显示购物车
		shop_car(){
			if(this.total_num<=0){
				return false;
			}
			this.shop_car_visible=true;
		},
		//清空购物车
		clear_car(){
			this.shop_car_data=[];
			this.shop_car_visible=false;
		}
	}
}
</script>
<style>

.mint-tab-item-label{
	font:1.1rem/1.5rem '微软雅黑';		
}	
</style>
<style scoped lang="scss">
@mixin gloal{
   width:28.6rem; 
   padding:0.7rem;
   text-align: left;
    margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#shop{
	width: 30rem;
	background-color: #fff;
}
.black_curtain{
	width: 30rem;
	position: fixed;
	height: 100%;
	top:0px;
	z-index: 99;
	background-color: #262626;
	padding-top: 3rem;
	text-align: center;
	.title{
		@include font(1.5rem,2.2rem,#fff);
		width: 100%;
	}
	.star{
		width: 100%;
		height: 2.2rem;
	}
	.activity{
		width: 100%;
		text-align: left;
		color:#fff;

		.p2{
			width: 100%;
			text-align: center;
			margin-bottom: 1.5rem;
			margin-top: 1.4rem;
			.label{
				margin:0 auto;
				width: 5rem;
				@include font(1rem,1.9rem,#ddd);
				border: 1px solid #eee;
				border-radius: 0.8rem;

			}
		}
		.gg{
			width: 92%;
			padding-left: 8%;
		}
		.close{
			position: fixed;
			bottom:2rem;
			width: 100%;
			.lable{
				width: 4rem;
				height: 4rem;
				margin:0 auto;
				border: 1px solid #fff;
				border-radius: 2rem;
				text-align: center;
				@include font(2rem,3.8rem,#fff);
			}
		}
	}
}
.i-green{
	@include font(0.9rem,1.2rem,#fff);
    background-color: #70BC46;
}
.i-red{
	@include font(0.9rem,1.2rem,#fff);
	background-color:#F07373;
}
.i-cyan{
	@include font(0.9rem,1.2rem,#fff);
	background-color: #3CC791;
}
.i-orange{
	@include font(0.9rem,1.2rem,#fff);
	background-color: #F1884F;
}
.i-white{
	@include font(0.9rem,1.2rem,#999);
	background-color: #fff;
	border:1px solid #999;
}
.gg{
      @include font(0.9rem,1.2rem,#fff);	
}
.gjs{
	margin-bottom: 0.6rem;
}
.gzt{

    margin:0 0.4rem 0 0.1rem;
    padding: 0 0.2rem;				
}

.header{
	width: 30rem;
	background: url('/static/images/shop_bg.png');
	background-size: cover;
	background-repeat: no-repeat;
	.summary{
		@include gloal;
      ul{
        width: 100%;
        padding: 0px;
        li{
          width: 100%;
          margin-bottom: 0.8rem;
          margin-top: 0.8rem;
          .img{
            width: 18%;
            margin-right:3%;
            float: left;
            img{
              width: 100%;
            }
          }
          .text{
            float: left;
            width:75%; 

            .p1{
              @include font(1.3rem,2rem,#fff); 
              font-weight: bold;  
              width: 100%;             
            }
            .p2{
              @include font(0.9rem,1.5rem,#fff);
              width: 100%;                
            }
            .p3{
              @include font(0.9rem,1.5rem,#fff);
              width: 100%;                
            }
          }
        }
      }
	}

}
.wq5{
	margin-top: 5px;
}
.goods{
	.cl{
		float: left;
		width: 8rem;
		float: left;
		ul{
			width: 100%;
			li{
				background-color: #F8F8F8;
				border-bottom: 1px solid #eee;
				width: 100%;

					div{

						padding: 0.9rem 0rem 0.9rem 1rem;
						@include font(1.0rem,1.5rem,#333);	
						text-align: left;	
						position: relative;
						span:before{
							position: absolute;
							z-index: 1;
							@include font(0.6rem,1rem,#fff);
							width: 1rem;
							height: 1rem;
							background-color:#FF461D; 
							text-align: center;
							border-radius: 0.5rem;
							top:0.2rem;
							left: 6.25rem;
							content:attr(attrnum);						
						}
					}					


			}
			li:first-child{
					div{
						padding: 1.1rem 0rem 1.1rem 1rem;
					}
			}
			.is_select{
				background-color: #fff;
				border-left: 2px solid #5BB9FF;
			}
		}
	}
	.zt{
		float: left;
		width: 21.8rem;
		text-align: left;
		height: 40rem;
		overflow: scroll;
		position: relative;
		.label{
			width: 100%;
			.title{
				width: 100%;
				height: 3rem;
				@include font(0.8rem,3rem,#666);
				background-color: #F1F1F1;
				.bd{
					@include font(1.2rem,3rem,#333);
					font-weight: bold;
					margin-left: 0.8rem;
					margin-right: 0.6rem;
				}
				.abstract{
					float: right;
					@include font(2rem,3rem,#666);
					margin-right: 0.8rem;
					position: relative;
					.toast{
						padding: 0.3rem 0.5rem 0.3rem 0.5rem; 
						width: 10rem;
						position: absolute;
						left: -9.5rem;
						top:2.9rem;
						background-color:rgba(0,0,0,0.6);
						@include font(0.8rem,1.5rem,#fff);
						border-radius: 0.2rem;
					}
					.i:before {
						position: absolute;
						z-index: 1;
						top:0rem;
						content: '▲';
						font-size: 0.8rem;
						top:-1rem;
						left: 10.2rem;	
						color:#666666;				
					}
				}					
			}
			.centent{
				width: 100%;
				ul{
					width: 100%;
					li{
						width: 92%;
						padding: 0.8rem 4%;
						.img{
							width: 6rem;
							height: 6rem;
							float: left;
							margin-right: 1rem;
							img{
								width: 100%;
								height: 100%;
							}
						}
						.txt{
							float: left;
							width: 13rem;
							padding: 0.3rem 0rem;
							p{
								width: 100%;
							}
							.p1{
								@include font(1.3rem,1.5rem,#333);
								font-weight: bold;
							}
							.p2{
								@include font(0.9rem,1.2rem,#666);
							}
							.p3{
								@include font(0.85rem,1.2rem,#FF5722);
							}
							.price{
								width: 100%;
								margin-top:0.3rem;
								@include font(1.3rem,1.5rem,#FF6600);
								font-weight: bold;
								.more{
									float: right;
									position: relative;
									left: 0.5rem;
								}
							}
						}
					}
				}
			}
		}
	}
}
.buy{
	width: 100%;
	position: fixed;
	bottom: 0px;
	z-index: 2;
	background-color: #505051;
	.shop_car{
		width: 100%;
		position: relative;
		text-align: left;
		.nav{
			width: 28rem;
			padding:0 1rem;
			background: #ECEFF1;
			height: 3rem;
			.bt{
				@include font(1.3rem,3.2rem,#666);
			}
			.clear{
				float: right;
				@include font(1.1rem,3.2rem,#666);
			}
		}
		.car_body{
			width: 28rem;
			padding: 0 1rem;
			background: #fff;

			ul{
				li{
					width: 100%;
					@include font(1.2rem,1.8rem,#666);

				}
			}
		}
	}
	.shop_icon{
		width: 3.2rem;
		height: 3.2rem;
		border: 0.4rem solid #444444;
		border-radius: 2rem;
		background-color: #363636;
		text-align: center;
		color:#fff;
		@include font(1.7rem,3.0rem,#5F5F63);
		position: relative;
		float: left;
		left: 1.5rem;
		top:-1rem;
		span:before{

			position: absolute;
			z-index: 1;
			@include font(0.6rem,1rem,#fff);
			width: 1rem;
			height: 1rem;
			background-color:#FF461D; 
			text-align: center;
			border-radius: 0.5rem;
			top:-0.4rem;
			left: 2.25rem;
			content:attr(attrnum);;
		}
	}
	.blue{
		background-color: #3190E8;
		color:#fff;
	}
	.total_price{
		float: left;
		position: relative;
		left: 2.2rem;
		padding-top: 0.5rem;
		padding-left: 0.3rem;
		text-align: left;
		.p1{
			@include font(1.3rem,1.5rem,#fff);
		}
		.p2{
			@include font(0.9rem,1.5rem,#ddd);
		}
	}
	.cmt{
		float: right;
		position:relative;
		top:0;
		left: 0;
		width: 8rem;
		height: 100%;
		background-color: #535356;
		text-align: center;
		@include font(1.2rem,4rem,#fff);
		font-weight: bold;
		.btn{
			width: 100%;
			height: 100%;
			border: 0px;
			background-color: #26A2FF;
			@include font(1.2rem,4rem,#fff);

		}
	}
}
.dialog{
	width: 100%;
	height: 100%;
	img{
		height: 75%;
		width: 100%;
	}
	.txt{
		width: 88%;
		height: 14%;
		padding: 3% 6%;
		.p1{
			width:100%;
			@include font(1.3rem,1.7rem,#333);
		}
		.p2{
			@include font(0.8rem,1.5rem,#666);
		}
		.price{
			width: 100%;
			@include font(1.1rem,2rem,#FF461D);
			font-weight: bold;
			margin-top: 1rem;
			.more{
				float: right;
			}
		}
	}
}
.js{
	width: 30rem;
	clear: left;
	background-color: #F5F5F5;
}
	.rating-gray_2uUsp_0{
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		height: 100%;
	}
	.rating-actived_1LSTB_0{
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		height: 100%;				
	}
	svg {
		width: 5rem;
		height:  100%;
		-webkit-box-flex: 0;
		-webkit-flex: none;
		-ms-flex: none;
		flex: none;
	}
.comment{


	.outline{
		@include gloal;
		height: 5rem;
		background-color: #fff;
		.out_left{
			width: 28%;
			padding: 0.4rem 2%;
			border-right: 1px solid #ddd;
			float: left;
			p{
				width: 100%;
				text-align: center;				
			}
			.p1{

				@include font(1.7rem,2.1rem,#FF6000);
				font-weight: bold;
			}
			.p2{
				@include font(1rem,1.3rem,#666);
			}
			.p3{
				@include font(0.8rem,1.1rem,#999);
			}
		}
		.out_right{
			float: left;
			width: 57%;
			padding: 0.1rem 0rem 0.4rem 8%;
			.p1{
				width: 100%;
				height: 1.65rem;

				div{
					@include font(0.92rem,1.65rem,#666);
					height: 100%
				}

				.score{
					float: left;
					margin-left: 0.6rem;
					@include font(0.92rem,1.65rem,#FF6600);
				}
			}

		}
	}
	.label{
		padding:1rem 1.1rem 1rem 1.1rem;
		width: 28rem;
		background-color: #fff;

		.lis{
			padding: 0 0.8rem;
			float: left;
			height: 2.2rem;
			margin-right: 0.7rem;
			margin-bottom: 0.6rem;
		}
		.good{
			background-color: #EBF5FF;
			@include font(0.92rem,2.2rem,#666);
		}
		.fall{
			background-color: #F5F5F5;
			@include font(0.92rem,2.2rem,#999);
		}
		.is_active{
			background-color: #0097FF;
			@include font(0.92rem,2.2rem,#fff);			
		}
	}
	.centent{
		width: 30rem;
		.lis{
			@include gloal;	
			padding: 1.2rem 0.9rem 1.2rem 0.9rem;
			border-bottom: 1px solid #ddd;
			.top{
				width: 100%;
				.img{
					float: left;
					height: 2.5rem;
					width:2.5rem;
					margin-right: 1.2rem;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.txt{
					float: left;
					width: 80%;
					span{
						text-align: left;
					}
					.base{
						width: 100%;

						.user{
							@include font(1.1rem,1.4rem,#333);	
							margin-right: 0.4rem;
						}
						.date{
							@include font(0.9rem,1.4rem,#999);
						}						
					}
					.star{
						width: 100%;
						height: 1.5rem;

					}
					.body{
						width: 100%;
						.body_img{
							width: 100%;
							img{
								height:5.5rem;
								width: 5.5rem;
								float: left;
								margin-right: 0.5rem;
							}
						}
						.body_txt{
							margin-top: 0.4rem;
							width: 100%;
							@include font(1rem,1.3rem,#666);
						}
						.body_label{
							margin-top: 0.4rem;
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							.body_lis{
								height: 1.9rem;
								padding: 0 0.5rem;
								background-color: #FFFFFF;
								margin-right: 0.6rem;
								@include font(0.85rem,1.9rem,#666);
								border:1px solid #ddd;

							}						
						}
					}	
				}
			}

		}
	}
}
.store{
	background-color: #fff;
	text-align: left;
	.activity{
		background-color:#fff;
		width:28rem;
		padding: 0.8rem 1rem;
		.p1{
			width: 100%;
			@include font(1.23rem,2.1rem,#000);
			font-weight: bold;
		}
		.p2{
			width: 100%;

		}
		.img{
			width: 100%;
			.img_lis{
				margin-top: 0.4rem;
				width: 6.45rem;
				height: 6.45rem;
				float: left;
				margin-right: 0.7rem;
				position: relative;
				margin-bottom: 0.8rem;
				img{
					width: 100%;
					height: 100%;
				}
				.img_txt{
					width: 100%;
					position: absolute;
					height: 1.5rem;
					background-color:#313030;
					text-align: center;
					@include font(1rem,1.5rem,#fff);					
					bottom: 0rem;
				}
			}
			.img_lis:last-child{
				margin-right: 0rem;
			}
		}
		.content{
			width: 100%;
			.txt_lis{
				width: 100%;
				height: 3rem;
				border-bottom: 1px solid #ddd;
				.bold{
					@include font(1.2rem,3rem,#000);
					font-weight: bold;
					float: left;
				}
				.no_bold{
					@include font(1rem,3rem,#999);
					float: right;
				}
			}
		}
	}
}
</style>