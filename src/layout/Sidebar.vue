<script setup lang="ts">
import { reactive, toRefs, watch } from "vue";
import sidebarlogo from "../assets/logo1-w.png";
// import sidebarlogo from "../assets/itri.jpg";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { routeHandle } from "../hooks/route-handle";
import * as store from "../store";
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

onBeforeMount(() => {});
// prop define
defineProps({
  //是否折叠
  collapse: {
    type: Boolean,
    required: true,
  },
  source: {
    required: true,
  },
});

const onNav = (val: any) => {
  const path = `/${val.index}`;
  route.navigation(path);
};
const handleOpen = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>

<template>
  <div>
    <!-- logo -->
    <div class="sidebar-logo-container" :class="{ collapse: collapse }">
      <transition name="sidebar-logo-fade">
        <!--  折疊顯示   -->
        <router-link class="sidebar-logo-link" to="/">
          <img class="sidebar-logo" :src="sidebarlogo" />
          <!-- <h1 class="sidebar-title" v-if="!collapse">{{ $t("title") }}</h1> -->
        </router-link>
      </transition>
    </div>
  </div>

  <el-scrollbar>
    <el-menu
                    default-active="4"
                    class="el-menu-vertical-demo"
                    active-text-color="#fff"
                    background-color="#545c64"
                    text-color="#fff"
                    :collapse="collapse"
                    :collapse-transition="true"
                    @open="handleOpen"
                    @close="handleClose"
                  >
                    <el-sub-menu index="1">
                      <template #title>
                        <el-icon><location /></el-icon>
                        <span>Navigator One</span>
                      </template>
                      <el-menu-item-group title="Group One">
                        <el-menu-item index="1-1">item one</el-menu-item>
                        <el-menu-item index="1-2">item two</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="Group Two">
                        <el-menu-item index="1-3">item three</el-menu-item>
                      </el-menu-item-group>
                      <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                      </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                      <el-icon><icon-menu /></el-icon>
                      <span>Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                      <el-icon><document /></el-icon>
                      <span>Navigator Three</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <el-icon><setting /></el-icon>
                      <span>Navigator Four</span>
                    </el-menu-item>
                  </el-menu>
    <!-- <el-menu
      :collapse="collapse"
      :collapse-transition="true"
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
    >
      <div v-for="menu in (source as any)">
        <el-menu-item v-if="menu.hasChilds == false" :index="menu.index">
          <el-icon><location /></el-icon>
          <span :class="collapse ? 'hide-title' : ''">{{ menu.name }}</span>
        </el-menu-item>

        <el-sub-menu class="menu-content" v-else :index="menu.index">
          <template #title>
            <el-icon><location /></el-icon>
            <span :class="collapse ? 'hide-title' : ''" slot="title">
              {{ menu.name }}
            </span>
          </template>
          <el-menu-item
            v-for="sub in menu.subs"
            :index="sub.index"
            @click="onNav(sub)"
          >
            <span>{{ sub.name }}</span>
          </el-menu-item>
        </el-sub-menu>
      </div>
    </el-menu> -->
  </el-scrollbar>
</template>

<style lang="scss" scoped>
//fix open the item style issue

.reset-menu-style {
  border-right: 1px solid var(--side-bar-border-right-color);
}
ul.el-menu.el-menu--vertical {
  border-right: 0;
  .li.el-menu-item {
    font-size: x-small;
  }
}

.sidebar-logo-container {
  position: relative;
  /* width: 100%; */
  height: var(--nav-bar-height);
  line-height: 50px;
  background: var(--el-color-primary-dark-2);
//   background: var(--sidebar-logo-background);
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
}

.hide-title {
  display: none !important;
}
//
.menu-content {
  overflow: hidden;

  & > .el-submenu {
    //padding: 0 !important;

    .svg-icon {
      margin-left: 20px;
    }

    .sub-el-icon {
      margin-left: 19px;
    }

    .el-submenu__icon-arrow {
      display: none;
    }
  }
}

.el-menu-item.is-active {
    background-color: var(--el-menu-hover-bg-color) !important;
}
</style>
