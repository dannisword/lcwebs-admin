<script setup lang="ts">
// page
import { pageHandle } from "../hooks/page-handle";
import { routeHandle } from "../hooks/route-handle";
const page = pageHandle();

const { navigation } = routeHandle();
import jsonData from "./dashboard.json";

const docTypeOption = ref<Array<any>>([]);
const nowDate = ref<[Date, Date]>([
  new Date(2000, 0, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]);

// method
onMounted(() => {});
// methods
const click = async () => {
  navigation("/order-records");
};
</script>

<template>
  <el-container
    v-loading="page.container.isLoading"
    :element-loading-text="page.container.message"
  >
    <el-main>
      <!-- 搜尋條件-->
      <el-button type="primary" mb-2 @click="click()">入庫查詢</el-button>
    </el-main>
  </el-container>
</template>
<style scoped>
.el-select {
  width: 100%;
}
</style>
