<template>
	<div id="header">
		<mt-header title="淘点" >
		  	<mt-button  icon="back" slot="left" @click="back"></mt-button>
		</mt-header>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				showAddressPicker: true,
        		address: '广东-深圳市-福田区'
			}
		},
		methods:{
			//回退
			back(){
				this.$router.go(-1);			
			}
		}
   }
</script>
<style>
.mint-header{
	width: 30rem;
	font:1.3rem/1.8rem '微软雅黑';	
	height: 3rem;
}
.mintui{
	font:1.5rem/2rem '微软雅黑';		
}
</style>
