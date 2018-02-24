// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import router from './router'
import Mint from 'mint-ui';
import VueResource from 'vue-resource';
import config from './config.js';
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery';
import VModal from 'vue-js-modal'
import store from './store/store.js'
import 'vue-smooth-picker/dist/css/style.css'
import SmoothPicker from 'vue-smooth-picker'



var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(SmoothPicker)
Vue.use(VModal)
Vue.use(Mint);
Vue.config.productionTip = false
Vue.filter('strHidden', function (str,fnum=1,bnum=1,star=4) {
 	//新字符串
	let newstr='';
	//前字符串
	var fstr='';
	//后字符串
	let bstr='';
	let starstr='';
	str=str+'';
	fnum=fnum>(str.length/2)?0:fnum;
	bnum=bnum>(str.length/2)?0:bnum;
	for(let i=0;i<fnum;i++){
		fstr = fstr+str[i];
	}
	bstr = str.substr(-bnum)
	for(let i=0;i<star;i++){
		starstr +='*';
	}
	newstr=fstr+starstr+bstr;
	return newstr;
})
$('.mint-toast-text').css('font-size','1.1rem');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App}
})
