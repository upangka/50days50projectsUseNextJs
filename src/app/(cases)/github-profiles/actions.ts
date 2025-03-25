'use server'
import { delay } from '@/utils'

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

export const getGithubUser = async (username: string): Promise<GitHubUser> => {
  try {
    await delay(1000) // 模拟延迟
    const response = await fetch(APIURL + username)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const getRepos = async (username: string): Promise<GitHubRepos[]> => {
  const response = await fetch(APIURL + username + '/repos?sort=created')
  const data = await response.json()
  if (data && data.length > 0) {
    return data.slice(0, 5)
  } else {
    return []
  }
}
