<script lang="ts" setup>
import { useApp, useBasicStore } from "../store";

import { routeHandle } from "../hooks/route-handle";
const app = useApp();
const { navigation } = routeHandle();
// emit 將資料傳遞到父元件
const emit = defineEmits(["on-toggle"]);
const state = reactive({
  dc: {} as any,
  dcs: [] as any[],
});

const toggleClick = () => {
  emit("on-toggle");
};

onBeforeMount(() => {

});
const onLogout = () => {
  useApp().logout();
  useBasicStore().delAllVisitedViews();
  navigation("/login");
};
const selectChange = (e: any) => {

};
</script>

<template>
  <div class="navbar">
    <!-- logo -->
    <div @click="toggleClick()">
        
      <el-icon class="logo-style">
        <Fold />
      </el-icon>
    </div>

    <!-- drop down-->
    <div class="right-menu">
      <el-dropdown trigger="click" size="medium">
        <div class="user-icon">
          {{ app.user.userName }}
          <el-icon><User /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="onLogout()">
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--el-color-primary-dark-2);
  box-shadow: var(--nav-bar-box-shadow);
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.right-menu {
  cursor: pointer;
  //   margin-right: 40px ;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.user-icon {
  font-size: 16px;
  color:  var(--nav-bar-background);
}
//logo
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}
.logo-style {
  font-size: x-large;
  color: #ffffff;
}
</style>
