<script setup lang="ts">
import { useBasicStore } from "../store/useBasicStore";
const route = useRoute();
const router = useRouter();
const basicStore = useBasicStore();

const { visitedViews } = storeToRefs(basicStore);

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
});
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
const click = () => {
  state.visible = false;
};
const openMenu = (event: any) => {
  state.top = 30;
  state.left = event.x - 30;
  state.visible = true;
};
</script>

<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-scrollbar
      ref="scrollContainer"
      :vertical="false"
      class="scroll-container"
    >
      <div class="tags-view-wrapper">
        <router-link
          v-for="tag in visitedViews"
          v-slot="{ navigate }"
          :to="{ path: tag.path, query: tag.query }"
          custom
          @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        >
          <div
            class="tags-view-item"
            :class="isActive(tag) ? 'active' : ''"
            @click="navigate"
            @contextmenu.prevent="openMenu($event)"
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
    </el-scrollbar>
    <ul
      v-show="state.visible"
      :style="{ left: state.left + 'px', top: state.top + 'px' }"
      class="contextmenu"
    >
      <li @click="click">取消</li>
      <li @click="click">關閉</li>
      <li>關閉其他</li>
      <li>關閉全部</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  --tags-view-item-active-background: #4db6ac;
  --tags-view-item-active-border-color: #4db6ac;
  --tags-view-item-active-color: #fff;
  --tags-view-contextmenu-background: #e0e0e0;
  --tags-view-contextmenu-hover-background: #e0e0e0;
  margin-top: 8px;
  height: var(--tag-view-height);
  width: 100%;
  position: relative;
  z-index: 10;
  background: var(--tags-view-background);
  border-bottom: 1px solid var(--tags-view-border-bottom);
  box-shadow: var(--tags-view-box-shadow);
  font-size: 16px;
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
      border-radius: 0px;
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
        &::before {
          content: "*";
          background: var(--tags-view-background);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
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
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}

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
