/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  distDir: '.next',
  images: {
    domains: ['localhost', 'savage-rate-backend.onrender.com'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || (
      process.env.NODE_ENV === 'production'
        ? 'https://savage-rate-backend.onrender.com'
        : 'http://localhost:8000'
    )
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    };
    return config;
  }
}

module.exports = nextConfig 