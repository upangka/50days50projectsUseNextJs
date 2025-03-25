'use server'

import Image from 'next/image'

interface UserCardProps {
  username: string
}

interface GitHubUser {
  login: string
  avatar_url: string
  url: string
  name: string | null // 可能为 null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepos {
  id: number
  name: string
  html_url: string
}

const APIURL = 'https://api.github.com/users/'

export const UserCard: React.FC<UserCardProps> = async ({ username }) => {
  const githubUser = await (async (username: string): Promise<GitHubUser> => {
    'use server'
    try {
      const response = await fetch(APIURL + username) // 等待 fetch 完成
      const data = await response.json() // 等待 JSON 解析完成
      // console.log(data) // 输出数据
      return data
    } catch (error) {
      console.error('Error fetching data:', error) // 捕获并处理错误
      throw error
    }
  })(username)

  const repos = await (async (username: string): Promise<GitHubRepos[]> => {
    const response = await fetch(APIURL + username + '/repos?sort=created')
    const data = await response.json()
    if (data && data.length > 0) {
      return data.slice(0, 5)
    } else {
      return []
    }
  })(username)

  const name = githubUser.name || githubUser.login || username

  return (
    <>
      <section className='flex w-full items-center justify-start gap-5 rounded-md bg-blue-800 p-10 px-20 text-white shadow-md shadow-blue-500'>
        <div>
          <Image
            className='rounded-full border-4 border-gray-500'
            src={githubUser.avatar_url}
            alt={name}
            width={350}
            height={350}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>{name}</h1>
          <p className='text-white italic'>{githubUser.bio || 'No bio'}</p>
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
          <ul className='flex flex-wrap gap-2'>
            {repos.map(repo => (
              <li key={repo.id}>
                <a className='rounded-md bg-gray-200 px-2 py-1 text-gray-700' href={repo.html_url}>
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
