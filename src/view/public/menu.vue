<template>
	<div id="nav">
		<mt-tabbar v-model="selected" fixed> 
		  <router-link :to="{path:'/'}">
			  <mt-tab-item id="外卖">
			    <i class="fa fa-cutlery" aria-hidden="true" slot="icon" :class="{blue:$route.path == '/'}"></i>
			    <span :class="{blue:$route.path == '/'}">外卖</span>
			  </mt-tab-item>
		  </router-link>
		  <router-link :to="{path:'/menu_discover'}">
		  	<mt-tab-item id="发现">
			  	<i class="fa fa-eye" aria-hidden="true" slot="icon" :class="{blue:$route.path == '/menu_discover'}"></i>
			    <span :class="{blue:$route.path == '/menu_discover'}">发现</span>
			  </mt-tab-item>
		  </router-link>
		  <router-link :to="{path:'/menu_order'}">
			  <mt-tab-item id="订单">
			    <i class="fa fa-file-text-o" aria-hidden="true" slot="icon" :class="{blue:$route.path == '/menu_order'}"></i>
			    <span :class="{blue:$route.path == '/menu_order'}">订单</span>
			  </mt-tab-item>
		  </router-link>
		  <router-link :to="{path:'/menu_user'}">
			  <mt-tab-item id="我的">
			    <i class="fa fa-user" aria-hidden="true" slot="icon" :class="{blue:$route.path == '/menu_user'}"></i>
			    <span :class="{blue:$route.path == '/menu_user'}">我的</span>
			  </mt-tab-item>
		  </router-link>
		</mt-tabbar>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script>

	export default{
		data(){
			return{
				selected:'外卖'
			}
		},
		components:{

		},
		methods:{

		}
	}
</script>
<style lang="scss">
.mint-tabbar{
	width: 30rem;
}
.mint-header{
	width: 30rem;
	font:1.3rem/1.8rem '微软雅黑';	
	height: 3rem;
}
.mint-tab-item-label{
	font:1rem/1.5rem '微软雅黑';		
}
.mint-tab-item-icon{
	font:1.3rem/1.8rem '微软雅黑';
}
.mint-tabbar a:link{
	color:#666;
}
.mint-tabbar a:active{

}
.mint-tabbar a{
	width: 25%;
	color:#666;
	.mint-tab-item{
	    display: block;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-decoration: none;	
	    text-align: center;	
	    width: 100%;
	    .blue{
	    	color:#26A2FF;
	    }
	}
}
</style>

<style scoped lang="scss">

</style>