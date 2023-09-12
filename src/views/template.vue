<script setup lang="ts">
// 宣告變數
const state = reactive({
  container: { isLoading: false, message: "載入中" },
});
/**
 *
 */
onBeforeMount(() => {
  console.log("onBeforeMount");
});
/**
 *
 */
onMounted(() => {
  console.log("onMounted");
});
/**
 *
 */
onUnmounted(() => {
  console.log("onUnmounted");
});
</script>
<template>
  <el-container
    v-loading="state.container.isLoading"
    :element-loading-text="state.container.message"
  >
    <el-main> inbound detail </el-main>
  </el-container>
</template>
