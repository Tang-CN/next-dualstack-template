// next.config.mjs
import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // experimental: {
  //   instrumentationHook: true,
  // },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
  webpack(config, options) {
    // 1. 排除默认 .svg 处理
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 2. 增加 @svgr/webpack 处理
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
