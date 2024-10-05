import request from '@/utils/request.js'
export const commonListService = () => {
    return request.get('common/list')
}
export const commonCategoryListService = () => {
    return request.get('/common/categoryList')
}