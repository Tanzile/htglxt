import axios from "axios"
export default function (config) {
    const instance = axios.create({
        baseURL: "/api",
    });
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if (config.url === "/login") {
            return config;
        } else {
            let token = window.sessionStorage.getItem("token");
            config.headers.Authorization = token;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        if (response.data.meta.status == 400) {
            router.replace("/");
        }
        return response.data;
        //根据data的情况。如果有提示token失效。过期，让用户重新登录

    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    return instance(config);
}