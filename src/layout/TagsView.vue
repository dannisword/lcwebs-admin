<script setup lang="ts">
// 可以不用
// import { useRoute, useRouter } from "vue-router";
// import { storeToRefs } from "pinia";

import { useBasicStore } from "../store/useBasicStore";
const route = useRoute();
const router = useRouter();
const basicStore = useBasicStore();

const { visitedViews } = storeToRefs(basicStore);

const isActive = (param: any) => {
  return route.path === param.path;
};

const isAffix = (tag: any) => {
  return tag.meta.affix;
};

const closeSelectedTag = (view: any) => {
  basicStore.delVisitedView(view).then((visitedViews) => {
    toLastView(visitedViews, view);
  });
};

const toLastView = (visitedViews: any, view: any) => {
  const latestView = visitedViews.at(-1);
  if (latestView) {
    router.push(latestView.path);
  } else {
    if (view.name === "Dashboard") {
      // to reload home page
      router.replace({ path: `/redirect${view.fullPath}` });
    } else {
      router.push("/");
    }
  }
};
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        v-slot="{ navigate }"
        :to="{ path: tag.path, query: tag.query }"
        custom
      >
        <div
          class="tags-view-item"
          :class="isActive(tag) ? 'active' : ''"
          @click="navigate"
        >
          {{ $t(tag.meta.title) }}
          <Close
            v-if="isAffix(tag)"
            class="el-icon-close"
            @click.prevent.stop="closeSelectedTag(tag)"
          />
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--tag-view-height);
  width: 100%;
  position: relative;
  z-index: 10;
  background: var(--tags-view-background);
  border-bottom: 1px solid var(--tags-view-border-bottom);
  box-shadow: var(--tags-view-box-shadow);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 27px;
      line-height: 26px;
      border: 1px solid var(--tags-view-item-border-color);
      color: var(--tags-view-item-color);
      background: var(--tags-view-item-background);
      padding: 0 8px;
      font-size: 13px;
      &:first-of-type {
        margin-left: 10px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: var(--tags-view-item-active-background);
        color: var(--tags-view-item-active-color);
        border-color: var(--tags-view-item-active-border-color);
        // &::before {
        //   content: "";
        //   background: var(--tags-view-background);
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: var(--tags-view-contextmenu-background);
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: var(--tags-view-contextmenu-color);
    box-shadow: var(--tags-view-contextmenu-box-shadow);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: var(--tags-view-contextmenu-hover-background);
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    border-radius: 3px;
    .el-icon-close {
      border-radius: 6px;
      width: 12px;
      height: 12px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      vertical-align: -2px;

      &:hover {
        background-color: var(--tags-view-close-icon-hover-background);
        color: var(--tags-view-close-icon-hover-color);
      }
    }
  }
}
</style>
