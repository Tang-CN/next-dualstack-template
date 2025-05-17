// store/index.ts
import { create } from "zustand";
import { persist, PersistOptions, devtools, createJSONStorage } from "zustand/middleware";

// 判断是否是浏览器
const isClient = typeof window !== "undefined";
// 判断是否是开发环境
const isDev = process.env.NODE_ENV === "development";
export const createPersistStore = <T, K extends object = Partial<T>>(
  initializer: (set: any, get: any) => T,
  options: PersistOptions<T, K>,
) => {
  const store = persist(initializer, {
    ...options,
    storage: isClient ? createJSONStorage(() => localStorage) : undefined,
  });
  return create(isDev ? (devtools(store, { name: options.name }) as typeof store) : store);
};
