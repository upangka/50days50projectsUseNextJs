'use server'

import Image from 'next/image'

interface UserCardProps {
  username: string
}

interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string // 空字符串表示未设置
  url: string
  html_url: string
  followers_url: string
  following_url: string // 包含模板参数
  gists_url: string // 包含模板参数
  starred_url: string // 包含模板参数
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string // 包含模板参数
  received_events_url: string
  type: 'User' // 固定值
  site_admin: boolean
  name: string | null // 可能为 null
  company: string | null
  blog: string // 空字符串表示未设置
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string // ISO 8601 格式时间
  updated_at: string // ISO 8601 格式时间

  // 以下字段可能是 GitHub API 的额外字段
  user_view_type?: 'public' // 可选字段
}

const APIURL = 'https://api.github.com/users/'

export const UserCard: React.FC<UserCardProps> = async ({ username }) => {
  const githubUser = await (async (username: string): Promise<GitHubUser> => {
    'use server'
    try {
      const response = await fetch(APIURL + username) // 等待 fetch 完成
      const data = await response.json() // 等待 JSON 解析完成
      console.log(data) // 输出数据
      return data
    } catch (error) {
      console.error('Error fetching data:', error) // 捕获并处理错误
      throw error
    }
  })(username)

  const name = githubUser.name || githubUser.login || username

  return (
    <>
      <section className='flex w-full items-start justify-start gap-5 rounded-md bg-white p-10 px-28 text-black shadow-md shadow-white'>
        <div>
          <Image
            className='rounded-full border-4 border-gray-500'
            src={githubUser.avatar_url}
            alt={name}
            width={150}
            height={150}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>{name}</h1>
          <p className='text-gray-500'>{githubUser.bio || 'No bio'}</p>
          <ul className='flex gap-4'>
            <li>
              {githubUser.followers}
              <span className='mx-1 font-bold italic'>Followers</span>
            </li>
            <li>
              {githubUser.following}
              <span className='mx-1 font-bold italic'>Following</span>
            </li>
            <li>
              {githubUser.public_repos}
              <span className='mx-1 font-bold italic'>Repos</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
