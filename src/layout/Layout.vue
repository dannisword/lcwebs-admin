<script lang="ts" setup>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import AppMain from "./AppMain.vue";
import TagsView from "./TagsView.vue";
import { resizeHandler } from "../hooks/resize-handle";
import { useApp } from "../store/useApp";
import { storeToRefs } from "pinia";

resizeHandler();

const app = useApp();
const { collapse, user } = storeToRefs(app);
const state = reactive({
  menus: ref<any[]>(),
});

onMounted(() => {});

const onToggle = () => {
  collapse.value = !collapse.value;
};

const classObj = computed(() => {
  return {
    closeSidebar: collapse.value,
  };
});
</script>

<template>
  <!-- 多國語言 -->
  <ConfigGlobal>
    <div :class="classObj" class="app-wrapper">
      <!-- sider -->
      <div class="container">
        <div class="aside">
          <Sidebar
            :collapse="collapse"
            :source="state.menus"
            class="sidebar-container"
          />
        </div>
        <div class="main">
          <!-- nav-->
          <div :class="{ 'fixed-header': true }">
            <Navbar @on-toggle="onToggle" />
          </div>
          <TagsView></TagsView>
          <!-- AppMain -->
          <AppMain />
        </div>
      </div>
    </div>
  </ConfigGlobal>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.aside {
  flex: 0 0 auto;
  width: --sideBar-width;
  border-right: 1px solid #efefef;
}

.main {
  flex: 1 1 auto;
  width: calc(100% - 240px);
}

.closeSidebar {
  .main {
    width: calc(100% - 90px);
  }
}
</style>
