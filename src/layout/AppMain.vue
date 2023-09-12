<script lang="ts" setup>
const route = useRoute();

import { useBasicStore } from "../store/useBasicStore";
const { cachedViews, getCachedViews } = storeToRefs(useBasicStore());
const basic = useBasicStore();
const key = computed(() => route.path);

let cacheGroup = [];
const views = computed(() => {
  return cachedViews.value.join(",");
});
watch(
  () => route.name,
  (val) => {
    const routerLevel = route.matched.length;
    basic.addVisitedView(route);
  },
  { immediate: true }
);
const wrapperMap = new Map();
const formatComponentInstance = (component: any, route: any) => {
  let wrapper;
  if (component) {
    const wrapperName = route.path;
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName);
    } else {
      wrapper = {
        name: wrapperName,
        render() {
          return h(component);
        },
      };
      wrapperMap.set(wrapperName, wrapper);
    }
  }
  return h(wrapper);
};
</script>

<template>
  <div class="app-main">
    <!-- no transition -->
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="getCachedViews">
        <component
          :is="formatComponentInstance(Component, route)"
          :key="route.fullPath"
        />
      </keep-alive>
    </router-view>
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
