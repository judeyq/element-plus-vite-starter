<script lang="ts" setup>
  import { FormInstance, FormRules } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  // import { useUserStore }  from '@/store/modules/user.ts'

  const form = reactive({
    username: 'admin',
    password: '123456',
  })
  const rules = reactive < FormRules > ({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { max: 11, message: '手机号码长度为11位', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
    ],
  })
  const loading = ref(false)
  const router = useRouter()
  // const useStore = useUserStore()
  const loginForm = ref < FormInstance | null > (null);
  const handleLogin = async () => {
    if (!loginForm.value) return;
    try {
      // 使用 await 简化验证逻辑
      const valid = await loginForm.value.validate();
      if (valid) {
        loading.value = true;
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      loading.value = false;
    }
  };

  function handleClickToForget() {
    router.push('/forget')
  }
  const createRipple = (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    // 设置波纹位置
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;

    // 动态添加到容器
    document.body.appendChild(ripple);

    // 移除波纹（动画结束后）
    setTimeout(() => {
      ripple.remove();
    }, 5000);
  };
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center bg-[url('@/assets/bg.jpg')] bg-cover bg-center bg-login transition-transform will-change-transform ripple-effect"
    @mousedown="createRipple">
    <h1 class="text-3xl font-extrabold text-white mb-12 uppercase tracking-wider drop-shadow-lg">
      IRTOS智慧滚装操作系统
    </h1>
    <div class="bg-white/80 p-8 rounded-2xl shadow-[0_8px_15px_rgba(0,0,0,0.1)] backdrop-blur-2xl 
        transform-gpu hover:translate-y-[-2px] transition-all 
        w-[420px] max-w-[90vw] mx-auto glassmorphism-effect">
      <h2 class="text-2xl text-center color-#015478 font-bold mb-6">
        用户登录
      </h2>
      <el-form class="pl-10px" ref="loginForm" :model="form" :rules="rules" status-icon label-position="left">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" clearable autocomplete="off"
            class="rounded-md shadow-sm border-solid border-color-#409eff">
            <template #prefix>
              <el-icon size="20" color="#225375">
                <Avatar class="transform transition-transform hover:scale-110" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off" show-password placeholder="请输入密码"
            class="mt-10px rounded-md shadow-sm border-solid border-color-#409eff">
            <template #prefix>
              <el-icon size="20" color="#225375">
                <Lock class="transform transition-transform hover:scale-110" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="w-full mt-6 py-3 rounded-md font-bold 
            hover:bg-indigo-600 transition duration-200 
            shadow-md hover:shadow-indigo-200" :loading="loading" @click="handleLogin">
        登录系统
      </el-button>
      <div class="text-right mt-10px">
        <span class="text-sm text-gray-500 mt-4 cursor-pointer hover:text-indigo-600 transition-colors"
          @click="handleClickToForget">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :deep(.el-form-item__error) {
    margin-top: 4px;
    margin-left: 20px !important;
    /* 调整左侧间距 */
    left: 20px !important;
    /* 重置定位基准 */
    white-space: nowrap;
    /* 防止换行 */
    line-height: 10px;
  }

  :deep(.el-input) {
    border: 1px solid #409eff !important;
    /* 强制覆盖默认边框 */
    border-radius: 4px;
    transition: border-color 0.3s;
  }

  .ripple-effect {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    /* 新增：设置波纹初始半径 */
    --ripple-radius: 220px;
  }

  .ripple-effect::before {
    content: '';
    position: absolute;
    /* 新定位方式：初始隐藏在中心 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: var(--ripple-radius);
    height: var(--ripple-radius);
    background: rgba(255, 255, 255, 0.3);
    /* border-radius: 50%; */
    border-radius: 10px;
    opacity: 0.8;
    transition: all 0.6s ease-out;
    /* 新增：超出部分隐藏 */
    pointer-events: none;
  }

  /* 悬停时触发波纹 */
  .ripple-effect:hover::before,
  .ripple-effect:active::before {
    transform: translate(-50%, -50%) scale(2.5);
    /* 扩大到2.5倍 */
    opacity: 0.9;
  }

  /* 点击时动态定位（需配合JS） */
  .ripple-effect[data-ripple]::before {
    top: var(--ripple-y);
    left: var(--ripple-x);
    transform: translate(-50%, -50%) scale(1.1);
    animation: ripple-animation 0.8s ease-out;
  }

  @keyframes ripple-animation {
    to {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
</style>