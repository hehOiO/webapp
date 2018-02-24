import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const  store = new Vuex.Store({
    state:{
        //用户信息
    	userinfo:'',
        //订单信息
        order_data:'',
        //用户积分
        score:0,
        //购物车数据
        shop_car_data:''
    },
    mutations:{
    	//设置用户信息
        setUserinfo(state, value){
            state.userinfo =value;
        },
        //订单信息
        setOrderData(state,value){
            state.order_data =value;
        },
        //用户积分
        setScoreData(state,value){
            state.score = value;
        },
        setShopCarData(state,value){
            value.forEach(function(value,index,array){
                console.log(value);
            });
        }
    },
    actions: {
    	//分发用户信息
    	getUserinfo({commit}){
            return new Promise((resolve, reject) => {

    			const self=Vue.prototype;
    		    let userID = self.$cookie.get('userID');
    		    if(userID == undefined || userID == ''){
    		    	reject('未登录');
    		    }
    		    let url= self.$config.url+'user/getUserinfo/'+userID;
                let success=function(res){   
                	if(res.data.code == 200){
                		commit('setUserinfo',res.data.data);
                        resolve('成功')
                	}else{
                        reject('失败');
                	}
                    
                }
                let error = function(res){
                 	self.$config.throw_notice('网络异常');
                    reject('失败');
                }
                self.$config.apirequest(url,'get',[],success,error);	
            })
    	},
        //分发用户信息
        getOrderinfo({commit},order_number){
            return new Promise((resolve, reject) => {
                const self=Vue.prototype;
                let url=self.$config.url+'order/getInfo/'+order_number;
                let success=function(res){
                    if(res.data.code == 200){
                        commit('setOrderData',res.data.data);
                        resolve('成功')
                    }else{
                        reject();
                    }
                }
                let error = function(res){
                  reject();
                }
                self.$config.apirequest(url,'get',[],success,error);                
            })
        },
        //更改订单信息
        changeOrder({commit,state}){
            return new Promise((resolve, reject) => {
                const self=Vue.prototype;
                let url=self.$config.url+'order/save';
                let success=function(res){
                    if(res.data.code == 200 ){
                        resolve();
                    }else{
                        reject(res.data.msg);
                    }
                }
                let error = function(res){
                  reject();
                }
                self.$config.apirequest(url,'post',state.order_data,success,error);                
            })
        },
        getScoreinfo({commit,state},uid){
            return new Promise((resolve, reject) => {

                const self=Vue.prototype;
                let url=self.$config.url+'user/getScore';
                let data={uid:uid}
                let success=function(res){
                    if(res.data.code == 200){
                       commit('setScoreData',res.data.data);
                        resolve();
                    }else{
                        reject(res.data.msg);
                    }
                }
                let error = function(res){
                  reject('网络异常');
                }
                self.$config.apirequest(url,'post',data,success,error);                
            })
        },
    }
})
export default store