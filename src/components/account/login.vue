<template>
    <div>
       <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model=" user_name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input v-model="password" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="goLogin" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import axios from 'axios'
    import {bus} from '../../common/commonvue.js'

    export default{    
       data(){
         return{
               user_name:'zhangsan',
               password: '123'
             }
       },
        

       methods:{
           goLogin(){

                
               //发送请求
               const url = `site/account/login`
               this.$axios.post(url,{user_name: this.user_name,password: this.password}).then(response=>{
                      
                   
                   if(response.data.status === 0){ //登录成功
                       //跳转到对应的页面
                       this.$router.push({ path: localStorage.getItem('wantViewPath') })
                       //发送消息给vue  已经登录成功
                       bus.$emit('loginSuccess')
                     
                   }
                 

               })
            
           }

       }

    }

</script>