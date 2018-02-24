<template>
	<div id="scroll">
		<div class="content" v-for="(item,index) in data" :class="{hidden:true,scollout:index == indexof}">
			<img :src="item.photo" alt="">
			<div class="text">
				<p><span class="moblie">{{ item.moblie }}</span><span class="time">{{ item.time }}</span></p>
				<p><span class="reward">中奖<span style="color:#FF6952">{{ item.money }}</span>元</span></p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			data:[
				{
					photo:'/static/images/default.png',
					moblie:'18205859672',
					money:20,
					time:'10分钟前'
				},
				{
					photo:'/static/images/default.png',
					moblie:'13586803986',
					money:20,
					time:'15分钟前'
				},
				{
					photo:'/static/images/default.png',
					moblie:'13586809688',
					money:20,
					time:'15分钟前'
				},
				{
					photo:'/static/images/default.png',
					moblie:'18405859672',
					money:20,
					time:'12分钟前'
				},
				{
					photo:'/static/images/default.png',
					moblie:'13586803986',
					money:20,
					time:'5分钟前'
				},
				{
					photo:'/static/images/default.png',
					moblie:'13586209688',
					money:20,
					time:'30秒前'
				},
			],
			indexof:0,
			clock:'',
			i:0
		}
	},
	props:[

	],
	create:function(){
		
	},
	mounted:function(){
		this.clock=setInterval(this.start,2000);
	},
	watch:{

	},
	methods:{
		start(){
			this.indexof++;
			if(this.indexof>=this.data.length){
				this.indexof=0;
			}
		}
	}
}
</script>
<style>

</style>
<style lang="scss" scoped>
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
    margin-top: -1px;
    background-color: #fff;
}
$top-background:#01AAED;
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#scroll{
	height: 4rem;
	overflow: hidden;
	width: 17rem;
	float: left;
}
.hidden{
	display: none;

}
.scollout{
	display: block;
	animation:gundong 3s infinite;
}
@keyframes gundong
{
	0%{top:4rem;}
	50%{top:0rem;}
	100%{top:-4rem;}

}
.content{
	width: 100%;
	float: left;
	position: relative;
	height: 4rem;

	img{
		float: left;
		width: 2.5rem;
		height:2.5rem;
		margin-right: 1rem;
	}
	.text{
		float: left;
		p{
			.moblie{
				@include font(1rem,1.25rem,#333);
				margin-right: 1rem;
			}
			.time{
				@include font(1rem,1.4rem,#999);
			}
			.reward{
				@include font(1rem,1.4rem,#888);
			}
		}
	}			
}
</style>