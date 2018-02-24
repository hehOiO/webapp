import Vue from 'vue';
import VueResource from 'vue-resource';
import { Toast } from 'mint-ui';

Vue.use(VueResource);
Vue.prototype.$config={
	webname:'淘点',
  copyright:'杭州淘点版权所有',
	weblogo:'/static/img/logo.png',
	url:'https://www.scy66.cn/',
    throw_notice(str,position='middle',time = 2000,icon=""){
        Toast({
          message: str,
          position: position,
          duration: time,
          iconClass:icon
        });
    },
	apirequest:function(url,type='get',data=Object(),success_func,error_func){
            Vue.http[type](
                url,
                data,
                {emulateJSON:true}
            ).then(function(data){
            	success_func(data);
            },function(error){
            	error_func(error);
            })		
	}
};
