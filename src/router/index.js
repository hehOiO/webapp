import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    {
        path: '/',
        component: resolve => require(['../view/public/menu.vue'], resolve),
        children:[
             //-主页--
             {
                path: '/',
                name:'index',
                component: resolve => require(['../view/index.vue'], resolve)
             },
             //主菜单活动页
             {
                path: '/menu_discover',
                component: resolve => require(['../view/discover.vue'], resolve)
             },
             //主菜单订单页
             {
                path: '/menu_order',
                component: resolve => require(['../view/order.vue'], resolve)
             },
             //主菜单订单页
             {
                path: '/menu_user',
                component: resolve => require(['../view/user.vue'], resolve)
             },
        ]
     }, 
     //-店铺-
     {
        path: '/shop',
        component: resolve => require(['../view/shop/header.vue'], resolve),
        children:[
             {
                path: '/',
                component: resolve => require(['../view/shop/index.vue'], resolve)
             },                  
             {
                path: '/shop/aptitude',
                component: resolve => require(['../view/shop/aptitude.vue'], resolve)
             },              
        ]
     },
     //-订单-
     {
        path: '/order',
        component: resolve => require(['../view/order/header.vue'], resolve),
        children:[
            //确认订单  
             {
                path: '/order/confirm',
                component: resolve => require(['../view/order/confirm.vue'], resolve)
             }, 
             //订单详情
             {
                path: '/order/detail',
                component: resolve => require(['../view/order/detail.vue'], resolve)
             }, 
             //口味爱好
             {
                path: '/order/hobby',
                component: resolve => require(['../view/order/hobby.vue'], resolve)
             },
             //支付 
             {
                path: '/order/pay',
                component: resolve => require(['../view/order/pay.vue'], resolve)
             },  
             //评论
             {
                path: '/order/evaluate',
                component: resolve => require(['../view/order/evaluate.vue'], resolve)
             },                     
        ]
     },     
     //-个人信息-
     //--登录注册--
     {
        path: '/user/register',
        component: resolve => require(['../view/public/register.vue'], resolve)
     },     
     //--基本信息--
     {
        path: '/user',
        component: resolve => require(['../view/user/header.vue'], resolve),
        children:[
             {
                path: '/user/detail',
                component: resolve => require(['../view/user/detail.vue'], resolve)
             },
             //更换手机绑定
             {
                path: '/user/mobile',
                component: resolve => require(['../view/user/mobile.vue'], resolve)
             }, 
            //更改密码
              {
                path: '/user/password',
                component: resolve => require(['../view/user/password.vue'], resolve)
             },                                          
        ]
     },
     //-活动专题-
     //--基本信息--
     {
        path: '/activity',
        component: resolve => require(['../view/activity/header.vue'], resolve),
        children:[
             //优惠餐
             {
                path: '/activity/freelunch',
                component: resolve => require(['../view/activity/freelunch/freelunch.vue'], resolve)
             }, 
             //我的优惠餐    
             {
                path: '/activity/freelunch/my',
                component: resolve => require(['../view/activity/freelunch/myfreelunch.vue'], resolve)
             }, 
             //推荐有奖  
             {
                path: '/activity/recommend',
                component: resolve => require(['../view/activity/recommend/recommend.vue'], resolve)
             },
             //推荐规则  
             {
                path: '/activity/recommend/rule',
                component: resolve => require(['../view/activity/recommend/rule.vue'], resolve)
             },
             //限时抢购  
             {
                path: '/activity/timelimit',
                component: resolve => require(['../view/activity/timelimit/timelimit.vue'], resolve)
             },  
             //积分抽奖  
             {
                path: '/activity/luckdraw',
                component: resolve => require(['../view/activity/luckdraw/luckdraw.vue'], resolve)
             }, 
             //翻牌抽奖     
             {
                path: '/activity/flop',
                component: resolve => require(['../view/activity/luckdraw/flop.vue'], resolve)
             }, 
             //刮刮乐抽奖     
             {
                path: '/activity/guaguale',
                component: resolve => require(['../view/activity/luckdraw/guaguale.vue'], resolve)
             },                                         
        ]
     },     
     //--优惠--
     {
        path: '/favourable',
        component: resolve => require(['../view/favourable/header.vue'], resolve),
        children:[
             {
                path: '/favourable/detail',
                component: resolve => require(['../view/favourable/detail.vue'], resolve)
             },
             //兑换红包
             {
                path: '/favourable/exchange',
                component: resolve => require(['../view/favourable/exchange.vue'], resolve)
             },  
             //选择红包
             {
                path: '/favourable/checkout',
                component: resolve => require(['../view/favourable/checkout.vue'], resolve)
             },                                        
        ]
     },
     //--积分--
     {
        path: '/integralshop',
        component: resolve => require(['../view/integralshop/header.vue'], resolve),
        children:[
             //商城主页
             {
                path: '/',
                component: resolve => require(['../view/integralshop/index.vue'], resolve)
             },
             //兑换商品详情
             {
                path: '/integralshop/detail',
                component: resolve => require(['../view/integralshop/detail.vue'], resolve)
             }, 
             //兑换结果
             {
                path: '/integralshop/result',
                component: resolve => require(['../view/integralshop/result.vue'], resolve)
             },   
             //兑换记录
             {
                path: '/integralshop/exchangeHistory',
                component: resolve => require(['../view/integralshop/exchangeHistory.vue'], resolve)
             }, 
             //兑换记录详情
             {
                path: '/integralshop/exchangeDetail',
                component: resolve => require(['../view/integralshop/exchangeDetail.vue'], resolve)
             },               
             //个人积分
             {
                path: '/integralshop/user',
                component: resolve => require(['../view/integralshop/user.vue'], resolve)
             }, 
             //积分说明
             //个人积分
             {
                path: '/integralshop/text',
                component: resolve => require(['../view/integralshop/text.vue'], resolve)
             },                                         
        ]
     },
     //--地址--
     {
        path: '/address',
        component: resolve => require(['../view/address/header.vue'], resolve),
        children:[
             //地址详情
             {
                path: '/address/detail',
                component: resolve => require(['../view/address/detail.vue'], resolve)
             }, 
             //地址修改
             {
                path: '/address/edit',
                component: resolve => require(['../view/address/edit.vue'], resolve)
             }, 
             //地址修改
             {
                path: '/address/checkout',
                component: resolve => require(['../view/address/checkout.vue'], resolve)
             },                                        
        ]
     },
     //--客服--
     {
        path: '/help',
        component: resolve => require(['../view/help/header.vue'], resolve),
        children:[
             //客服主页
             {
                path: '/help/index',
                component: resolve => require(['../view/help/index.vue'], resolve)
             },
             //问题详情
             {
                path: '/help/detail',
                component: resolve => require(['../view/help/detail.vue'], resolve)
             },
        ]
     },
     //--其他--
     {
        path: '/other',
        component: resolve => require(['../view/other/header.vue'], resolve),
        children:[
             //关于我们
             {
                path: '/other/about',
                component: resolve => require(['../view/other/about.vue'], resolve)
             }
        ]
     },
     {
        path: '*',
        component: resolve => require(['../view/public/error.vue'], resolve)        
     }
  ]
})


