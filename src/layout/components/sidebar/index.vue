<script lang="ts" setup>
  import SidebarMenu from '@/layout/components/sidebar/SidebarMenu.vue'

  const logoHeight = 44
</script>

<template>
  <!-- v-if="$store.getters.sidebarOpened" -->
  <div class="">
    <div class="logo-container">
      <h1 class="logo-title">
        vue3-admin
      </h1>
    </div>
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
  .logo-container {
    height: v-bind(logoHeight) + 'px';
    /* padding: 10px 0 22px 0; */
    display: flex;
    align-items: center;
    justify-content: center;

    .logo-title {
      margin-left: 10px;
      /* color: #fff; */
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      white-space: nowrap;
    }
  }
</style>