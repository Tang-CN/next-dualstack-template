import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "默认标题 - 我的站点",
  description: "这是默认描述",
  keywords: ["默认", "关键词"],
  openGraph: {
    title: "默认 OG 标题",
    description: "默认 OG 描述",
    images: ["/default-og.jpg"],
  },
};

export const mergeMetadata = (overrides: Partial<Metadata>): Metadata => ({
  ...defaultMetadata,
  ...overrides,
  openGraph: {
    ...defaultMetadata.openGraph,
    ...overrides.openGraph,
  },
});
