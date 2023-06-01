<template>
  <div>
    <RouterView />
  </div>
        
       
  
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { RouterLink, RouterView } from 'vue-router'
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
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

