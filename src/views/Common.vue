<script lang="ts" setup>
import { ref } from 'vue'
import { commonListService } from '@/api/common.js'
import { ElMessage, ElMessageBox } from 'element-plus';
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


//文章列表数据模型
const articles = ref([
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "0",
        "catogoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    },

])
const articleList = async () => {

    let result = await commonListService();
    articles.value = result.data;

    console.log(articles.value)

}
articleList();
const dialogVisible = ref(false)
const articleModel = ref(
    {
        "id": 5,
        "title": "陕西旅游攻略",
        "content": "兵马俑,华清池,法门寺,华山...爱去哪去哪...",
        "coverImg": "https://big-event-gwd.oss-cn-beijing.aliyuncs.com/9bf1cf5b-1420-4c1b-91ad-e0f4631cbed4.png",
        "state": "0",
        "catogoryId": 2,
        "createTime": "2023-09-03 11:55:30",
        "updateTime": "2023-09-03 11:55:30"
    }
)

const showArticle = (article) => {
    console.log(article.title)
    articleModel.value = article;
    console.log(articleModel.value.content);
    dialogVisible.value = true;

}

</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    @select="handleSelect" router>

                    <el-text class="mx-1" size="large">任务下发通知</el-text>

                    <div class="flex-grow" />
                    <el-menu-item index="/backend">管理</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <el-card v-for="item in articles" :key="item" @click="showArticle(item)">
                    <template #header>{{ item.title }}</template>
                </el-card>
                <!-- </div>
                </el-scrollbar> -->
            </el-main>
        </el-container>
    </div>
    <!-- 添加分类弹窗 -->
    <el-dialog v-model="dialogVisible" width="30%">
        <el-form :model="articleModel" label-width="100px" style="padding-right: 30px">
            <el-text class="mx-3">{{ articleModel.title }}</el-text>
            <br>
            <div v-html="articleModel.content"></div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">退出</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
.flex-grow {
    flex-grow: 1;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>