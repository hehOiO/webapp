<template>
	<div id="scroll">
		<div class="re_scroll">
			<ul>
				<li v-for="(item,index) in data" :class="{hidden:true,scollout:index == indexof}">尾号{{ item.moblie.substr(-4)}}的用户邀请了{{ item.num }}位好友 获得{{ item.money }}元现金</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			data:[
				{
					num:2,
					moblie:'18205859672',
					money:20,
				},
				{
					num:2,
					moblie:'13586803986',
					money:20,
				},
				{
					num:4,
					moblie:'13586809688',
					money:20,
				},
				{
					num:5,
					moblie:'18405859672',
					money:20,
				},
				{
					num:1,
					moblie:'13586803986',
					money:20,
				},
				{
					num:1,
					moblie:'13586209688',
					money:20,
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
		this.clock=setInterval(this.start,2500);
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
.re_scroll{
	ul{
		li{
			width: 100%;
			height: 100%;
			@include font(0.95rem,2.4rem,#999);	
			position: relative;
			top:0;
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
			0%{top:1.5rem;}
			40%{top:0rem;}
			60%{top:0rem;}
			100%{top:-2.5rem;}

		}
	}
}
#scroll{
	width: 22rem;
	margin:0 auto;
	height: 2.5rem;
	overflow: hidden;
	position: relative;
	z-index: 999;
	position: relative;
	top:-1.75rem;
	background-color: #000039;
	border-radius: 1.25rem;
}


</style>