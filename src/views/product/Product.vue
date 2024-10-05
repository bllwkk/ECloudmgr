<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore();
//文章分类数据模型
const categorys = ref([
    {
        "categoryName": "美食",
        "categoryDescription": "my",
    },
])

//用户搜索时选中的分类id
const categoryName = ref('')

//用户搜索时选中的发布状态
const productName = ref('')

//文章列表数据模型
const product = ref([
    {
        "productId": 5,
        "productName": "名字",
        "productPrice": 23,
        "productPicture": "12.png",
        "productInventory": 34,
        "productDescription": "23423",
        "categoryName": "未归档"
    },

])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    productList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    productList();
}

//获取分类列表
import { categoryListService, productListService, searchProductsTotalService, productAddService, deleteProductService } from '@/api/product.js'
const categoryList = async () => {
    let result = await categoryListService();
    categorys.value = result.data;
}
categoryList();
//获取商品列表

const productList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryName: categoryName.value ? categoryName.value : null,
        productName: productName.value ? productName.value : null
    }
    let result = await productListService(params);
    let res1 = await searchProductsTotalService(params);
    total.value = res1.data;
    product.value = result.data;
    // for (let i = 0; i < product.value.length; i++) {
    //     product.value[i].productPicture = "localhost:5173/api/files/getFiles/" + result.data[i].productPicture;
    //     console.log(product.value[i].productPicture);
    // }
    console.log(result.data);
}
productList();

import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const productAddModel = ref({
    "productId": 0,
    "productName": "",
    "productPrice": 0,
    "productPicture": "",
    "productInventory": 1,
    "productDescription": "详细描述",
    "categoryName": "未归档"
})
//上传成功的回调函数
const uploadSuccess = (result) => {
    productAddModel.value.productPicture = result;
    console.log(
        result.data
    );
}
import { ElMessage, ElMessageBox } from 'element-plus'
import { productUpdateService } from '@/api/product.js'
const productAddModelClear = () => {
    productAddModel.value.categoryName = "";
    productAddModel.value.productDescription = "";
    productAddModel.value.productId = 0;
    productAddModel.value.productPrice = 0;
    productAddModel.value.productInventory = 1;
    productAddModel.value.productName = "";
    productAddModel.value.productPicture = "";
}
const productAdd = async (params) => {
    //调用接口
    if (params.productId == 0) {
        let result = await productAddService(params);
        ElMessage.success(result.msg ? result.msg : '添加成功')
    }
    else {
        let result = await productUpdateService(params);
        ElMessage.success(result.msg ? result.msg : '修改成功')
    }
    productAddModelClear;

    //让抽屉消失
    visibleDrawer.value = false;
    productList();
}
const editProductModel = ref(
    {
        "productId": 0,
        "productName": "",
        "productPrice": 0,
        "productInventory": 0,
        "productDescription": "",
        "productPicture": "",
        "categoryName": ""
    }
)



const deleteProduct = async (productId) => {//没写好，之后再写
    //弹出确认删除提示框
    ElMessageBox.confirm(
        '确认删除该商品?',
        '温馨提示',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await deleteProductService(productId);
            //刷新分类列表
            productList();
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
                <span>商品管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">添加商品</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="商品分类：">
                <el-select placeholder="请选择" v-model="categoryName">
                    <el-option v-for="c in categorys" :key="c.categoryName" :label="c.categoryName"
                        :value="c.categoryName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称:" prop="productName">
                <el-input v-model="productName" minlength="1" maxlength="10"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品名称">

            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="productList">搜索</el-button>
                <el-button @click="categoryName = ''; productName = ''; productList()">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 商品列表 -->
        <el-table :data="product" style="width: 100%">
            <el-table-column label="商品id" prop="productId"></el-table-column>
            <el-table-column label="商品标题" prop="productName"></el-table-column>
            <el-table-column label="类别" prop="categoryName"></el-table-column>
            <el-table-column label="商品库存" prop="productInventory"> </el-table-column>

            <el-table-column label="图片" width="180">

                <!-- <el-image style="width: 100px; height: 100px" :src="productPicture" :fit="cover" /> -->
                <template #="{ row, $index }">
                    <img :src="row.productPicture" alt="图片" style="width: 50px; height: 50px;" />

                </template>
            </el-table-column>

            <el-table-column label="价格" prop="productPrice"></el-table-column>
            <el-table-column label="详情" prop="productDescription"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"
                        @click="visibleDrawer = true; Object.assign(productAddModel, row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"
                        @click="deleteProduct(row.productId)"></el-button>
                </template>
            </el-table-column>

            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" @close="productAddModelClear" direction="rtl" size="50%">
            <!-- 添加商品表单 -->
            <el-form :model="productAddModel" label-width="100px">
                <el-form-item label="商品名称">
                    <el-input v-model="productAddModel.productName" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="商品库存">
                    <el-input v-model="productAddModel.productInventory" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="productAddModel.productPrice" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input v-model="productAddModel.productDescription" placeholder="请输入详情"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select placeholder="请选择" v-model="productAddModel.categoryName">
                        <el-option v-for="c in categorys" :key="c.categoryName" :label="c.categoryName"
                            :value="c.categoryName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                        action="api/api/files/upload" name="file" :headers="{ 'token': tokenStore.token }"
                        :on-success="uploadSuccess">
                        <img v-if="productAddModel.productPicture" :src="productAddModel.productPicture"
                            class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="productAdd(productAddModel)">{{ productAddModel.productId == 0 ?
                        '添加' :
                        '修改'
                        }}</el-button>
                    <!-- <el-button type="info" @click="articleModel.state = 0; addArticle();">草稿</el-button> -->
                </el-form-item>
            </el-form>
        </el-drawer>
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

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>