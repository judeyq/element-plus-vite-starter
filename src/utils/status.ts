import { ElMessage } from 'element-plus'
// import { useUserStore } from '@/store/modules/user';

/**
 * 校验网络请求状态码
 * @param {number} status 状态码
 * @param {string | string[]} message 错误提示信息
 */
export function checkStatus(status: number, message?: string | Array<string>): void {
  // user store
//   const userStore = useUserStore()
  let errMsg = '' // 错误提示信息

  switch (status) {
    case 401:
      ElMessage.error('登录失效！请您重新登录')
      // 退出登录
      //   userStore.logout(true)
      break
    case 404:
      ElMessage.error('你所访问的资源不存在！')
      break
    default:
      if (message) {
        errMsg = typeof message === 'string' ? message : message[0]
      }
      ElMessage.error(errMsg || '请求失败！')
  }
}
