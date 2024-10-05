<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue'
import { categoryAddService, categoryListService, updateCategoryService, categoryDeleteService } from '@/api/product.js'
const categorys = ref()
//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryDescription: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ]
}

//声明一个异步函数
const categoryList = async () => {
    let result = await categoryListService();
    categorys.value = result.data;
}
categoryList();
//调用接口添加分类

const addCategory = async () => {

    //调用接口
    let result = await categoryAddService(categoryModel.value.categoryName, categoryModel.value.categoryDescription);
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //刷新分类列表
    categoryList();
    dialogVisible.value = false
}
//定义变量控制添加or修改弹窗标题
const title = ref('')
const categoryNameOld = ref();
//定义修改的函数
const showDialog = (row) => {
    categoryNameOld.value = row.categoryName;
    dialogVisible.value = true;
    title.value = '修改分类'
    //数据拷贝

    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryDescription = row.categoryDescription;
}
//编辑分类函数
const updateCategory = async () => {
    const params = {
        categoryNameOld: categoryNameOld.value,
        categoryNameNew: categoryModel.value.categoryName,
        categoryDescription: categoryModel.value.categoryDescription
    }
    //调用接口
    let result = await updateCategoryService(params);
    ElMessage.success(result.msg ? result.msg : '修改成功')
    clearData();

    //刷新分类列表
    categoryList();
    dialogVisible.value = false

}
//清空模型数据
const clearData = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.categoryDescription = '';
}
//删除分类

const deleteCategory = async (row) => {
    //弹出确认删除提示框
    ElMessageBox.confirm(
        '将会删除该分类下所有商品，确认删除?',
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            // categoryModel.value.id = row.id;//扩展id，方便后面修改传参
            console.log(row.categoryName)
            let result = await categoryDeleteService(row.categoryName);

            //刷新分类列表
            categoryList();
            dialogVisible.value = false

            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
            categoryList();
            dialogVisible.value = false
        })
}






</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>商品分类</span>
                <div class="extra">
                    <el-button type="primary"
                        @click="dialogVisible = true; title = '添加分类'; clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <!-- <el-table-column label="序号" width="100" type="index"> </el-table-column> -->
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类描述" prop="categoryDescription"></el-table-column>
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
                <el-form-item label="分类描述" prop="categoryDescription">
                    <el-input v-model="categoryModel.categoryDescription" minlength="1" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()"> 确认
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