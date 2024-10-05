<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { showOrdersByStatusService, getOrderByIdService, shipmentService } from '@/api/order.js'
import { useTokenStore } from '@/stores/token.js'
import { ElMessage, ElMessageBox } from 'element-plus'
const tokenStore = useTokenStore();
const activeName = ref('全部')
import {
    Search,
    Right
} from '@element-plus/icons-vue'

const order = ref(
    [
        {
            "orderId": 1,
            "userName": "ww",
            "orderSumPrice": 100.9,
            "orderStartTime": "2024-09-14 09:15:30",
            "orderState": "待付款",
            "addrId": 234567
        },
    ]
);
const getData = async (type) => {
    console.log(type);
    let result = await showOrdersByStatusService(type);
    order.value = result.data;

}
getData('全部');
const orderDetials = ref(
    {
        "orderId": 100000003,
        "orderSumPrice": 34664,
        "orderStartTime": "2024-10-04 13:55:36",
        "orderState": "待付款",
        "addrVO": {
            "addrId": 120001,
            "addrRecipient": "黄忠",
            "addrPhone": "13787633456",
            "addrDetail": "寝室楼"
        },
        "orderProductVOList": [
            {
                "productId": 2119087002,
                "productNum": 1,
                "productName": "麦酥园沙琪玛",
                "productPrice": 48,
                "productPicture": "/api/api/files/f4b79007-6eae-4413-937d-e572b480111e_0cd70a1cceb2e1a57aa9ef99abbe0ee5.jpg",
                "deleted": 0
            },

        ]
    }
);
const getOrderDetials = async (orderId) => {
    let result = await getOrderByIdService(orderId);
    orderDetials.value = result.data;
    console.log(orderDetials.value);
}
const handleShipment = async (orderId) => {
    let result = shipmentService(orderId);
    ElMessage.success(result.message ? result.message : "发货成功！");
    getData("全部");
}
import type { Action } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>订单管理</span>
            </div>

        </template>

        <el-form-item>
            <el-button type="primary" @click="getData('全部')">全部</el-button>
            <el-button type="primary" @click="getData('待付款')">待付款</el-button>
            <el-button type="primary" @click="getData('待发货')">待发货</el-button>
            <el-button type="primary" @click="getData('待收货')">待收货</el-button>
            <el-button type="primary" @click="getData('已完成')">已完成</el-button>
            <el-button type="primary" @click="getData('已取消')">已取消</el-button>
        </el-form-item>

        <!-- 订单列表 -->
        <el-table :data="order" style="width: 100%">
            <el-table-column label="订单id" prop="orderId"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="订单总额" prop="orderSumPrice"></el-table-column>
            <el-table-column label="时间" prop="orderStartTime"> </el-table-column>
            <el-table-column label="订单状态" prop="orderState"></el-table-column>
            <el-table-column label="地址Id" prop="addrId"></el-table-column>
            <el-table-column label="详情" width="100">
                <template #default="{ row }">
                    <el-button :icon="Search" circle plain type="primary"
                        @click="getOrderDetials(row.orderId); dialogVisible = true"></el-button>
                </template>
            </el-table-column>
            <el-table-column label="发货" width="100">
                <template #default="{ row }">
                    <!-- 判断订单状态，显示“发货”按钮 -->
                    <el-button v-if="row.orderState === '待发货'" :icon="Right" circle plain type="danger"
                        @click="handleShipment(row.orderId)"></el-button>

                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>


        <el-dialog v-model="dialogVisible" title="订单详情" width="80%" :before-close="handleClose">
            <span>订单编号：{{ orderDetials.orderId }}</span><br>
            <span>订单创建时间：{{ orderDetials.orderStartTime }}</span><br>
            <span>订单总额：{{ orderDetials.orderSumPrice }}</span><br>
            <span>签收人：{{ orderDetials.addrVO.addrRecipient }}</span><br>
            <span>详细地址：{{ orderDetials.addrVO.addrDetail }}</span><br>
            <span>联系电话：{{ orderDetials.addrVO.addrPhone }}</span><br>
            <el-table :data="orderDetials.orderProductVOList" stripe style="width: 100%">
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.productPicture" alt="图片" style="width: 50px; height: 50px;" />

                    </template>
                </el-table-column>
                <el-table-column label="商品id" prop="productId"></el-table-column>
                <el-table-column label="商品标题" prop="productName"></el-table-column>

                <el-table-column label="商品单价" prop="productPrice"></el-table-column>
                <el-table-column label="商品数量" prop="productNum"> </el-table-column>
            </el-table>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                </div>
            </template>
        </el-dialog>

    </el-card>

</template>

<!-- <style lang="scss" scoped></style> -->








<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .demo-tabs>.el-tabs__header {
        font-size: 800px;
        /* 调整标签字体大小 */
    }

    .demo-tabs>.el-tabs__content {
        padding: 70px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }




}
</style>