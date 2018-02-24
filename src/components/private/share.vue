<template>
	<div id="share">
		<div class="content">
			<div class="lis" @click="wechat_share">
				<img src="/static/images/wechat.png" alt="">
				<p>微信</p>
			</div>
			<div class="lis" @click="qq_share">
				<img src="/static/images/qq.png" alt="">
				<p>QQ</p>
			</div>
			<div class="lis" @click="face_share">
				<img src="/static/images/face.png" alt="">
				<p>面对面</p>
			</div>
			<div class="lis" @click="qzone_share">
				<img src="/static/images/qzone.png" alt="">
				<p>QQ空间</p>
			</div>
			<div style="clear: left;"></div>	
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
		}
	},
	props:[

	],
	create:function(){
		
	},
	mounted:function(){
		
	},
	watch:{

	},
	methods:{
		wechat_share(){
			this.$config.throw_notice('分享到微信');
		},
		qq_share(){
			this.$config.throw_notice('分享到QQ');
		},
		face_share(){
			this.$config.throw_notice('面对面分享');
		},
		qzone_share(){
			this.$config.throw_notice('分享到QQ空间');
		}
	}
}
</script>

<style lang="scss" scoped>
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#share{
	width: 30rem;	
	height: 100%;
}
.content{
	width: 28rem;
	padding: 1rem;
	.lis{
		width: 7rem;
		float:left;
		img{
			margin-top: 3rem;
			width: 5rem;
			height: 5rem;
		}
		p{
			width: 100%;
			@include font(1.1rem,2rem,#999)
		}
	}
}
</style>