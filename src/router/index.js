import Vue from 'vue'
import VueRouter from 'vue-router'

//使用模块化的方式开发
Vue.use(VueRouter)

// 导入axios
import axios from 'axios'
//在vue原型上挂载一个属性$axios
Vue.prototype.$axios = axios
//设置baseURL,发送请求的时候会将baseURL和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true//让ajax携带cookie


//1.定义路由组件

// import goodslist from '../components/goods/goodslist.vue'

// import goodsinfo from '../components/goods/goodsinfo.vue'

// import shopcart from '../components/shopcart/shopcart.vue'

// import order from '../components/order/order.vue'

// import login from '../components/account/login.vue'

// import pay from '../components/pay/pay.vue'  //付款页面
// import vipCenter from '../components/vip/vipCenter.vue'//会员中心页面
// import myOrders from '../components/vip/myOrders.vue'  //订单列表页面
// import orderInfo from '../components/vip/orderInfo.vue'  //订单详情页面
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/order/order.vue')
 
const pay = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/pay.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')
//2.定义路由/创建路由实例
const router = new VueRouter({
     routes:[
       {path:'/',redirect:'/goodslist'},
       {path: '/goodslist',component:goodslist},
       {path:'/goodsinfo/:goodsId',component:goodsinfo},
       {path:'/shopcart',component:shopcart},
       {path:'/login',component:login},
       {path:'/order',component:order, meta: { checkOutLogin: true }},
       {path:'/pay',component:pay, meta: { checkOutLogin: true }},
       {path:'/vipCenter',component:vipCenter, meta: { checkOutLogin: true }},
       {path:'/myOrders',component:myOrders, meta: { checkOutLogin: true }},
       {path:'/orderInfo',component:orderInfo, meta: { checkOutLogin: true }}
       
     ]
})

//拦截所有的路由跳转
router.beforeEach((to, from, next) => { //导航守卫,是异步解析函数，此时导航在所有守卫resolve完成之前一直属于等待的状态
    //console.log(to)
     //1.把要跳转的页面先保存在本地
     if(to.path !== '/login'){
      localStorage.setItem('wantViewPath',to.fullPath)
      }
      
    //判断将要访问的路由是否包含元信息
    if(to.meta.checkOutLogin){
 
      //2.判断是否有登录。登录,跳转到下一个页面,  没有登录,跳转到登录页面
      // const url = `site/account/islogin`
      axios.get('site/account/islogin').then(response=>{
          // console.log(response.data)
          if(response.data.code === 'logined'){//表示已经登录
                 next()
          }else{
            //未登录，跳转到登录页面
            router.push({path:'/login'}) //注意点:不能用this.$router,此方法只能在vue组件中使用
          }
      })

    }else{
       next()
    }

     
})

//导出成员
export default router