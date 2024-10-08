//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token';
import router from '@/router';
//定义一个变量,记录公共的前缀  ,  baseURL
// const baseURL = 'http://localhost:8081';
const baseURL = '/api';
const instance = axios.create({ baseURL })
    //添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        //请求前的回调
        //添加token
        let tokenStore = useTokenStore();
        //判断有没有token
        if (tokenStore.token) {
            config.headers.token = tokenStore.token
            console.log("在拦截器添加token了噢")
        }
        return config;
    },
    (err) => {
        //请求错误的回调
        Promise.reject(err)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 0)
            return result.data;
        else {
            // alert(result.data.msg ? result.data.msg : '服务异常')
            ElMessage.error(result.data.message ? result.data.message : '服务异常')
            return Promise.reject(result.data.message)

        }
    },
    err => {
        //判断响应状态码如果为401则跳转到登录页面
        if (err.response.status === 401) {
            ElMessage.error('请先登录')
            router.push('/login')
        } else {
            ElMessage.error('服务异常')
        }

        return Promise.reject(err); //异步的状态转化成失败的状态
    }
)

export default instance;