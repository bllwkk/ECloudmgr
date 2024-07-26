import request from '@/utils/request.js'


//添加分类
export const articleCategoryAddService = (categoryData) => {
        return request.post('/category/add', categoryData)
    }
    //文章分类列表查询
export const articleCategoryListService = () => {
    return request.get('/category/list')
}
export const articleCategoryRenameService = (categoryData) => {
    return request.put('/category/rename', categoryData)
}
export const articleCategoryDeleteService = (categoryData) => {
    return request.put('/category/delete', categoryData)
}
export const articleListService = (params) => {
        return request.get('/article/list', { params: params })
    }
    //文章添加
export const articleAddService = (articleData) => {
    return request.post('/article/add', articleData);
}