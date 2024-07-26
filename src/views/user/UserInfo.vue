<script setup>
import { ref } from 'vue'
const userInfo = ref({
    id: 1,
    userAccount: '',
    userName: '',
    userAvatar: '',
    userProfile: '',
    userRole: '',
    createTime: '',
    isDelete: 0
})
const rules = {
    userName: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        {
            pattern: /^\S{2,10}$/,
            message: '昵称必须是2-10位的非空字符串',
            trigger: 'blur'
        }
    ]
    // email: [
    //     { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    //     { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    // ]
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登录账号">
                        <el-input v-model="userInfo.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="注册时间" prop="createTime">
                        <el-input v-model="userInfo.createTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="userName">
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="用户简介" prop="userProfile">
                        <el-input v-model="userInfo.userProfile"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>