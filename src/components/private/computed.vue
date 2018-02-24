<template>
	<div id="plug">
		<button class="plus" @click="plus"><i class="fa fa-plus" aria-hidden="true"></i></button>
		<div class="num" v-if="goods_num>0">{{ goods_num }}</div>
		<button class="minus" @click="minus" v-if="goods_num>0"><i class="fa fa-minus" aria-hidden="true"></i></button>
			<div class="ball-container">
				<!--小球-->
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
				goods_num:0,
				balls: [ 
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
				],
				dropBalls: [],
			}
		},
		computed:{
		},
		created(){
			this.goods_num=this.goodsnum;
		},
		props:[
			'food',
			'goodsnum',
			'link',
			'typeid'
		],
		computed:{

		},
		methods:{
			minus(){
				if(this.goods_num <=0 ){
					this.goods_num = 0;
					return false;
				}
				this.goods_num--;
				this.return_value('minus');
			},
			plus(event){
				this.goods_num++;
				this.drop(event.target);
				this.return_value('plus');
			},
			return_value(str){

				let data=new Object();
				if(str == 'minus'){
				  data.price= -parseFloat(this.food.price+this.food.chf);
				  data.goods_num=-1;
				  this.food.num --;
				}else{
				  data.price= parseFloat(this.food.price+this.food.chf);
				  data.goods_num=1;
				   this.food.num ++;
				}
				data.food=this.food;
				data.link=this.link;
				data.food.type_id=this.typeid;
				this.$emit('pricejs',data)
			},
					drop(el) { //抛物
						for(let i = 0; i < this.balls.length; i++) {
							let ball = this.balls[i];
							if(!ball.show) {
								ball.show = true;
								ball.el = el;
								this.dropBalls.push(ball);
								return;
							}
						}
					},
					beforeDrop(el) { /* 购物车小球动画实现 */
						let count = this.balls.length;
						while(count--) {
							let ball = this.balls[count];
							if(ball.show) {
								let rect = ball.el.getBoundingClientRect(); //元素相对于视口的位置
								let x = rect.left - 32;
								let y = -(window.innerHeight - rect.top - 22); //获取y
								el.style.display = '';
								el.style.webkitTransform = 'translateY(' + y + 'px)'; //translateY
								el.style.transform = 'translateY(' + y + 'px)';
								let inner = el.getElementsByClassName('inner-hook')[0];
								inner.style.webkitTransform = 'translateX(' + x + 'px)';
								inner.style.transform = 'translateX(' + x + 'px)';
							}
						}
					},
					dropping(el, done) { /*重置小球数量  样式重置*/
						let rf = el.offsetHeight;
						el.style.webkitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = 'translate3d(0,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';
						el.addEventListener('transitionend', done);
					},
					afterDrop(el) { /*初始化小球*/
						let ball = this.dropBalls.shift();
						if(ball) {
							ball.show = false;
							el.style.display = 'none';
						}
					}
		}
	}
</script>
<style scoped lang="scss">
@mixin gloal{
   width:28.6rem; 
   padding:0.7rem;
   text-align: right;
    margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
button{
	padding: 0 0.3rem;
	height: 1.6rem;
	width: 1.6rem;
	border-radius: 0.8rem;
	border:0px;
	float: right;
	
	text-align: center;
}
.plus{
	border: 1px solid #fff; 
	background-color:#3190E8;
	@include font(0.8rem,1.5rem,#fff);
}
.minus{
	border: 1px solid #3190E8; 
	background-color: #fff;
	@include font(0.8rem,1.5rem,#3190E8);
}
.num{
	height: 1.6rem;
	@include font(1rem,1.5rem,#000);
	width: 1.5rem;
	text-align: center;
	float: right;
}
			.ball {
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 200;
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
				/*贝塞尔曲线*/
			}
			
			.inner {
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background-color: rgb(0, 160, 220);
				transition: all 0.4s linear;
			}
			
			.cart {
				position: fixed;
				bottom: 22px;
				left: 32px;
				width: 30px;
				height: 30px;
				background-color: rgb(0, 160, 220);
				color: rgb(255, 255, 255);
			}
</style>