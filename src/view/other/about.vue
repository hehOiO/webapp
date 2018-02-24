<template>
	<div id="about">
		<div style="width: 100%;"></div>
		<div class="lis">
			<div class="title">公司</div>
			<div class="body">
				<p>XXX地区XXX公司</p>
			</div>
		</div>
		<div class="lis">
			<div class="title">地址</div>
			<div class="body">
				<p>浙江省杭州市XXX区XXX路XX号</p>
			</div>
		</div>
		<div class="lis">
			<div class="title">电话</div>
			<div class="body">
				<p>182XXXXXXXX</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				title:'其他'
			}
		},
		created:function(){

		},
		methods:{

		}
   }
</script>
<style>
	html,body{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
   margin-top: -1px;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#about{
	width: 30rem;

}	
.lis{
	@include gloal;

	.title{
		width: 100%;
		margin-bottom: 0.2rem;
		@include font(1.3rem,2rem,#000);
		font-weight: bold;
	}
	.body{
		@include font(1.1rem,2rem,#333);
	}
}
</style>
