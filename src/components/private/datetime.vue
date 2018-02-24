<template>
	<div id="datetime">
		<div style="position: relative;top:41rem">
			<div class="btn">
				<div class="cancle" @click="cancle">取消</div>
				<div class="confirm" @click="confirm">确定</div>
			</div>
			<smooth-picker ref="smoothPicker" :data="data" :change="dataChange" />
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
		 		data: [
			          {
			            currentIndex: 0,
			            flex: 3,
			            list: [
			            ],
			            onClick: this.clickOnPlan,
			            textAlign: 'center',
			            className: 'row-group'
			          },
			          {
			            divider: true,
			            flex: 1,
			            text: '：',
			            textAlign: 'center',
			            className: 'divider'
			          },
			          {
			            currentIndex: 0,
			            flex: 3,
			            list: [],
			            onClick: this.clickOnProduct,
			            textAlign: 'center',
			            className: 'item-group'
			          }
		        ],
		        hour:'',
		        min:''
			}
		},
		computed:{
		},
		created:function(){
			this.setdefault();
		},
		props:[
			'time'
		],
		computed:{

		},
		methods:{
			setdefault(){
				this.hour=this.time.split(':')[0];		
		        this.min=this.time.split(':')[1];
		        let j;
		        //设置小时
		      	for(let i=parseInt(this.hour);i<=parseInt(this.hour)+2;i++){
		      		j=i;
		      		if(parseInt(j)<10){
		      			j='0'+j;
		      		}
		      		if(parseInt(j)>23){
		      			j=parseInt(j)-24;
		      		}
		          	this.data[0].list.push(j);
		         }		  
		         //设置分钟      
		      	for(let i=parseInt(this.min);i<60;i++){
		      		if(i<10){
		      			i='0'+i;
		      		}
		          	this.data[2].list.push(i);
		         }
	
			},
			// 5. 监听变化
      		dataChange (gIndex, iIndex) {

		        if (gIndex === 0) {
		          let currentIndex = 0
		          let list = [];	          
		          switch (iIndex) {	          	
		            case 2:
		            for(let i=0;i<60;i++){
			      		if(i<10){
			      			i='0'+i;
			      		}
			          	list.push(i);
			          }
		              currentIndex = 0
		              break;
		            case 1:
			      	  for(let i=0;i<60;i++){
			      		if(i<10){
			      			i='0'+i;
			      		}
			          	list.push(i);
			          }
		              currentIndex = 0
		              break;
		             case 0:
			      	  for(let i=parseInt(this.min);i<60;i++){
			      		if(i<10){
			      			i='0'+i;
			      		}
			          	list.push(i);
			          }
		              currentIndex = 0
		              break
		            default:
		              currentIndex = 0
		          }
		          this.$refs.smoothPicker.setGroupData(2, Object.assign({}, this.data[2], { currentIndex, list }))
		        }
		      },
		      confirm () {
		        let ciList = this.$refs.smoothPicker.getCurrentIndexList()
		        let planDetail = this.data[0].list[ciList[0]];
		        let productDetail = this.data[2].list[ciList[2]];
		        let value=planDetail +':'+productDetail;
		        this.$emit('confirm', value)
		      },
		      cancle(){
		      	this.$emit('cancle',false)
		      }
		}
	}
</script>
<style scoped lang="scss">
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#datetime{
	width: 30rem;
}
.btn{
	width: 28rem;
	height: 2.5rem;
	border-bottom:1px solid #ddd;
	background-color: #fff;
	padding:0 1rem;

	.cancle{
		width: 14rem;
		float: left;

		text-align: left;
		height: 100%;
		@include font(1.1rem,2.5rem,#26A2FF);
	}
	.confirm{
		width: 14rem;
		float: right;
		text-align: right;
		height: 100%;
		@include font(1.1rem,2.5rem,#26A2FF);
	}
}
</style>