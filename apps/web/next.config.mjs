import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Tell webpack to NOT bundle these server-only native modules.
  // Without this, you get: "Cannot read properties of undefined (reading 'call')"
  serverExternalPackages: ["@prisma/client", "bcrypt-ts", "jsonwebtoken"],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
