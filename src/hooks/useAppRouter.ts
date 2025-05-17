"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function buildUrl(path: string, query: Record<string, any> = {}): string {
  const qs = new URLSearchParams(query).toString();
  return qs ? `${path}?${qs}` : path;
}

export function useAppRouter() {
  const router = useRouter();

  const routerPush = (path: string, query: Record<string, any> = {}) => {
    const fullUrl = buildUrl(path, query);
    router.push(fullUrl);
  };

  return {
    routerPush,
    routerBack: router.back,
    routerForward: router.forward,
    routerReplace: router.replace,
  };
}

export function useQueryParams<T extends Record<string, string>>(): T {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      result[key] = value;
    }
    return result;
  }, [searchParams]);

  return params as T;
}
