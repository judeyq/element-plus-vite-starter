<script lang="ts" setup>
  import { computed } from 'vue'
  // import { useStore } from 'vuex'

  // const store = useStore()
  // function toggleClick() {
  //   store.commit('app/triggerSidebarOpened')
  // }
  function toggleClick() {
    // store.commit('app/triggerSidebarOpened')
  }

  // const icon = computed(() =>
  //   store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed',
  // )
  const icon = computed(() => 'hamburger-opened')
</script>

<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon" />
  </div>
</template>

<style lang="scss" scoped>
  .hamburger-container {
    padding: 0 16px;

    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
  }
</style>