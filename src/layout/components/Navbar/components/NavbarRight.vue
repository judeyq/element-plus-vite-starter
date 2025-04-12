<template>
  <div class="navbar-right-container">
    <!-- 全屏 -->
    <div class="navbar-right-container-item"
         @click="toggle" v-if="systemStore.app.device !== DeviceEnum.MOBILE">
      <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"/>
    </div>
    <!-- 消息通知  -->
    <div class="navbar-right-container-item">
      <el-badge is-dot>
        <svg-icon icon-class="notify"></svg-icon>
      </el-badge>
    </div>
    <!-- 打开设置 -->
    <div class="navbar-right-container-item">
      <svg-icon icon-class="setting" @click="systemStore.setSettingsVisible(true)"/>
    </div>
    <!-- 用户名 + 头像   -->
    <div class="navbar-right-container-item">
      <el-dropdown trigger="click">
        <div class="el-dropdown__userInfo">
          <img src="https://foruda.gitee.com/avatar/1677159966647474882/9026884_fateyifei_1638627169.png!avatar200" alt="头像">
          <span v-if="systemStore.app.device !== DeviceEnum.MOBILE">Jude Yu</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleClickBackToLogin">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useSystemStore} from "@/store/modules/system";
import {DeviceEnum} from "@/enums/DeviceEnum";
import { useRouter } from "vue-router";
// 数据
const {isFullscreen, toggle} = useFullscreen();
const systemStore = useSystemStore();

const rightPadding = computed(() => {
  return systemStore.app.device === DeviceEnum.MOBILE ? "8px" : "12px";
})

const router = useRouter()
const handleClickBackToLogin = () => {
  router.push('/login')
}

// 生命周期
</script>

<style scoped lang="scss">
/* 样式 */
.navbar-right-container {
  display: flex;
  justify-content: right;
  align-items: center;

  &-item {
    padding: 0 v-bind(rightPadding);
  }
}

.el-dropdown__userInfo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;


  img {
    width: 24px;
    height: 24px;
    border-radius: 24px;
  }
  span {
    padding: 0 v-bind(rightPadding);
    width: 108px;
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的部分 */
    text-overflow: ellipsis; /* 显示省略号 */
  }
}

.el-badge {
  display: flex;
}

</style>
