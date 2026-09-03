import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.md": {
        loaders: [
          { loader: join(process.cwd(), "node_modules/raw-loader/dist/cjs.js") },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
