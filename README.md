# 这是[Next.js](https://nextjs.org)的前台展示+后台管理项目[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

前台 SSR + SEO + 后台 CSR
主要是为了熟悉 Next.js14 react18 AppRouter模式的使用，以及前台SSR SEO+后台管理系统的混合开发，搭建的简易框架，提供参考！！

## 启动项目

包管理器推荐使用 pnpm
进入项目目录，然后运行以下命令：

```bash
pnpm install
```

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 使用浏览器查看结果

## 项目结构

```
src
├── app
|   ├──(admin) # 后台管理
|   |   ├──page.tsx # 后台首页
|   |   ├──layout.tsx # 后台布局
|   ├──clicent # 客户端
|   ├──page.tsx # 前台页面
|   ├──layout.tsx 前台布局#
├── components # 公共组件
├── styles # 全局样式
├── utils # 工具函数
├── types # 类型定义
├── store # 状态管理
├── lib # 公共库
└── public # 静态资源
    ├── favicon.ico
    └── logo.svg
```

## 常用封装

1. 请求库 axios `src/utils/http.ts`

```
const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http.get<T>(url, {
    params: query,
  });
};

const httpPost = <T>(url: string, data?: Record<string, any>, query?: Record<string, any>) => {
  return http.post<T>(url, data, {
    params: query,
  });
};

// 页面使用直接导入
import { http,httpGet,httpPost,httpUpload } from "@/utils/http"

// httpGet 获取数据
const res = await httpGet<any>("/api");

// httpPost 提交数据
const res = await httpPost<any>("/api", { name: "admin" });

// httpUpload 上传文件
 const res = await httpUpload("/api/upload", file, {}, "image");
```

2. 状态管理库 zustand `src/store`

- 直接使用

```
// 定义
export const useUserStore = createPersistStore<UserState>(
  (set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),
    clearUser: () => set({ user: null }),
  }),
  {
    name: "user",
    partialize: (state) => ({ user: state.user, token: state.token }),
  },
);

// 使用
const setUser = useUserStore((state) => state.setUser);
const user = useUserStore((state) => state.user);
const token = useUserStore((state) => state.token);
```

- hooks轻量封装

```
import { useUserStore } from "@/store/userStore";

export const useUserActions = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  return {
    user,
    token,
    setUser,
  };
};

// 使用
import { useUserActions } from "@/hooks/useUserActions";
const { user, setUser } = useUserActions();
```

3. 路由 `src/hooks/useAppRouter.ts`

- 路由跳转

```
import { useAppRouter } from "@/hooks/useAppRouter";
const { routerPush } = useAppRouter();
routerPush("/about", { id: 1 });
```

- 获取路由参数

```
import { useQueryParams } from "@/hooks/useAppRouter";
const { id } = useQueryParams<{ id: string }>();
```

4. SEO优化 `src/lib/seo.ts`

```
// layout.tsx 全局默认seo
// 可以判断一下需要 seo 的页面，然后进行 seo 优化,比如说 后台管理页面就不需要 seo 优化
import { defaultMetadata } from "@/lib/seo";
export const metadata: Metadata = defaultMetadata;

// page.tsx 单页seo
import { mergeMetadata } from "@/lib/seo";
export const generateMetadata = async () => {
  return mergeMetadata({
    title: "Home Page",
    description: "This is the home page",
    keywords: "home, page, nextjs",
  });
};
```

5. SSR优化

```
import Index from "./client"; // 导入客户端组件
// server 只获取数据，传递给 client
export default async function Page() {
  const res = await fetch('https://api.example.com/data', {
   cache: 'no-store' // 相当于 getServerSideProps
  });
  return <Index InitData={res}></Index>;
}

// client组件
"use client";
export default function Index({ InitData }) {
  return <div>{InitData}</div>;
}
```

## 技术栈

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [zustand](https://zustand-cn.js.org/)
- [pnpm](https://pnpm.io/)

## 学习更多

你可以在 [Next.js 文档](https://nextjs.org/docs) 中找到更多关于 Next.js 的信息。

要了解更多关于 React 的信息，请访问 [React 文档](https://reactjs.org/)。
