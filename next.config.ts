import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // github头像服务器
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // 电影海报服务器
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
