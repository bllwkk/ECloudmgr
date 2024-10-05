<script setup>
import { ref } from 'vue'
import { userInfoService, enableUserService, disableUserService } from '@/api/user.js'
import {
    TurnOff,
    Open
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const userInfoList = ref(
    [
        {
            "userName": "12345678910",
            "userNickname": '小绿',
            "userPhone": '19878645679',
            "userState": "1"
        },
    ]
)
const getUserInfo = async () => {
    let result = await userInfoService();
    console.log(result.data);
    userInfoList.value = result.data;
}
getUserInfo();
const enable = async (userName) => {
    let result = await enableUserService(userName);
    ElMessage.success(result.message ? result.message : '启用成功');
    getUserInfo();
}
const disable = async (userName) => {
    let result = await disableUserService(userName);
    ElMessage.success(result.message ? result.message : '禁用成功');
    getUserInfo();
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>用户管理</span>
            </div>
        </template>
        <el-row>
            <el-table :data="userInfoList" stripe style="width: 100%">
                <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="昵称" prop="userNickname"></el-table-column>
                <el-table-column label="联系电话" prop="userPhone"></el-table-column>
                <el-table-column label="状态" prop="userState"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="{ row }">
                        <el-button v-if="row.userState === '1'" :icon="TurnOff"
                            @click="disable(row.userName)"></el-button>
                        <el-button v-if="row.userState === '0'" :icon="Open" @click="enable(row.userName)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-card>
</template>