<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { routeHandle } from "../hooks/route-handle";
import * as store from "../store";
import data from "../views/data.json";
const app = store.useApp();
const route = routeHandle();
const { t, locale } = useI18n();
const { lang, currentLang } = storeToRefs(store.useApp());
const { collapse, user } = storeToRefs(app);
// 選單
watch(collapse, (val) => {});
// 語系
watch(lang, (val, oldVal) => {
  locale.value = val;
});

// user
watch(
  app.$state.user,
  (n) => {
    console.log(n);
  },
  { deep: true }
);
// prop define
defineProps({
  //是否折叠
  collapse: {
    type: Boolean,
    required: true,
  },
});

const nav = (val: any) => {
  console.log(val);
  if (val) {
    route.navigation(val.path);
  }
};
const handleOpen = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>

<template>
  <div id="Sidebar">
    <!-- logo -->
    <!-- <div class="sidebar-logo-container" :class="{ collapse: collapse }"> -->
    <!-- <transition name="sidebar-logo-fade"> -->
    <!--  折疊顯示   -->
    <!-- <router-link class="sidebar-logo-link" to="/"> -->
    <!-- <img class="sidebar-logo" :src="sidebarlogo" /> -->
    <!-- <h1 class="sidebar-title" v-if="!collapse">{{ $t("title") }}</h1> -->
    <!-- </router-link> -->
    <!-- </transition> -->
    <!-- </div> -->
  </div>

  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu default-active="2" @open="handleOpen" @close="handleClose">
      <el-sub-menu
        :key="menu.index"
        :index="String(menu.index)"
        v-for="menu in data.menus"
      >
        <template #title>
          <!-- <el-icon><location /></el-icon> -->
          <span class="subtitle">{{ menu.funcName }}</span>
        </template>
        <el-menu-item
          class="menu-item"
          :key="item.index"
          :index="String(item.index)"
          v-for="item in menu.subFuncs"
          @click="nav(item)"
        >
          <template #title>{{ item.funcName }}</template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
//fix open the item style issue

.reset-menu-style {
  border-right: 1px solid var(--side-bar-border-right-color);
}
ul.el-menu.el-menu--vertical {
  border-right: 0;
}
.sidebar-logo-container {
  position: relative;
  /* width: 100%; */
  height: var(--nav-bar-height);
  line-height: 50px;
  background: var(--sidebar-logo-background);
  padding-left: 14px;
  text-align: left;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      fill: currentColor;
      color: var(--sidebar-logo-color);
      width: var(--sidebar-logo-width);
      height: var(--sidebar-logo-height);
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: var(--sidebar-logo-title-color);
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
      // max-width: 40px;
      width: var(--sidebar-logo-width);
    }
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
}

.subtitle {
  color: darkblue;
  font-weight: 900;
}
.menu-item.el-menu-item.is-active {
  color: brown !important;
  font-weight: 600;
  text-decoration: underline;
}
</style>
