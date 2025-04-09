/**
 * 登录请求参数类型
 */
export type loginDataType = {
    username: string;
    password: string;
};

/**
 * 登录返回参数类型
 */
export interface userInfoRepType {
    token: string;
    // refreshToken: string;
    // scope: string;
    // tokenType: string;
    // expiresIn: number;
}