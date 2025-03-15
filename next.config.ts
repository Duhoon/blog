import path from "path";
import createMDX from "@next/mdx";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/blog-9afa3.appspot.com/o/**",
      },
    ],
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
