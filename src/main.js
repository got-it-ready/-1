import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'

//导入全局样式
import 'element-ui/lib/theme-chalk/index.css';
import './statics/site/css/style.css'
Vue.config.productionTip = false
// Vue.use(ElementUI)
//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col
} from 'element-ui'
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


Vue.use(VueLazyload,{
  loading:require('./statics/site/images/01.gif')
})

//导入一个过滤器
import './filters'
//导入一个路由对象
import router from './router'

//导入vuex的store
import store from './store'
new Vue({
  render: h => h(App),
  router, //注入路由
  store

}).$mount('#app')
