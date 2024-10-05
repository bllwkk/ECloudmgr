//导入request.js请求工具
import request from '@/utils/request.js'


export function adminLoginService(adminName, adminPassword) {
    return request.post(`/admin/admin/login?adminName=${adminName}&adminPassword=${adminPassword}`);
}
//提供查看用户资料的函数
// export const userInfoService = () => {
//     return request.get('/user/userInfo')
// }
export function userInfoService() {
    return request.get(`/admin/usermgr/listAllUsers`);
}
export function enableUserService(userName) {
    return request.put(`/admin/usermgr/enable/${userName}`);
}
export function disableUserService(userName) {
    return request.put(`/admin/usermgr/disable/${userName}`);
}