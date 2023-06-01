<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <div class="title">高效记录生活</div>
        <div class="sub">轻松收集，有效整理</div>
        <img src="../../assets/login.png" alt="" />
      </div>

      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/logo.png" alt="" />
          <p class="logo-text">欢迎登录</p>
        </div>
        <el-form
          ref="loginFormRef"
        
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginuser.username"
              placeholder="用户名"
              type="text"
              name="username"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="text"
              name="password"
              show-password
              v-model="loginuser.password"
              placeholder="密码"
            >
            </el-input>
          </el-form-item>
          <div :class="{tips1:states1}">账号或密码错误</div>
          <div class="flx-row">
            <el-checkbox
              style="flex: 1"
             
              label="记住我"
              size="large"
            />
            <span>忘记密码？</span>
          </div>
        </el-form>

        <div class="login-btn">
          <el-button
           
            round
          
            size="large"
            >重置</el-button
          >
          <el-button
            :icon="UserFilled"
            round
            @click="login1()"
            size="large"
            type="primary"
         :loading="false"
          >
            登录
          </el-button>
        </div>
       
        <div class="flx-row">
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import {
  UserFilled,
  Lock,
  User,
} 
from '@element-plus/icons-vue'
import { reactive, ref,watch } from 'vue'
import api from '../../axios/api'
import { useRoute, useRouter } from "vue-router"
const router = useRouter()

//登录账号显示
const loginuser=reactive({
  username:'',
  password:''
})
watch(loginuser,(newvalue,oldvalue)=>{
})

let states1=ref(0)
// localStorage.removeItem('token')
function login1(){
  let num1=loginuser.username
  let num2=loginuser.password
  api.verify({num1,num2}).then(res=>{
console.log(res.data)

if(res.data.states==0){
  states1.value=1
}else{
  states1.value=0
  localStorage.setItem('token',res.data.token)

	
  router.replace({ path: '/index', query:{}})
}
})
}
</script>



<style scoped lang="scss">
@import './index.scss';

.tips1{
  background-color: red;
	display: block;
  }
  .tips2{
  background-color: rgb(0, 255, 72);
	display: block;
  }
</style>
