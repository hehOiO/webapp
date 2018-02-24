<template>
	<div id="timedown">
		<button @click="go_to_link" :class="{gary:!i}">{{ str }}</button>
	</div>
</template>
<script>
export default {
	data(){
		return {
			localTime:'',
			surplus:0,
			str:'',
			clock:'',
			i:false
		}
	},
	props:[
		'time',
		'href'
	],
	created:function(){
		this.localTime=new Date();
		this.getsurplus();

	},
	mounted:function(){
		
	},
	watch:{
		time(){
			this.getsurplus();
		}
	},
	methods:{
		getsurplus(){
			this.str='';
			clearInterval(this.clock);
			let s1=this.time*1000;
			let s2=this.localTime.getTime();

			this.surplus=Math.floor((s1-s2)/1000);
			this.downtime();

			this.clock=setInterval(this.downtime,1000);
		},
		downtime(){
			if(this.surplus<=0){
				this.str='马上抢';
				this.i=true;
			}else{
				let min=Math.floor(this.surplus/60);
				let second=this.surplus-Math.floor(this.surplus/60)*60;
				if(second<10){
					second='0'+second;
				}
				this.str=min+':'+second+'后开抢';
				this.i=false;
			}
			this.surplus--;
		},
		go_to_link(){
			if(this.i){
				this.$router.push(this.href);
			}else{
				this.$config.throw_notice('商品现在无法抢购');
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
button{
	padding:0 1rem;
	height: 2.8rem;
	border: 0;
	position: relative;
	background-color: #FF4023;
	@include font(1.1rem,2.7rem,#fff);
	top:4.1rem;
}
.gary{
	background-color: #D6DCE5;
}
</style>