<script lang="ts" setup>
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from '@/layout/components/sidebar/SidebarItem.vue'

// 计算路由表结构
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>

<template>
  <!-- 一级 menu 菜单 -->
  <!-- :collapse="!$store.getters.sidebarOpened"
  :text-color="$store.getters.cssVar.menuText"
  :active-text-color="$store.getters.cssVar.menuActiveText" -->
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    />
  </el-menu>
</template>
