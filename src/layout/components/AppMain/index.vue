<template>
  <div class="main-container" :class="{
    'main-tags-view' :systemStore.settings.tagsView
  }">
    <router-view #default="{ Component, route }">
      <transition :enter-active-class="`animate__animated ${systemStore.settings.animateCss}`"
        :duration="{enter:260,leave:0}">
        <keep-alive :include="cachedViews">
          <div>
            <component :is="Component" :key="route.path" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
  import { useTagsViewStore } from "@/store/modules/tagsView";
  import { useSystemStore } from "@/store/modules/system";

  const systemStore = useSystemStore();
  const cachedViews = computed(() => useTagsViewStore().cachedViews); // 缓存页面集合
</script>

<style scoped lang="scss">
  /* 样式 */
  .main-container {
    padding: 20px;
    min-height: calc(100vh - $navbar-height);
    overflow: auto;
    .app-container {
      height: calc(100vh - $navbar-height - 20px);
    }
  }

  .main-tags-view {
    min-height: calc(100vh - $navbar-height - $tags-view-height);

    .app-container {
      height: calc(100vh - $navbar-height - $tags-view-height - 20px);
    }
  }
</style>