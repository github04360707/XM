<template>
   <Suspense>
        <!-- 具有深层异步依赖的组件 -->
        <ClassroomSon></ClassroomSon>

        <!-- 在 #fallback 插槽中显示 “正在加载中” -->
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>
<script setup>
import ClassroomSon from '../components/ClassroomSon.vue'
import{getCurrentInstance} from 'vue'
import api from '../axios/api';
 let _this = getCurrentInstance()
 function danji(){
    
    api.getData().then(res=>{
       
        console.log(res)
    })

 }
</script>
<style></style>