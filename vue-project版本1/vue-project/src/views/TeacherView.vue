<template>
  <div>
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <TeachSon></TeachSon>

    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  </div>
</template>

<script setup>
  import TeachSon from '../components/TeachSon.vue'
</script>

<style>
</style>
