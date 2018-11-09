<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                          <el-form :model="order" status-icon :rules="rules" ref="orderRef" label-width="150px">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                    </el-form-item>
                                     <el-form-item label="所属地区：" prop="accept_name">
                                         <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                           
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                        <el-input style="width:500px;" v-model="order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：">
                                        <el-input style="width:300px;" v-model="order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：">
                                        <el-input style="width:300px;" v-model="order.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                    
                                        <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio-group v-model="order.express_id" @change="expressChange">
                                            <el-radio label="1">顺丰快递<em>费用：20.00元</em></el-radio>
                                            <el-radio label="2">圆通快递<em>费用：10.00元</em></el-radio>
                                            <el-radio label="3">韵达快递<em>费用：8.00元</em></el-radio>
                                        </el-radio-group>                                    
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodslist" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                  <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                 {{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getSum}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click="goBack">返回购物车</a>
                                        <a @click="goToOrder" id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  //导入三省联动的包
   import VDistpicker from 'v-distpicker'
//    import axios from 'axios'
   import {getLocalGoods} from '../../common/localStorage.js' //
    export default {
         
       
        //注册组件
       components: { VDistpicker },
       data(){
           
            var checkMobile = (rule, value, callback) => {
                if((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)){
                      callback()
                }else{
                      callback(new Error("手机号不合法!"))
                   }
            };
           
           return{
                goodslist:[],  //渲染的数据
                totalCount: 0, //总数量
                totalAmount:0, //总价格
                order:{
                    accept_name:'张三',
                    area: { province:{
                            "code": "440000",
                            "value": "广东省"
                            },
                          city:{
                             "code": "440300",
                             "value": "深圳市"
                            }, 
                          area:{
                              "code": "440306",
                              "value": "宝安区"
                          } 
                        },
                    
                    address:'中粮',
                    mobile:'13284966666',
                    email: '1388766@163.com',
                    post_code: '5185770',
                    payment_id: "6",
                    express_id: "1",
                    expressMoment: 20,
                    message:"快点发货",
                   
                    


                },
                //表单校验规则
                 rules:{
                      accept_name: [
                         { required: true, message: '请输入收件人姓名', trigger: 'blur' }
                      ],
                       address:[
                          { required: true, message: '请输入详细地址', trigger: 'blur' }
                      ],
                       mobile:[
                          { validator: checkMobile, trigger: 'blur' }
                       ]
                 },
                
               

           }
       },
       created() {
           this.getgoodslist()

           
       },
       computed:{

           getSum(){

               return this.totalAmount + this.order.expressMoment
           }
       },
       methods:{ 
   
           //渲染页面
           getgoodslist(){

               const localGoods = getLocalGoods()//{88: 4, 93: 1, 94: 3}
               //设置后台需要的商品is

               this.order.goodsids = this.$route.query.ids
               //创建一个临时的对象,文档中后台需要的数据
               const temObj = {}
               //发送请求
               const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`
                 this.$axios.get(url).then(response=>{
                    
                      //确保拿到的数字能做加法运算
                      let tempCount = 0
                      let tempAmount = 0
                    response.data.message.forEach(item=>{

                        item.buycount = localGoods[item.id]
                            
                       
                        temObj[item.id] = item.buycount
  
                        tempCount += item.buycount  //商品总数量
                        tempAmount += item.buycount * item.sell_price
                           
                    })
                       this.goodslist = response.data.message
                       this.totalCount = tempCount
                       this.totalAmount = tempAmount
                       //设置后台需要的商品总金额,数量
                       this.order.goodsAmount = tempAmount
                       this.order.cargoodsobj = temObj
                      
                })

                 //console.log(this.express_id)
           },
          //配送方式值改变事件
          expressChange(label){
            
            switch(label){

                 case '1':
                   this.order.expressMoment = 20
                   break

                 case '2':
                   this.order.expressMoment = 10
                   break

                 case '3':
                  this.order.expressMoment = 8
                  break

                 default:
                 break
            }
            

         },

         //获取三省联动的值
          onSelected(data) {
            
               this.order.area = data

            //    console.log( this.order.area)
          },
           
          //点击确认订单按钮
          goToOrder(){

              this.$refs.orderRef.validate((valid) => {
                if (!valid) {

                 console.log('error submit!!');
                  return false;
                }
                    // console.log(this.order)
                 const url = `site/validate/order/setorder`
                    //提交数据给后台
                 this.$axios.post(url,this.order).then(response=>{

                        //console.log(response)//后台返回订单编号
                        if(response.data.status === 0){
                            //1.跳转到订单详情页面,带上订单编号
                            this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})
                             
                             //2.删除本地的商品信息
                            const idsArr = this.$route.query.ids.split(',') //split() 方法用于把一个字符串分割成字符串数组
                             //遍历数组
                             idsArr.forEach(id=>{
                                
                                 this.$store.commit('deleteGoods',id)

                             })
                        }
                        
                  });


              
              });
            },

             //点击返回购物车按钮
             goBack(){

                 this.$router.go(-1)
             }
          
          },

        
  

   
    }
</script>
