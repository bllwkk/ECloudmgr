<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js';
//控制注册与登录表单的显示， 默认显示注册
//定义tokenStore
const tokenStore = useTokenStore();
//定义数据模型
const loginData = ref({
    adminName: '',
    adminPassword: '',
})

//定义表单校验规则
const rules = {
    adminName: [
        { require: true, message: '请输入账号', trigger: 'blur' },
        // { min: 11, max: 11, message: '11位数字', trigger: 'blur' }
    ],
    adminPassword: [
        { require: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 6, message: '长度为6的数字', trigger: 'blur' }
    ]
}
//调用后台接口，完成注册
import { adminLoginService } from '@/api/user.js'

//登录函数
import { useRouter } from 'vue-router'
const router = useRouter()
const login = async () => {
    //调用接口，完成登录
    let result = await adminLoginService(loginData.value.adminName, loginData.value.adminPassword);

    ElMessage.success(result.msg ? result.msg : '登录成功')
    //把得到的token存入pinia
    tokenStore.setToken(result.data)
    console.log(result.data)
    //跳转到首页
    router.push('/')
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->

            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" :model="loginData" :rules=rules>
                <el-form-item>
                    <h1>管理员登录</h1>
                </el-form-item>
                <el-form-item prop="adminName">
                    <el-input :prefix-icon="User" placeholder="请输入账户" v-model="loginData.adminName"></el-input>
                </el-form-item>
                <el-form-item prop="adminPassword">
                    <el-input name="adminPassword" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="loginData.adminPassword"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        // background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
        //     url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>