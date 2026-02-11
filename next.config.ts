import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export const withPWAConfig = withPWA({
  dest: "public",
})(nextConfig);

export default nextConfig;
