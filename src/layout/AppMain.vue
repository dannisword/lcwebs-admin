<script lang="ts" setup>
// import { computed, watch } from "vue";
// import { storeToRefs } from "pinia";

//import { useRoute } from "vue-router";
const route = useRoute();

import { useBasicStore } from "../store/useBasicStore";
const { cachedViews, getVisitedViews } = storeToRefs(useBasicStore());
const basic = useBasicStore();
const key = computed(() => route.path);

let cacheGroup = [];

watch(
  () => route.name,
  (val) => {
    const routerLevel = route.matched.length;
    basic.addVisitedView(route);
    // cacheGroup.push()
  },
  { immediate: true }
);
</script>

<template>
  <div class="app-main">
    <el-container>
    <router-view v-slot="{ Component }">
      <!-- no transition -->
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  padding: var(--app-main-padding);
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
  background-color: var(--app-main-background);
}
</style>
