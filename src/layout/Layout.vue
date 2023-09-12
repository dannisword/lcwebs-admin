<script lang="ts" setup>
import Navbar from "./Navbar.vue";
import * as store from "../store";
import Sidebar from "./Sidebar.vue";
import AppMain from "./AppMain.vue";
import TagsView from "./TagsView.vue";
import { resizeHandler } from "../hooks/resize-handle";
import { useApp } from "../store/useApp";
import { storeToRefs } from "pinia";
import sidebarlogo from "../assets/Jabil-One-w.svg";
import { routeHandle } from "../hooks/route-handle";
resizeHandler();

const { navigation } = routeHandle();
const app = useApp();
const { collapse, user } = storeToRefs(app);

const onToggle = () => {
  collapse.value = !collapse.value;
};

const classObj = computed(() => {
  return {
    closeSidebar: collapse.value,
  };
});

const onLogout = () => {
  store.useApp().logout();
  navigation("/login");
};
</script>

<template>
  <!-- 多國語言 -->
  <ConfigGlobal>
    <div :class="classObj" class="app-wrapper">
      <!-- sider -->
      <div class="container">
        <div class="aside">
          <Sidebar :collapse="collapse" class="sidebar-container" />
        </div>
        <div class="main">
          <!-- nav-->
          <div :class="{ 'fixed-header': true }">
            <Navbar @on-toggle="onToggle" />
          </div>
          <TagsView> </TagsView>
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

.header {
  background: #002b49;
  height: 50px;
  color: #ffff;
  padding: 13px;
  font-weight: 500;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}

.left-menu {
  display: flex;
  flex-flow: row;
  text-decoration: none;
  span {
    margin-left: 10px;
  }
}
.right-menu {
  display: flex;
  align-items: center;
  .el-dropdown {
    display: inline-flex;
    position: relative;
    color: var(--el-color-white);
    font-size: var(--el-font-size-base);
    line-height: 1;
    vertical-align: top;
  }
}

.logo {
  max-width: 100%;
  width: 70px;
}
.footer {
  height: 40px;
  text-align: center;
  padding: 10px;
  background: whitesmoke;
  font-size: 10px;
}

.aside {
  flex: 0 0 auto;
  max-width: --sideBar-width;
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
