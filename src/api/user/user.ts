import http from '@/utils/request.ts';
import { loginDataType, userInfoRepType } from '@/types/user.ts';

const api = {
    login: '/sys/login',
};
// 登录
export function login(data: loginDataType) {
    return http.post<userInfoRepType>(api.login, data);
}