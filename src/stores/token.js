//定义store
import { defineStore } from "pinia";
import { ref } from "vue";
/*
两个参数
第一个参数：名字，保证唯一性
第二个参数：函数，可以定义状态的所有内容
 */
export const useTokenStore = defineStore('token', () => {
    //定义状态内容
    //1.响应式变量
    const token = ref('')
        //2.定义函数修改token的值
    const setToken = (newToken) => {
            console.log(newToken)
            token.value = newToken
        }
        //3.移除token
    const removeToken = () => {
        token.value = ''
    }
    return {
        token,
        setToken,
        removeToken
    }

}, {
    persist: true

});