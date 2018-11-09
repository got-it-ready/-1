<template>
   <div>
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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                         v-model="item.isSelect"
                                         >
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                         <inputnumber :goodsId="item.id" :count="item.buycount" @goodsCountChange="getChangedGoods"></inputnumber>  
                                    </td>
                                    <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(index)" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodslist.length === 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button @click="continueBuy" class="button">继续购物</button>
                           
                            <button @click="goToPay" class="submit">立即结算</button>
                            
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
       
   </div>
</template>
<script>
    import {getLocalGoods} from '../../common/localStorage.js'
    // import axios from 'axios'

    //导入子组件
    import inputnumber from '../../components/subcomponents/inputnumber.vue'

    export default{
        //注册子组件
        components:{
           inputnumber

        },
        
        data(){
            return{ 

                goodslist:[],
                // isSelect: true
            }
          
        },

        created() {
            
            this.getGoodsListData()
            
        },

        computed:{
               //获取总数量
               getTotalCount(){
  
                let totalCount = 0
                this.goodslist.forEach(item=>{
                      if(item.isSelect){
                     totalCount += item.buycount

                   }
                })
                   
                   return totalCount
               },

               //获取总金额
               getTotalAmount(){
                  
                  let totalAmount = 0
                  this.goodslist.forEach(item=>{

                      if(item.isSelect){
                         totalAmount += item.sell_price*item.buycount

                      }
                  })
                    
                    return totalAmount
               }

        },

        methods:{

            getGoodsListData(){
    
               //获取本地存储的值

               const localGoods = getLocalGoods()
            
            //    console.log(localGoods)

                //对象转换成数组
                const keys = Object.keys(localGoods)
                //   console.log(keys)
                //,分割成字符串
                const params = keys.join(',')
                // console.log(params)

               const url = `site/comment/getshopcargoods/${params}`
               
               //获取购物车数据
                this.$axios.get(url).then(response=>{
               //遍历属性
              response.data.message.forEach(item=>{
                item.buycount = localGoods[item.id]
                item.isSeclect = true
              })

                   
                
                this.goodslist = response.data.message
                console.log(this.goodslist)
               })


            },
            //子组件传值给父组件过后，父组件执行的函数
            getChangedGoods(changeGoods){
            //    console.log(changeGoods)

            //总数量,总金额
            this.goodslist.forEach(item=>{
                 if(item.id == changeGoods.goodsId){
                       item.buycount= changeGoods.count

                 }
               
            })
             
             //准备载荷，调用vuex里的mutation方法
             this.$store.commit('updateGoods',changeGoods)
             
            },


            //给删除添加点击事件
            deleteGoods(index){
                this.$confirm('是否删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                //点击确定，先去删除本地数据
                this.$store.commit('deleteGoods',this.goodslist[index].id)
                
                //删除数据库里对应的数据
                 this.goodslist.splice(index,1)
            }).catch(() => {
                   
            });
 
         },
         // 继续购物
        continueBuy(){

             this.$router.push({path:"/goodslist"})
        },

         //生成订单按钮
         goToPay(){
            
            const ids = []
            //遍历数据，获取被选中的商品
            this.goodslist.forEach(item=>{
                if(item.isSelect){
                     ids.push(item.id)
                }
            })
            if(ids.length === 0){
                 this.$message({
                 message: '至少选中一个商品',
                 type: 'warning'
             });

             return
            }
           //用编程式导航跳转到订单页面
           this.$router.push({path: '/order', query: { ids: ids.join(',')}}) 

         }
         
        }

    }
</script>