import type { AxiosRequestConfig } from 'axios'
import request from './request'

/**
 * 网络请求响应格式，T 是具体的接口返回类型数据
 */
interface CustomSuccessData<T> {
  code?: number
  msg?: string
  message?: string
  data: T
  [keys: string]: any
}

/**
 * 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
function get<T>(url: string, params?: string | object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> {
  config = {
    method: 'get', // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  }
  if (params) {
    config.params = params
  }
  return request(config)
}

/**
 * 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
function post<T>(url: string, data?: string | object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> {
  config = {
    method: 'post',
    url,
    ...config,
  }
  if (data) {
    config.data = data
  }
  return request(config)
}

/**
 * @description: 封装postParams请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
function postParams<T>(url: string, data?: string | object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> {
  config = {
    method: 'post',
    url,
    ...config,
  }
  if (data) {
    config.params = data
  }
  return request(config)
}

/**
 * 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
function patch<T>(url: string, data?: string | object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> {
  config = {
    method: 'patch',
    url,
    ...config,
  }
  if (data) {
    config.data = data
  }
  return request(config)
}

/**
 * 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<CustomSuccessData<T>>} 返回的接口数据
 */
function remove<T>(url: string, params?: string | object, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> {
  config = {
    method: 'delete',
    url,
    ...config,
  }
  if (params) {
    config.params = params
  }
  return request(config)
}

// 包裹请求方法的容器,使用 http 统一调用
const http = {
  get,
  post,
  postParams,
  patch,
  remove,
}

export default http
