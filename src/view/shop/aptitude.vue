<template>
	<div id="zizhi">
		<div class="apt">
			<div class="p1">商家从业资质</div>
			<div class="content">
				<div class="img" style="border-right:1px solid #ddd">
					<img src="/static/images/zhizhao_1.jpg" alt="">
				</div>
				<div class="img">
					<img src="/static/images/zhizhao_2.jpg" alt="" style="margin-left: 15%;margin-top: 3rem">
				</div>
				<div style="clear: left;"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{

			}
		},
		methods:{

		}
	}
</script>
<style>
.mint-header{
	height: 3rem;
	font:1.5rem/2rem '微软雅黑';	
}
.mintui{
	font:1.5rem/2rem '微软雅黑';		
}
.mint-tab-item-label{
	font:1.1rem/1.5rem '微软雅黑';		
}	
</style>
<style>

</style>
<style lang="scss" scoped>
@mixin gloal{
   width:28.6rem; 
   padding:0.7rem;
   text-align: left;
    margin-top: -1px;
}
$top-background:#01AAED;
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}	
#zizhi{
	width: 30rem;
		background-color: #fff;
}

.apt{
	width: 28rem;
	margin:1rem;
	text-align: left;
	.p1{
		padding-left: 1rem;
		width: 27rem;
		height: 3rem;
		@include font(1.25rem,3rem,#000);
		font-weight: bold;
		border-bottom: 1px solid #eee;
	}
	.content{
		margin-top: 1rem;
		width: 26rem;
		margin-left: 1rem;
		height: 14rem;
		.img{
			width: 49%;
			float: left;

			img{
				width: 70%;

			}
		} 
	}
}
</style>