<template>
	<div id="hobby">
		<div class="js"></div>
		<div class="lab_area">
			<p class="title">快速备注</p>
			<div class="switch" v-for="(item,index) in summary_data">
				<span v-for="(lis,key) in item.data" :class="{'blue':item.indexof == lis.index }" @click="change_lab(index,key)">{{ lis.name }}</span>
				<div style="clear: both;"></div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div class="js"></div>
		<div class="text_area">
			<p class="title">其他备注</p>
			<div class="body">
				<textarea placeholder="请输入你要备注的内容(可不填)" v-model="other_summary">
					
				</textarea>
			</div>
		</div>
		<div class="js"></div>
		<mt-button size="large" style="width: 96%;margin-left: 2%;background-color:#4CD964;color:#fff;height: 3rem;" @click="cmt">确定</mt-button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				summary_data:[
					{
						id:1,

						indexof:-1,
						data:[
							{
								name:'不要辣',
								index:0
							},
							{
								name:'少点辣',
								index:1
							},
							{
								name:'多点辣',
								index:2
							}
						]
					},
					{
						id:2,

						indexof:-1,
						data:[
							{
								name:'不要香菜',
								index:0
							}
						]
					},
					{
						id:3,
						indexof:-1,

						data:[
							{
								name:'不要洋葱',
								index:0
							}
						]
					},
					{
						id:4,
						indexof:-1,

						data:[
							{
								name:'少点醋',
								index:0
							}
						]
					},
					{
						id:5,
						indexof:-1,

						data:[
							{
								name:'多点葱',
								index:0
							}
						]
					},					
				],
				other_summary:'',
				url:''
			}
		},
		created:function(){
			this.url=this.$config.url;
			this.get_summary();
		},
		methods:{
			change_lab(index,key){				
				if(this.summary_data[index].indexof == key){
					this.summary_data[index].indexof = -1;
				}else{
					this.summary_data[index].indexof=key; 
				}	
			},
			cmt(){
				let cmt_data=new Object({more_summary:'',base_summary:''});
				cmt_data.more_summary=this.other_summary;
				for(let i in this.summary_data){
					for(let j  in this.summary_data[i].data){
						if(this.summary_data[i].data[j].index == this.summary_data[i].indexof){
							cmt_data.base_summary = cmt_data.base_summary +this.summary_data[i].data[j].name+',';
						}
					}

				}
				cmt_data.base_summary =cmt_data.base_summary.substr(0,cmt_data.base_summary.length-1); 
				cmt_data.order_number=this.$route.query.order_number=='' || this.$route.query.order_number== undefined?'':this.$route.query.order_number;
				const self =this;
				let url = self.url+'order/summary/insert';
		        let success=function(res){
		        	if(res.data.code == 200){
		        		self.$config.throw_notice('添加备注成功');
		        		self.$router.go(-1);
		        	}else{
		        		self.$config.throw_notice(res.data.msg);
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'post',cmt_data,success,error);  					
			},
			get_summary(){
				const self =this;
				let url = self.url+'order/summary/getinfo/'+self.$route.query.order_number;
		        let success=function(res){
		        	if(res.data.code == 200){
		        		let tempdata =res.data.data;
		        		self.other_summary=tempdata.more_summary;
		        		self.set_label(tempdata.base_summary);
		        	}else{
		        		self.$config.throw_notice(res.data.msg);
		        	}
		        }
		        let error = function(res){
		          self.$config.throw_notice('网络异常');
		        }
		        self.$config.apirequest(url,'get',[],success,error);  
			},
			set_label(value){
				value=value.split(',');
				for(let i=0;i<this.summary_data.length;i++){
					for(let k=0;k<this.summary_data[i].data.length;k++){
						for(let j=0;j<value.length;j++){
							if(value[j]==this.summary_data[i].data[k].name){
								this.summary_data[i].indexof=this.summary_data[i].data[k].index;
							}
						}
					}

				}

			}
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
#hobby{
	width: 30rem;
}
.js{
	width: 100%;
	height: 1rem;
	clear: left;
}
.lab_area{
	@include gloal;
	background-color:#fff;
	.title{
		width: 100%;
		text-align: left;
		@include font(1.2rem,2rem,#000);
		margin-bottom: 1rem;
		font-weight: bold;
	}
	.switch{
		background-color: #fff;
		float: left;
		margin-bottom: 1rem;
		margin-right: 1rem;
		span{
			padding:0.3rem 0.6rem;
			text-align: center;
			@include font(1.1rem,1.5rem,#666);
			border:1px solid #ddd;
			float: left;
		}
		.blue{
			background-color:#26A2FF;
			color:#fff;
		}
	}
}
.text_area{
	@include gloal;
	background-color:#fff;
	.title{
		width: 100%;
		text-align: left;
		@include font(1.2rem,2rem,#000);
		margin-bottom: 0.5rem;
		font-weight: bold;
	}	
	.body{
		width: 100%;
		textarea{
			width: 26rem;
			margin:1rem 1rem;
			height: 8rem;
			border:1px solid #ddd;
			@include font(1.1rem,1.3rem,#000);
			background-color: #eef;
			padding: 0.6rem;
		}
	}
}
</style>
