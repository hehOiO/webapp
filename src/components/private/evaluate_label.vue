<template>
	<div id="lable">
		<div class="lab">
			<div class="lis_lab" v-for="(lis,key) in data" @click="lis.nq = !lis.nq" :class="{blue:lis.nq}">{{ lis.label }}</div>			
		</div>		
	</div>
</template>
<script>
	export default {
		data(){
			return{

			}
		},
		props:[
			'data'
		],
		methods:{

		}
	}
</script>
<style scoped lang="scss">
@mixin gloal{
   width:27rem; 
   padding:1rem 1.5rem;
   text-align: left;
   margin-top: -1px;
   background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
.lab{
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	.lis_lab{
		padding: 0 0.6rem;
		@include font(0.95rem,1.8rem,#999)
		margin-right: 0.8rem;
		margin-bottom: 0.7rem;
		border:1px solid #ddd;
	}
	.blue{
		color:#26A2FF;
		border:1px solid #26A2FF;
	}
}
</style>