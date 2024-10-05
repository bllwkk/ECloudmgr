import request from '@/utils/request.js'


//添加分类
// export const articleCategoryAddService = (categoryData) => {
//     return request.post('/category/add', categoryData)
// }
export function categoryAddService(categoryName, categoryDescription) {
    return request.post(`/admin/category/add/${categoryName}/${categoryDescription}`);
}
//文章分类列表查询
// export const categoryListService = () => {
//     return request.get('/category/list')
// }
export function categoryListService() {
    return request.get(`/admin/category/getAllCategory`);
}
// export const categoryRenameService = (categoryData) => {
//     return request.put('/category/rename', categoryData)
// }
export function updateCategoryService(params) {
    return request.post(`/admin/category/updateCategory`, params);
}
//删除分类
// export const categoryDeleteService = (categoryData) => {
//     return request.put('/category/delete', categoryData)
// }
export function categoryDeleteService(categoryName) {
    return request.delete(`/admin/category/delete/${categoryName}`);
}

// export const articleListService = (params) => {
//         return request.get('/article/list', { params: params })
// }

export function productListService(params) {
    return request.post(`/admin/productmgr/searchProducts`, params);
}
export function searchProductsTotalService(params) {
    return request.post(`/admin/productmgr/searchProductsTotal`, params);
}
//商品添加
export function productAddService(params) {
    return request.post(`/admin/productmgr/add`, params);
}
//商品更新
export function productUpdateService(params) {
    return request.post(`/admin/productmgr/update`, params);
}
//删除商品
export function deleteProductService(productId) {
    return request.delete(`/admin/productmgr/delete/${productId}`);
}


export function getPictureService(fileName) {
    return request.get(`/api/files/getFile{fileName}`);
}