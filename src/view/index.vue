<template>
  <div id="index">
      <div class="status">
          <div class="position"><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;<span v-if="newaddress==''">地址加载中</span><span v-if="newaddress!=''">{{ newaddress.address.city+newaddress.address.district + newaddress.address.street+newaddress.address.street_number | address_substr}}</span></div>
          <div class="weath"><span v-if="weather==''">天气加载中</span><span v-if="newaddress!=''">{{ weather.weather }} {{ weather.temperature}}</span></div>
      </div>
      <div class="search">
          <div class="put">
              <input type="text" placeholder='输入商家、商品名称'>
              <span>一点点</span><span>排骨</span>
          </div>
      </div>
      <div class="swp">
        <mt-swipe :show-indicators="true" :auto="0">
          <mt-swipe-item>
            <div class="lis" v-for="(item,index) in foodarr_1">
                <div><img :src="item.img" alt=""></div>
                <div>{{ item.name }}</div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item>
            <div class="lis" v-for="(item,index) in foodarr_2">
                <div><img :src="item.img" alt=""></div>
                <div>{{ item.name }}</div>
            </div>
          </mt-swipe-item>
        </mt-swipe>          
      </div>
      <div class="lunbo">
        <mt-swipe :show-indicators="true" :auto="3000">
          <mt-swipe-item v-for="(item,index) in ggarr">
              <a href=""><img :src="item" alt=""></a>
          </mt-swipe-item>
        </mt-swipe>         
      </div>
      <div class="activity">
          <div class="two">
              <router-link :to="{path:'/activity/timelimit'}">
                <div class="lis">
                    <p class="p1" style="color:#E81919">限时抢购</p>
                    <p class="p2">超值美味 9.9元起</p>
                    <p class="p3"><span style="color:#E81919">2087人</span>正在抢></p>
                    <img src="/static/images/timelimit.png" alt="">
                </div>
              </router-link>
                <div class="lis" style="margin-right: 0">
                    <p class="p1" style="color:#000">特价优惠</p>
                    <p class="p2">美食大减价</p>
                    <p class="p3"><span style="color:#AF8260">快来试一试></span></p>
                    <img src="/static/images/hot.png" alt="">
                </div>

              <div style="clear: left;"></div>
          </div>
      </div>
      <div class="shop">
          <div class="title">
              推荐商家
          </div>
          <div class="body">
              <ul>
                   <li v-for="(item,index) in shop"><router-link :to="{path:'/shop',query:{id:item.id}}">
                      <div class="img">
                       <img :src="item.shopimg" alt="">
                      </div>
                      <div class="text">
                          <div class='p1'>{{ item.shopname }}</div>
                          <div class="p2">商品评价</div>
                          <div class="p3"><div style="float: left"><span>￥{{ item.start_fee }}起送&nbsp;|&nbsp;</span><span>配送费{{ item.price }}元</span></div>
                              <div style="float: right;"><span>{{ item.distance }}&nbsp;|&nbsp;{{ item.need_time+'分钟' }}</span></div>
                          </div>    
                      </div>
                      <div style="clear: left;"></div>
                      </router-link>
                  </li>
              </ul>
              <infinite-loading @infinite="infiniteHandler">
                  <span slot="no-more" style="font-size: 0.95rem;position: relative;top:-0.4rem">
                      --我是有底线的--
                  </span>
              </infinite-loading>
            <div style="width: 100%;clear: left;height: 0rem;"></div>
          </div>
      </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data () {
    return {
      foodarr_1:[
        {
          name:'美食',
          img:'/static/images/food1.png'
        },
        {
          name:'甜品饮品',
          img:'/static/images/food2.png'          
        },
        {
          name:'商品便利',
          img:'/static/images/food3.png'          
        },
        {
          name:'预订早餐',
          img:'/static/images/food4.png'          
        },
        {
          name:'果蔬生鲜',
          img:'/static/images/food5.png'          
        }
      ],
      foodarr_2:[
        {
          name:'午餐',
          img:'/static/images/food6.png'
        },
        {
          name:'浪漫鲜花',
          img:'/static/images/food7.png'          
        },
        {
          name:'医药健康',
          img:'/static/images/food8.png'          
        },
        {
          name:'汉堡薯条',
          img:'/static/images/food1.png'          
        },
        {
          name:'包子粥店',
          img:'/static/images/food2.png'          
        }        
      ],
      ggarr:[
        '/static/images/g1.png',
        '/static/images/g2.png',
        '/static/images/g3.png',
        '/static/images/g4.png',
        '/static/images/g5.png'
      ],
      shop:[

      ],
      allLoaded:false,
      topStatus:'loading',
      ip:'',
      url:'',
      beginAddress:{},
      weather:'',
      newaddress:'',
      //分页
      page:{
        nowpage:0,  //当前页
        totalpage:1,  //总页数
        shownum:5, //每页显示显示的条数  
      }
    }
  },
  created(){
    //根据Ip获取用户当前地址
    this.url=this.$config.url;
    this.get_address();

  },
  filters: {
    address_substr: (value)=>{
        return value.length>12?value.substr(0,12)+'...':value;
    }
  },
  watch:{
    beginAddress(){

        if(this.beginAddress.address != undefined){
            this.newaddress=this.beginAddress;

            this.get_weather();
        }        
    }
  },
  components: {
    InfiniteLoading,
  },
  methods:{
    infiniteHandler($state) {
        const self=this;
        self.page.nowpage++;
        let url=self.url+'shop/getinfo?nowpage='+self.page.nowpage+'&shownum='+self.page.shownum;
        let data={coordinate:''};
        data.coordinate=self.newaddress.coordinate;

        let success=function(res){
          if(res.data.code ==200){
            self.page.totalpage=res.data.data.totalpage;
            self.shop = self.shop.concat(res.data.data.info);
            if(self.page.nowpage < self.page.totalpage){
              $state.loaded();
            }else{
              $state.complete();
            } 
          }else{
            self.$config.throw_notice('获取店铺信息失败');
          }
        }
        let error = function(res){
          self.$config.throw_notice('失败');
        }
        self.$config.apirequest(url,'post',data,success,error);    
    },
    get_address(){
      const self=this;
      self.beginAddress= self.$cookie.get('beginAddress');
      if(self.beginAddress == undefined){
        let map = new BMap.Map("allmap");
        let point = new BMap.Point();
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
              let nowAddress=new Object();
              nowAddress.address=r.address;
              nowAddress.coordinate={"lng":r.longitude,"lat":r.latitude};
              self.$cookie.set('beginAddress',JSON.stringify(nowAddress));
              self.beginAddress=nowAddress;
          }else {
             self.$config.throw_notice('获取地址失败');
          }     
        },{enableHighAccuracy: true})        
      }else{  
        self.beginAddress=JSON.parse(self.$cookie.get('beginAddress'));
      }
    },
    get_weather(){
      const self=this;
      let city = self.beginAddress.address.city;
      let url=self.url+'api/weather/'+city;
      self.weather= self.$cookie.get('weather');
      let success=function(res){
          if(res.data.code== 200 ){
              self.$cookie.set('weather',JSON.stringify(res.data.data.weather));
              self.weather= self.$cookie.get('weather');
              self.weather=JSON.parse(self.weather);

          }else{
            self.$config.throw_notice(res.data.msg);
          }  
      }
      let error = function(res){
        self.$config.throw_notice('失败');
      }
      if(self.weather == undefined){
        self.$config.apirequest(url,'get',[],success,error);   
      }else{
        self.weather= self.$cookie.get('weather');
        self.weather=JSON.parse(self.weather);     
      }
         
    },
    get_shopinfo(){
      const self=this;

                
    }
  }
}
</script>
<style>
.mint-swipe-indicators .is-active{
  background-color: #ff0000;
}

</style>
<style scoped lang="scss">
@mixin gloal{
   width:28rem; 
   padding:1rem;
   text-align: left;
    margin-top: -1px;
}
$top-background:#01AAED;
@mixin font($size,$l-height,$color){
    font:#{$size}/#{$l-height} '微软雅黑'; 
    color: $color;      
}
#index{
  background-color: #fff;
}
.status{
  @include gloal;

  height: 2rem;
  padding-top:1.5rem;
  padding-bottom:0rem;
  background-color:$top-background;
  .position{
    width: 14rem;
    height:2rem;
    @include font(1.3rem,2rem,#fff);
    float: left;
    overflow: hidden;
  }
  .weath{
    width: 14rem;
    height:2rem;
    float: right;
    text-align: right;
    @include font(1.1rem,2rem,#fff);
  }
}
.search{

  @include gloal;
  background-color:$top-background;
  .put{
    width: 100%;
    @include font(1rem,1.2rem,#fff);
    span{
      margin-right: 1rem;
    }
    span:last-child{
       margin-right: 0rem;
    }
    input{
      width: 100%;
      height:2.2rem;
      border: 0px;
      margin-bottom: 0.2rem; 
      @include font(1rem,2rem,#fff);
       text-align: center;     
    }
  }
}
.swp{
  @include gloal;
  padding: 0px;
  width: 30rem;
  height: 15rem; 

  .lis{
    float: left;
    width: 25%;
    @include font(1rem,1.5rem,#666);
    text-align: center;
    padding:1.5rem 0rem 0rem 0rem;
    div{
      width: 100%;
      img{
        margin-left: 0.3rem;
        width: 3rem;
        height: 3rem;
      }
    }
  }
}
.activity{
  @include gloal;
  margin-bottom: 0.6rem;
  margin-top: 0.1rem;
  text-align: left;
  .two{
    width: 100%;
    .lis{
      padding:0rem 1rem;
      padding-bottom: 0rem;
      margin-bottom: 0.5rem;
      background-color: #F6F6F6;
      width: 11.8rem;
      float: left;
      margin-right: 0.4rem;
      height: 11.5rem;
      .p1{
        margin-top: 1rem;
        width: 100%;
        @include font(1.3rem,1.8rem,#fff);
        font-weight: bold;
      }
      .p2{
        width: 100%;
        @include font(1rem,1.6rem,#666);        
      }
      .p3{
        width: 100%;
        @include font(0.95rem,1.6rem,#000); 
        font-weight: bold;        
      }
      img{
        width: 10rem;
        position: relative;
        left: 2.5rem;

      }
    }
  }
}
.lunbo{
  @include gloal;
  height: 8rem; 
  padding: 0rem 0.7rem 0rem 0.7rem;
  img{
    width: 100%;
    height: 6rem;
  } 
}
.shop{
    @include gloal;
    .title{
      width: 100%;
      height: 2.5rem;
      @include font(1.3rem,2.5rem,#666); 
      border-bottom: 1px solid #ddd; 
    }
    .body{
      width: 100%;
      ul{
        width: 100%;
        padding: 0px;
        li{
          width: 100%;
          margin-bottom: 0.8rem;
          margin-top: 0.8rem;
          padding-bottom:0.5rem;
          border-bottom: 1px solid #ddd;
          .img{
            width: 18%;
            margin-right:2%;
            float: left;;
            img{
              width: 100%;
            }
          }
          .text{
            float: left;
            width:79%; 

            .p1{
              @include font(1.3rem,2rem,#000); 
              font-weight: bold;  
              width: 100%;             
            }
            .p2{
              @include font(0.9rem,1.5rem,#333);
              width: 100%;                
            }
            .p3{
              @include font(0.9rem,1.5rem,#999);
              width: 100%;                
            }
          }
        }

      }
    }
}

</style>
