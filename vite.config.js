import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                //获取路径中包含/api的请求
                target: 'http://localhost:8081', //后台服务路径
                changeOrigin: true, //修改源
                rewrite: (path) => path.replace(/^\/api/, '') //把/api替换为空
            }
        }
    }
})