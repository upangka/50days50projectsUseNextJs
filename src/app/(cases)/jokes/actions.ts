'use server'
import type { Joke } from './api/data'
import { delay } from '@/utils'
export async function getJoke(): Promise<Joke> {
  // TODO 做成环境变量的形式
  const res = await fetch('http://localhost:3000/jokes/api', {
    headers: {
      Accept: 'application/json'
    }
  })
  await delay(1000)
  const data = await res.json()
  return data
}
