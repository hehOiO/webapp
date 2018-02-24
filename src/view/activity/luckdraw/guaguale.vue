<template>
	<div id="guaguale">
		<div class="logo">
			<img src="/static/images/cjimg/h5_guaguaka_word.png" alt="">
		</div>
		<div id="gua1" >
			<img id="gua1_img" src="/static/images/cjimg/h5_gua_image.png" style="position: absolute;">
			<canvas id="front" style="position:absolute;no-repeat" @click="check_auth"/>
		</div>
		<div class="text">
			每积分{{ activity_data.need_score }}可刮奖一次<a href="javascript:;" style="margin-left: 1rem" @click="start">开始刮奖</a>
		</div>
		<div class="text" style="color:#eee;font-size: 1rem;">
			您的积分{{ $store.state.score }}分
		</div>		
	</div>
</template>
<script>
	export default {
		data(){
			return {
				gua:false,
				re:false,
				winning:'',
				i:0,
				activity_data:'',
				url:''
			}
		},
		created:function(){

		},
		mounted:function(){
			const self = this;
			self.url = self.$config.url;
			self.$store.dispatch('getUserinfo').then(function() {
				self.$store.dispatch('getScoreinfo',self.$store.state.userinfo.id).then(() => {
					self.get_flop_info();

				})	
			}, function() {

			});
		},
		watch:{

		},
		methods:{
			//获取活动信息
			get_flop_info(){
            	const self = this;
            	let url = self.url +'IntegralMall/getFlopInfo/'+self.$route.query.good_id
                let success=function(res){  
                   if(res.data.code == 200){
                   		self.activity_data = res.data.data;
                   		self.init();
                   }else{
                   		self.$config.throw_notice('活动不存在');
						self.$router.push("/");
                   }
                }
                let error = function(res){
                	this.$config.throw_notice('网络异常');
                }
                this.$config.apirequest(url,'get',[],success,error);					
			},
			repaly(){
				this.init();
			},
			check_auth(){
				if(!this.gua){
					this.$config.throw_notice('请单击开始刮奖后刮奖');
				}
			},
			start(){
				if(this.re){
					return;
				}
				if(this.$store.state.score<this.activity_data.need_score){
					this.$config.throw_notice('积分不足');
					return;
				}
				this.start_luck_data();
			},
			init(){
				$("#guaguale").width("100%").height($(window).height()-1);
				$("#guaguale").css('background','url(/static/images/cjimg/h5_guaguaka_bg.png)');
			},
			bodys(height,width){
				const self=this;
				var img = new Image();  

				var canvas = document.querySelector('canvas'); 
				self.i = 0;
				canvas.style.position = 'absolute'; 
				//监听图片加载事件          
				img.addEventListener('load',function(e){  
					var ctx;
					var w = width, h = height;             
					var offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop;             
					var mousedown = false;  
					//绘制矩形
					function layer(ctx){                 
						ctx.fillStyle = 'gray';                 
						ctx.fillRect(0, 0, w, h);             
					}
					//当鼠标按下去时   
					function eventDown(e){
						e.preventDefault();                 
						mousedown=true;   
						self.re=false;           
					}   
					function eventUp(e){            
						e.preventDefault();                 
						mousedown=false;             
					}      
					//在矩形上根据鼠标位置绘制圆形         
					function eventMove(e){                 
						e.preventDefault();  

						if(mousedown){                     
							if(e.changedTouches){                         
								e=e.changedTouches[e.changedTouches.length-1];                     
							}                     
							var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,  
							of_top = $('#front').offset().top,                    
							y = e.clientY-of_top+offsetY;
							ctx.beginPath()                  
							ctx.arc(x,y, 15, 0, Math.PI * 2);                         
							ctx.fill();                                          
						}             
					}               
					canvas.width=w;             
					canvas.height=h; 
					//设置中奖图
					canvas.style.backgroundImage='url('+img.src+')';    
		      
					ctx=canvas.getContext('2d');         
					ctx.fillStyle='b9b9b9';             
					ctx.fillRect(0, 0, w, h);

					layer(ctx);               
					ctx.globalCompositeOperation = 'destination-out';               
					canvas.addEventListener('touchstart', eventDown);             
					canvas.addEventListener('touchend', eventUp);             
					canvas.addEventListener('touchmove', eventMove);             
					canvas.addEventListener('mousedown', eventDown);             
					canvas.addEventListener('mouseup', eventUp);             
					canvas.addEventListener('mousemove', eventMove);       
				});
				img.src = self.winning['prize_pic'];
				console.log(self.winning['prize_pic']);
				(document.body.style);				
			},
			//请求服务端返回抽奖数据
			start_luck_data(){
            	const self = this;
            	let url = self.url +'IntegralMall/luck';
            	let data = {
            		luck_id:self.activity_data.id,
            		uid:self.$store.state.userinfo.id,
            		need_score:self.activity_data.need_score
            	}
                let success=function(res){  
                	if(res.data.code == 200){
                		self.winning =res.data.data;

						let height = $('#front').height();
						let width  = $('#front').width();
						self.gua = true;
						self.bodys(height,width);
						//只有开始刮奖时才可在此刮奖
						self.re = true;
						self.$store.state.score -= self.activity_data.need_score;
                	}else{
                		self.$config.throw_notice('抽奖失败');
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
   padding:1rem;
   text-align: left;
   margin-top: -1px;
   background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#guaguale{
	width: 30rem;
}
.logo{
	width: 30rem;
	display: flex;
	justify-content: center;
	img{
		width: 22rem;
	}
}
#gua1{
	width: 30rem;
	height: 12rem;
	position: relative;
	margin-top: 2rem;
	#gua1_img{
		width: 22rem;
		height: 10rem;
		left: 4rem;
	}
	#front{
		width: 21rem;
		height: 9rem;
		left: 4.6rem;	
		top:0.6rem;
	}
}
.text{

	width: 30rem;
	text-align: center;
	@include font(1.2rem,2rem,#fff);
	a{
		color:#FFB800;
	}
}
</style>