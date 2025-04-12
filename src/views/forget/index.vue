<template>
    <div
        class="h-screen w-screen flex flex-col items-center justify-center bg-[url('@/assets/bg.jpg')] bg-cover bg-center transition-transform will-change-transform">
        <div
            class="glassmorphism-effect mx-auto max-w-[90vw] w-[420px] transform-gpu rounded-2xl bg-white/80 p-8 shadow-[0_8px_15px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition-all hover:translate-y-[-2px]">
            <h1 class="text-2xl text-center text-indigo-700 font-bold mb-6">
                重置密码
            </h1>
            <el-form ref="formRef" class="pl-10px" status-icon :model="form" :rules="rules" label-position="left">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入注册手机号" clearable
                        class="rounded-md shadow-sm border-solid border-color-#409eff">
                        <template #prefix>
                            <el-icon size="20" color="#225375">
                                <Avatar class="transform transition-transform hover:scale-110" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item prop="code">
                    <div class="flex items-center">
                        <el-input v-model="form.code" placeholder="请输入验证码"
                            class="mr-2 w-2/3 focus:shadow-outline-indigo rounded-md shadow-sm">
                            <template #prefix>
                                <el-icon size="20" color="#225375">
                                    <Message class="transform transition-transform hover:scale-110" />
                                </el-icon>
                            </template>
                        </el-input>
                        <el-button type="primary" :disabled="codeDisabled" @click="sendCode"
                            class="ml-2 rounded-md transition-colors hover:bg-indigo-600 hover:text-white">
                            {{ codeText }}
                        </el-button>
                    </div>
                </el-form-item> -->
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" clearable status-icon show-password
                        placeholder="请输入新密码" class="mt-10px rounded-md shadow-sm border-solid border-color-#409eff">
                        <template #prefix>
                            <el-icon size="20" color="#225375">
                                <Lock class="transform transition-transform hover:scale-110" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" type="password" clearable status-icon show-password
                        placeholder="请确认新密码" class="mt-10px rounded-md shadow-sm border-solid border-color-#409eff">
                        <template #prefix>
                            <el-icon size="20" color="#225375">
                                <Lock class="transform transition-transform hover:scale-110" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" :loading="loading" @click="handleReset"
                class="mt-6 w-full rounded-md py-3 font-bold shadow-md transition duration-200 hover:bg-indigo-600 hover:shadow-indigo-200">
                重置密码
            </el-button>
            <div class="text-right mt-10px">
                <span class="text-sm text-gray-500 mt-4 cursor-pointer hover:text-indigo-600 transition-colors"
                    @click="handleClickToLogin">返回到登录页</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import type { FormInstance, FormRules } from 'element-plus'
    import { ElMessage } from 'element-plus'

    const router = useRouter()
    const formRef = ref < FormInstance > ()

    // 表单数据
    const form = reactive({
        username: '',
        code: '',
        password: '',
        confirmPassword: ''
    })

    // 验证规则
    const rules: FormRules = {
        username: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' }
        ],
        // code: [
        //     { required: true, message: '请输入验证码', trigger: 'blur' },
        //     { pattern: /^\d{6}$/, message: '验证码为6位数字', trigger: 'blur' }
        // ],
        password: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            {
                validator: (rule, value) => value === form.password,
                message: '两次密码不一致',
                trigger: 'blur'
            }
        ]
    }

    // 验证码相关
    // const codeDisabled = ref(false)
    // const codeText = ref('获取验证码')
    // const sendCode = () => {
    //     if (form.username && form.username.length === 11) {
    //         codeDisabled.value = true
    //         let seconds = 60
    //         const timer = setInterval(() => {
    //             codeText.value = `${seconds--}秒后重试`
    //             if (seconds < 0) {
    //                 clearInterval(timer)
    //                 codeDisabled.value = false
    //                 codeText.value = '获取验证码'
    //             }
    //         }, 1000)
    //     }
    // }

    // 表单提交
    const loading = ref(false)
    const handleReset = async () => {
        try {
            await formRef.value?.validate()
            loading.value = true
            // 这里需要调用密码重置接口
            // const res = await api.resetPassword(form)
            // if (res.success) {
            ElMessage.success('密码重置成功')
            router.push('/login')
            // }
        } catch (error) {
            ElMessage.error('提交失败，请检查输入')
        } finally {
            loading.value = false
        }
    }

    // 返回登录页
    const handleClickToLogin = () => {
        router.push('/login')
    }
</script>
<style scoped>
    :deep(.el-form-item__error) {
        margin-left: 20px !important;
        /* 调整左侧间距 */
        left: 20px !important;
        /* 重置定位基准 */
        white-space: nowrap;
        /* 防止换行 */
        line-height: 20px;
    }

    :deep(.el-input) {
        border: 1px solid #409eff !important;
        /* 强制覆盖默认边框 */
        border-radius: 4px;
        transition: border-color 0.3s;
    }
</style>