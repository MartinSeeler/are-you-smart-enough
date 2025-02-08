import type { NextConfig } from "next";
const { withPlausibleProxy } = require("next-plausible");

const nextConfig: NextConfig = withPlausibleProxy({
  /* config options here */
});

export default nextConfig;
