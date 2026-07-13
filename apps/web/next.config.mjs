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
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    // Next.js 14: tell webpack NOT to bundle these native Node.js packages.
    // Prevents "Cannot read properties of undefined (reading 'call')" errors.
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt-ts", "jsonwebtoken"],
  },
};

export default nextConfig;
