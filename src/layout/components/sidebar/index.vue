<template>
  <div class="sidebar-container">
    <SidebarLogo v-if="systemStore.settings.layout == LayoutEnum.LEFT"></SidebarLogo>
    <SidebarMenu></SidebarMenu>
  </div>
</template>

<script setup lang="ts">
import {useSystemStore} from "@/store/modules/system";
import {LayoutEnum} from "@/enums/LayoutEnum";
// 数据
const systemStore = useSystemStore();
// 方法

// 生命周期
</script>

<style scoped lang="scss">
/* 样式 */
.sidebar-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: #07365f;
}

.el-menu {
  width: 100%;
  border: 0 !important;
  background-color: #225375;
}
</style>
