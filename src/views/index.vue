<script lang="ts" setup>
  import AppMain from '@/layout/components/AppMain.vue'
  import Navbar from '@/layout/components/Navbar.vue'
  import Sidebar from '@/layout/components/sidebar/index.vue'
</script>

<template>
  <!-- :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']" -->
  <!-- :style="{ backgroundColor: $store.getters.cssVar.menuBg }" -->
  <div class="app-wrapper">
    <Sidebar id="guide-sidebar" class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <Navbar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .app-wrapper {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 210px);
  }
</style>