import {
    NavigationFailure,
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded,
    Router
} from "vue-router";
import NProgress from 'nprogress'; // 导入 NProgress
import "nprogress/nprogress.css"; // 导入 NProgress 的样式

NProgress.configure({
    showSpinner: false,     // 是否显示旋转进度条
    easing: 'ease',         // 进度条动画效果
    speed: 500,             // 进度条加载速度，单位是毫秒
    minimum: 0.1,           // 最小百分比
    trickleSpeed: 200,      // 自动增加进度条的速度
});

export function createRouterGuards(router: Router) {
    // 前置路由守卫
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        NProgress.start()
        next()
    })
    // 后置路由守卫
    router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure | void) => {
        NProgress.done()
    })
    // 错误路由守卫
    router.onError((error, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
        console.error('路由错误,错误提示文件在RouteGuards.ts====>', error);
        NProgress.done()
    });
}
