<template>
	<div id="detail">
		<div class="text">
			<div class="question">
				我的订单还没有送到，我要催单
			</div>
			<div class="answer">
				<p>您好，如您的订单长时间未送达，请您选择以下方式进行催单：</p>
				<p>1、您可以在下单30分钟后点击“催单”按钮，商家和骑手会收到您的催单提醒;</p>
				<p>2、如您是商家自行配送的订单，您可以在"订单详情页"，菜品信息下方点击"联系商家";</p>
			</div>
		</div>
		<div class="action">
			<p class="notice">
				此回答是否解决您的问题：
			</p>
			<div class="btn">
				<mt-button style="border-radius: 1.5rem;float: left;">
					<span slot="icon"><i class="fa fa-thumbs-o-up" aria-hidden="true" style="margin-right: 0.8rem;"></i>已解决</span>
				</mt-button>
				<mt-button style="border-radius: 1.5rem;float: right;">
					<span slot="icon"><i class="fa fa-thumbs-o-down" aria-hidden="true" style="margin-right: 0.8rem;"></i></i>未解决</span>
				</mt-button>
				<div style="clear:both;"></div>
			</div>
		</div>
		<div class="unresolved">
			<div class="frame">还没有解决您的问题？找<span class="blue">小淘聊聊</span></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods:{

		}
   }
</script>
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
#detail{
	width: 30rem;

}
.text{
	@include gloal;
	border-bottom: 2px dashed #ddd;
	background-color: #fff;
	.question{
		width: 100%;
		@include font(1.1rem,2.5rem,#000);
		font-weight: bold;
	}
	.answer{
		width: 100%;
		p{
			width: 100%;
			@include font(0.95rem,1.5rem,#333);
		}
		
	}
}
.action{
	@include gloal;
		background-color: #fff;
	.notice{
		width: 100%;
		@include font(0.9rem,1.2rem,#999);
		text-align: center;
	}
	.btn{
		width: 15rem;
		margin:0 auto;
		margin-top: 1rem;
	}
}
.unresolved{
	width: 100%;
	margin-top:1rem;
	.frame{
		width:16rem;
		margin:0 auto;
		padding: 0 1rem;
		height: 2.2rem;
		background: #CCCCCC;
		text-align: center;
		@include font(0.95rem,2.2rem,#fff);
		.blue{
			color:#469AF7;
		}
	}
}	
</style>
