<script lang="ts" setup>
  import { defineProps } from 'vue'
  import MenuItem from '@/layout/components/sidebar/MenuItem.vue'
  // 定义 props
  defineProps({
    route: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <div>
    <!-- 支持渲染多级 menu 菜单 -->
    <el-sub-menu v-if="route.children.length > 0" :index="route.path">
      <template #title>
        <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
      </template>
      <!-- 循环渲染 -->
      <sidebar-item v-for="item in route.children" :key="item.path" :route="item" />
    </el-sub-menu>
    <!-- 渲染 item 项 -->
    <el-menu-item v-else :index="route.path">
      <MenuItem :title="route.meta.title" :icon="route.meta.icon" />
    </el-menu-item>
  </div>
</template>