<script setup>
import {
    Management,
    Promotion,
    PieChart,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { userInfoService } from '@/api/user.js'
import useUserInfoStore from '@/stores/userInfo.js'
// const userInfoStore = useUserInfoStore();
//调用函数获取用户详细信息
const getUserInfo = async () => {
    //调用接口
    let result = await userInfoService();
    //存到pinia中
    userInfoStore.setInfo(result.data);
}
// getUserInfo();
</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>商品分类</span>
                </el-menu-item>
                <el-menu-item index="/product">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>商品管理</span>
                </el-menu-item>
                <el-menu-item index="/order">
                    <el-icon>
                        <PieChart />
                    </el-icon>
                    <span>订单管理</span>
                </el-menu-item>
                <el-menu-item index="/user/info">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>


                <!-- <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
<el-menu-item index="/user/info">
    <el-icon>
        <User />
    </el-icon>
    <span>用户管理</span>
</el-menu-item>
<el-menu-item index="/user/avatar">
    <el-icon>
        <Crop />
    </el-icon>
    <span>更换头像</span>
</el-menu-item>
<el-menu-item index="/user/resetPassword">
    <el-icon>
        <EditPen />
    </el-icon>
    <span>重置密码</span>
</el-menu-item>
</el-sub-menu> -->
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <!-- <div>blog system<strong>{{ userInfoStore.info.userName }}</strong></div> -->
                <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <!-- <el-avatar :src="userInfoStore.info.userAvatar ? userInfoStore.info.userAvatar : avatar" /> -->

                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <!-- <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template> -->
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>Ecloud ©2023 Created by bllwkk</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            text-align: center;
            margin: 0 auto;
            border-radius: 100%;
            height: 120px;
            width: 120px;
            display: flex;
            background: url('@/assets/logo.jpg') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>