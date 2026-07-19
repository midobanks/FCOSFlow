import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@fcos/auth',
    '@fcos/config',
    '@fcos/contracts',
    '@fcos/database',
    '@fcos/domain',
    '@fcos/observability',
    '@fcos/ui',
  ],
};

export default nextConfig;
