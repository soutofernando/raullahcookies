import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = "/raullahcookies";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "0.0.0.0", "192.168.0.5"],
  ...(isGithubPages
    ? {
        output: "export",
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
        env: {
          NEXT_PUBLIC_BASE_PATH: githubPagesBasePath,
        },
        images: {
          unoptimized: true,
          formats: ["image/webp"],
        },
      }
    : {
        images: {
          formats: ["image/webp"],
        },
      }),
};

export default nextConfig;
