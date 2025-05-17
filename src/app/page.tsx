// SSR  SEO 页面

import { mergeMetadata } from "@/lib/seo";
import Index from "./client";
// SSR 就这样导入 client 组件 配合fetch no-store
// const ClientComponent = dynamicImport(() => import("./client"), { ssr: false });

// SEO 封装
export const generateMetadata = async () => {
  return mergeMetadata({
    title: "Home Page",
    description: "This is the home page",
    keywords: "home, page, nextjs",
  });
};

export default async function Page() {
  // SSR
  // const res = await fetch('https://api.example.com/data', {
  //   cache: 'no-store' // 相当于 getServerSideProps
  // });
  const res = [
    { filename: "测试1", id: 1 },
    { filename: "测试2", id: 2 },
    { filename: "测试3", id: 3 },
  ];
  return <Index InitData={res}></Index>;
}
