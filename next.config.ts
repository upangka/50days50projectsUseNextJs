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
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me', // 随机用户头像服务器
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // 随机用户头像服务器
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'music-file.y.qq.com', // QQ音乐服务器
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'y.qq.com', // QQ音乐服务器
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
