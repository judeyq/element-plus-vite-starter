<script lang="ts" setup>
  import { FormInstance, FormRules } from 'element-plus'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  // import { useUserStore }  from '@/store/modules/user.ts'

  const form = reactive({
    username: '',
    password: '',
  })
  const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
    ],
  })
  const loading = ref(false)
  const router = useRouter()
  // const useStore = useUserStore()
  function handleLogin(formEl: FormInstance ) {
    if (!formEl)
      return
    formEl.validate(async (valid) => {
      if (valid) {
        try {
          loading.value = true
          // useStore.login().then(() => {
          //   loading.value = false
          //   router.push('/')
          // })
          router.push('/')
        } catch (err) {
          console.log(err)
          loading.value = false
        }
      }
      else {
        console.log('error submit!')
      }
    })
  }

  function handleClickToForget() {
    router.push('/forget')
  }
</script>

<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center bg-[url('@/assets/bg.jpg')] bg-cover bg-center bg-login transition-transform will-change-transform">
    <h1 class="text-3xl font-extrabold text-white mb-12 uppercase tracking-wider drop-shadow-lg">
      IRTOS智慧滚装操作系统
    </h1>
    <div class="bg-white/80 p-8 rounded-2xl shadow-[0_8px_15px_rgba(0,0,0,0.1)] backdrop-blur-2xl 
      transform-gpu hover:translate-y-[-2px] transition-all 
      w-[320px] max-w-[90vw] mx-auto glassmorphism-effect">
      <h2 class="text-2xl text-center color-#015478 font-bold mb-6">
        用户登录
      </h2>
      <ElForm ref="loginForm" :model="form" :rules="rules" label-position="left">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"
            class="rounded-md shadow-sm focus:shadow-outline-indigo">
            <template #prefix>
              <el-icon size="20" color="#225375">
                <Avatar class="transform transition-transform hover:scale-110" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码"
            class="rounded-md shadow-sm focus:shadow-outline-indigo">
            <template #prefix>
              <el-icon size="20" color="#225375">
                <Lock class="transform transition-transform hover:scale-110" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </ElForm>
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