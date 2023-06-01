<template>
    <el-container class="layout-container-demo" style="height: 100vh">
      <el-aside width="200px">
        <el-scrollbar>
          <div class="titleV">学生管理系统</div>
          <!-- <div class="titleA"><RouterLink to="">Welcome</RouterLink></div> -->
          <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <message />
                </el-icon>学生
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1"><RouterLink to="/Students">学生个人信息</RouterLink></el-menu-item>
                 <!-- <el-menu-item index="1-2">Option 2</el-menu-item>  -->
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><icon-menu /></el-icon>教师
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1"><RouterLink to="/Teacher">教师个人信息</RouterLink></el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <setting />
                </el-icon>相关教室
              </template>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="3-1"><RouterLink to="/Classroom">相关教室信息</RouterLink></el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="3-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="3-4">
                <template #title>Option 4</template>
                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><icon-menu /></el-icon>个人中心
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1"><RouterLink to="/My">个人信息</RouterLink></el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><icon-menu /></el-icon>首页
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1"><RouterLink to="/Table">首页数据</RouterLink></el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container>
        <div class="breadxie">
          123
          <!-- <template>
  <div class="breadcumb">
      <ul>
        <li >       
            <a v-for="(item,index) in list" :key="index">
              <router-link :to="{path:item.path}">{{item.meta.title}}
                <span v-if="index < list.length-1">/ </span> 避免在导航最后出现分割线-->
              <!-- </router-link>
            </a>     
        </li>
      </ul>
  </div>
</template> --> 

        </div>        
        <el-header style="text-align: right; font-size: 12px">
          
          <div class="toolbar">
            
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Tom</span>
          </div>
        </el-header>
  
        <el-main>
          <el-scrollbar>
            <!-- <el-table :data="tableData">
              <el-table-column prop="date" label="Date" width="140" />
              <el-table-column prop="name" label="Name" width="120" />
              <el-table-column prop="address" label="Address" />
              
            </el-table> -->
            <nav>
              <!-- <RouterLink to="/">Home</RouterLink> -->
              <!-- <RouterLink to="/about">About</RouterLink> -->
            </nav>
            <RouterView />
          </el-scrollbar>
          
        </el-main>
      </el-container>
    </el-container>
    <div class="login"> 
  
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref,onMounted,watch,reactive, toRefs  } from 'vue'
  import {useRoute} from 'vue-router';
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
  import { RouterLink, RouterView } from 'vue-router'
  const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
  const tableData = ref(Array.from({ length: 20 }).fill(item))

  // const route = useRoute();
  //   const state = reactive({
  //   [] });
  //    onMounted(()=>{
  //     let matched = route.matched;//获取菜单对应的路由信息
  //     state.list = matched;
  //   })
  //   watch(()=>route.matched,(newVal,oldVal)=>{
  //     let matched = newVal;
  //     state.list = matched;//更新路由菜单数组
  //   })
    
  </script>
  
  <style scoped>
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }
  
  .layout-container-demo .el-menu {
    border-right: none;
  }
  
  .layout-container-demo .el-main {
    height: 800px;
    padding: 0;
  }
  
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
  
  .titleV {
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    background-color: white;
  }
  .titleA{
    width: 200px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: white;
    
  }
  a{
    text-decoration: none;
    color: black;
  }

  </style>