import request from '@/utils/request.js'


//添加分类
export function categoryAddService(categoryName, categoryDescription) {
    return request.post(`/admin/category/add/${categoryName}/${categoryDescription}`);
}
//文章分类列表查询

export function categoryListService() {
    return request.get(`/admin/category/getAllCategory`);
}

export function updateCategoryService(params) {
    return request.post(`/admin/category/updateCategory`, params);
}
//删除分类

export function categoryDeleteService(categoryName) {
    return request.delete(`/admin/category/delete/${categoryName}`);
}



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

export function uploadFile(file) {
    return request.post(`/api/files/upload?file=${file}`);
}