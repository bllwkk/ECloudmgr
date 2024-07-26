<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue'
import { articleCategoryAddService, articleCategoryListService, articleCategoryRenameService, articleCategoryDeleteService } from '@/api/article.js'
const categorys = ref()
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ]
}

//声明一个异步函数
const articleCategoryList = async () => {
    let result = await articleCategoryListService();
    categorys.value = result.data;
}
articleCategoryList();
//调用接口添加分类

const addCategory = async () => {
    //调用接口
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //刷新分类列表
    articleCategoryList();
    dialogVisible.value = false
}
//定义变量控制添加or修改弹窗标题
const title = ref('')
//定义修改的函数
const showDialog = (row) => {
    dialogVisible.value = true;
    title.value = '修改分类名称'
    //数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.id = row.id;//扩展id，方便后面修改传参
}
//编辑分类函数
const renameCategory = async () => {
    //调用接口
    let result = await articleCategoryRenameService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '修改成功')

    //刷新分类列表
    articleCategoryList();
    dialogVisible.value = false

}
//清空模型数据
const clearData = () => {
    categoryModel.value.categoryName = '';
}
//删除分类

const deleteCategory = async (row) => {
    //弹出确认删除提示框
    ElMessageBox.confirm(
        '将会删除该分类下所有blog，确认删除?',
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            categoryModel.value.id = row.id;//扩展id，方便后面修改传参
            let result = await articleCategoryDeleteService(categoryModel.value);
            //刷新分类列表
            articleCategoryList();
            dialogVisible.value = false

            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除取消',
            })
        })






}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加分类'; clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加文章分类弹窗 -->
        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title=title width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : renameCategory()"> 确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>