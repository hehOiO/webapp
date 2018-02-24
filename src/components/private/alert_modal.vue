<template>
	<div id="modal" v-show="visible">
			<div class="alertmodal"></div>
			<div class="content">
				<div class="status">
					<span>{{ title }}</span>
					<i class="fa fa-times-circle-o" aria-hidden="true" @click="close"></i>
				</div>
				  <slot>
    					<p class="empty">填写你要插入的内容</p>	
  				  </slot>
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
		"visible",
		"title"
	],
	create:function(){
		
	},
	mounted:function(){
		
	},
	watch:{
		visible(){
			if(this.visible){
				$("#modal .content").animate({height:"17rem"},150);	
				$("body").css({overflow:"hidden"});
			}else{
				$("body").css({overflow:"scroll"});
			}
		}
	},
	methods:{
		close(){
			let self=this;
			$("#modal .content").animate({height:"0rem"},150,function(){
				self.$emit('payClose',false);
			});			
		}
	}
}
</script>
<style>

</style>
<style lang="scss" scoped>

#modal{
	width: 30rem;	
	height: 100%;
}
.content{
	width: 100%;
	height: 17rem;
	background-color: #fff;
	position: fixed;
	bottom: 0;
}

.alertmodal{
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	background-color: rgba(0,0,0,0.5);
}
.status{
	width: 28rem;
	padding: 0 1rem;
	height: 2.5rem;
	font-size: 1.3rem;
	line-height: 2.5rem;
	font-weight: bold;
	border-bottom: 1px solid #eee;
	i{
		float:right;
		font-size: 1.8rem;
		line-height: 2.5rem;
		color:#666;
	}
}
.empty{
	width: 100%;
	font:1.4rem/14rem '微软雅黑';
	color:#aaa;
}
</style>