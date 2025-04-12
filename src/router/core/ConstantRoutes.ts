import { RouteRecordRaw } from "vue-router";
import { RouteConstant } from "@/constants/route";

export const Layout = () => import("@/layout/index.vue");
export const Home = () => import("@/views/home/index.vue");
// export const Time = () => import("@/views/time/index.vue");
// export const TemplateOne = () => import("@/views/templateOne/index.vue");
export const NotFound = () => import("@/views/error/404/index.vue");
export const SERVER_ERROR = () => import("@/views/error/500/index.vue");
// 首页路由配置 : HOME_ROUTE_RAW 为 children 不需要 '/'
export const HOME_ROUTE_RAW: RouteRecordRaw = {
    path: RouteConstant.HOME_PATH.substring(1),
    name: "Home",
    component: Home,
    meta: {
        title: '首页',
        icon: 'el-icon-HomeFilled',
        affix: true,
        keepAlive: true,
        hidden: false,
    }
}
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "/",
        component: Layout,
        meta: {
            hidden: false,
        },
        redirect: RouteConstant.HOME_PATH,
        children: [
            HOME_ROUTE_RAW,
            {
                path: "404",
                name: "NotFound",
                component: NotFound,
                meta: {
                    title: "404",
                    hidden: true,
                    keepAlive: false
                }
            }, {
                path: "500",
                name: "SERVER_ERROR",
                component: SERVER_ERROR,
                meta: {
                    title: "500",
                    hidden: true,
                    keepAlive: false
                }
            }]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
            hidden: true,
        },
    },
    {
        path: '/forget',
        name: "Forget",
        component: () => import("@/views/forget/index.vue"),
        meta: {
            hidden: true,
        },
    },
    {
        path: "/redirect",
        component: Layout,
        meta: { hidden: true },
        redirect: "/redirect/",     // /redirect/ 重定向到表示主页
        children: [
            {
                path: "/redirect/:path(.*)",
                name: "Redirect",
                meta: { hidden: true },
                component: () => import("@/views/redirect/index.vue"),
            },
        ],
    },
    {
        path: "/cargo",
        name: "Cargo",
        component: Layout,
        meta: {
            title: '船货信息',
            icon: 'el-icon-HomeFilled',
            keepAlive: true,
            hidden: false,
        },
        children: [
            {
                path: "sailling",
                name: "SaillingDate",
                component: ()=> import("@/views/cargo/SailingDate.vue"),
                meta: {
                    title: '船期信息',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                    breadcrumb: false,
                }
            },
            {
                path: "mainfest",
                name: "Mainfest",
                component: ()=> import("@/views/cargo/Mainfest.vue"),
                meta:{
                    title: '舱单管理',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                }
            },
            {
                path: "subscribe",
                name: "Subscribe",
                component: ()=> import("@/views/cargo/Subscribe.vue"),
                meta:{
                    title: '订阅管理',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                }
            },
        ]
    },
    {
        path: "/berth",
        name: "Berth",
        component: Layout,
        meta: {
            title: '泊位策划',
            icon: 'el-icon-HomeFilled',
            keepAlive: true,
            hidden: false,
            showSingleChildren: true
        },
        children: [
            {
                path: "berth-map",
                name: "BerthMap",
                component: () => import("@/views/berth/BerthMap.vue"),
                meta: {
                    title: '泊位分布图',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                },
            },
            {
                path: "allocation-map",
                name: "AllocationMap",
                component: () => import("@/views/berth/AllocationMap.vue"),
                meta: {
                    title: '编制分配图',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                },
            },
            {
                path: "query-allocation",
                name: "QueryAllocation",
                component: () => import("@/views/berth/QueryAllocation.vue"),
                meta: {
                    title: '分配图查询',
                    icon: 'el-icon-HomeFilled',
                    keepAlive: true,
                    hidden: false,
                },
            },
        ]
    }
]
