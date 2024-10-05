import { createRouter, createWebHistory } from "vue-router";
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import CategoryVue from '@/views/product/Category.vue'
import ProductVue from '@/views/product/Product.vue'
import OrderVue from '@/views/order/Order.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
import CommonVue from '@/views/Common.vue'
import { pa } from "element-plus/es/locales.mjs";
//定义路由关系
const routes = [
        { path: '/login', component: LoginVue },
        {
            path: '/',
            component: LayoutVue,
            redirect: '/product',
            children: [
                { path: '/category', component: CategoryVue },
                { path: '/product', component: ProductVue },
                { path: '/order', component: OrderVue },
                { path: '/user/avatar', component: UserAvatarVue },
                { path: '/user/info', component: UserInfoVue },
                { path: '/user/resetPassword', component: UserResetPasswordVue }
            ]
        },
        // {
        //     path: '/',
        //     component: CommonVue,
        //     children: [
        //         { path: '/backend', component: LayoutVue },
        //     ]

        // },
    ]
    //创建路由器
const router = createRouter({
        history: createWebHistory(),
        routes: routes
    })
    //导出路由
export default router