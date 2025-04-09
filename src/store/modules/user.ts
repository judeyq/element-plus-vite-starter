import { defineStore } from 'pinia'
import { login } from '@/api/user/user.ts'
import md5 from 'md5'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: {},
    }),
    getters: {
        getToken: (state) => state.token,
        getUserInfo: (state) => state.userInfo,
    },
    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token)
        },
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        login(userInfo: any) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password: md5(password)
                }).then((data: any) => {
                    this.setToken(data.token)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    // 进行持久化存储
    persist: {
        // 本地存储的名称
        key: 'user',
        // 保存的位置
        storage: window.localStorage, // localStorage
    },
})