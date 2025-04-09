import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { checkStatus } from './status'


const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
})

service.interceptors.request.use(
  (config) => {
    config.headers.icode = '79FF794A54304A51'
    // const userStore = useUserStore()
    // const token = userStore.token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error: AxiosError) => {
    // 请求错误，这里可以用全局提示框进行提示
    ElMessage({
      message: '请求错误，请稍后再试',
      type: 'warning',
      duration: 5000,
    })
    return Promise.reject(error)
  },
)

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data, config } = response
    if (status === 200) {
      // 检查 responseType
      if (config.responseType === 'arraybuffer') {
        // 处理 ArrayBuffer 数据
        return {
          code: '200',
          message: 'success',
          data,
        }
      }
      else {
        // 接口网络请求成功，关闭等待提示
        if (data.code === '200') {
          // 接口请求结果正确
          return data
        }
        else {
          checkStatus(data.code, data.message)
          return Promise.reject(data)
        }
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error
    // 响应失败，关闭等待提示
    // 提示错误信息
    if (JSON.stringify(error).includes('Network Error')) {
      ElMessage({
        message: '网络超时',
        type: 'error',
        duration: 5000,
      })
    }
    // 根据响应的错误状态码，做不同的处理
    if (response) {
      checkStatus(response.status, (response.data as any).message)
    }
    return Promise.reject(error)
  },
)

export default service
