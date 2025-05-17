"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Message } from "@arco-design/web-react";
import { useSystemStore } from "@/store/systemStore";
// 创建新的axios实例

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 使用环境变量
  timeout: 5000, // 超时时间 单位是ms
});
console.log(process.env.NEXT_PUBLIC_API_URL);
const safeSetLoading = (val: boolean) => {
  if (typeof window !== "undefined") {
    useSystemStore.getState().setLoading(val);
  }
};
// 请求拦截器
http.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    //TODO:  设置 loading
    safeSetLoading(true);
    return config;
  },
  (error: AxiosError) => {
    //TODO:  出现请求错误，清除loading
    safeSetLoading(false);
    //TODO: 提示错误
    Message.error(error.message);
    return Promise.reject(error);
  },
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      //TODO:  响应成功，关闭loading
      safeSetLoading(false);
      if (data.code === 200) {
        //TODO:  请求结果正确
        return data;
      } else {
        Message.error(data?.message || "请求失败");
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    //TODO:  响应失败，关闭loading
    safeSetLoading(false);
    if (error.message.includes("Network Error")) {
      //TODO:  网络错误
      Message.error("网络错误，请检查网络连接");
    }

    if (response) {
      //TODO:  根据code码提示错误信息
    }

    return Promise.reject(error);
  },
);

/**
 * GET 请求封装
 */
const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http.get<T>(url, {
    params: query,
  });
};

/**
 * POST 请求封装
 */
const httpPost = <T>(url: string, data?: Record<string, any>, query?: Record<string, any>) => {
  return http.post<T>(url, data, {
    params: query,
  });
};

/**
 * 图片上传封装
 * @param url 上传接口地址
 * @param file 要上传的 File 或 File[] 对象
 * @param extraData 其他附加的表单字段
 * @param fieldName 表单字段名，默认是 'file'
 */
const httpUpload = async <T>(
  url: string,
  file: File | File[],
  extraData?: Record<string, any>,
  fieldName = "file",
) => {
  const formData = new FormData();

  // 添加文件字段
  if (Array.isArray(file)) {
    file.forEach((f) => formData.append(fieldName, f));
  } else {
    formData.append(fieldName, file);
  }

  // 添加额外字段
  if (extraData) {
    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const res = await http.post<T>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  //TODO: 处理响应 拼接图片地址

  return res;
};

export { http, httpGet, httpPost, httpUpload };
