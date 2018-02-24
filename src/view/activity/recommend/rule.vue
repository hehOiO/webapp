<template>
	<div id="rule">
		<div class="lis" v-for="(item,index) in ruleData">
			<div class="title">
				{{ item.rule_name }}
			</div>
			<div class="content">
				<ol type="1">
					<li v-for="(lis,key) in item.condition">{{lis}}</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				ruleData:[
					{
						rule_name:'活动规则',
						condition:[
							'邀请好友成为饿了么新用户，好友在接受邀请的7天内下单成功，且无退款行为。你可获得饿了么5元奖励',
							'你的好友必须是从未使用饿了么的新用户。拥有相同手机号、饿了么账号与硬件设备的用户，均视为同一个用户',
							'在好友完成首单的5天后（未取消订单、未申请退款）5元奖励会放入饿了么余额账户中，余额可用于饿了么订餐，也可用于提现',
							'如发现任何违规套取奖励行为将视情节严重程度进行判罚：不予发放奖励、封停推荐有奖功能、冻结所有通过推荐有奖渠道获得的奖励、依法追究其法律责任',
							'如有其它疑问请咨询饿了么官方客服'
						]
					},
					{
						rule_name:'额外奖励计算',
						condition:[
							'活动有效期：2017年7月4日00：00-2018年1月4日00:00',
							'自2017年7月4日起计算，成功邀请（以5元奖励成功入余额账户为准）满2人可获额外奖励5元；满5人获额外奖励20元；满50人获额外奖励100元，每位用户最多可获得125元额外奖励，有效期至2018年1月4日',
							'若7月4日之前邀请了用户，在7月4日之后现金奖励入账，不在额外奖励计算范围内'
						]
					}				
				]
			}
		},
		created:function(){

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
    background-color: #fff;
}
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#rule{
	width: 30rem;
}	
.lis{
	width: 28rem;
	padding: 0 0.6rem;
	margin-top: 2.2rem;
	text-align: left;
	.title{
		@include font(1.3rem,2rem,#000);
		font-weight: bold;
		margin-bottom: 1rem;
	}
	.content{
		width: 100%;
		ol{

			li{
				width: 100%;
				list-style-type: decimal;
				@include font(0.9rem,1.6rem,#333);
				margin-bottom: 0.2rem;
			}
		}
	}
}
</style>
