'use server'
import type { Joke } from './api/data'
export async function getJoke(): Promise<Joke> {
  // TODO 做成环境变量的形式
  const res = await fetch('http://localhost:3000/jokes/api', {
    headers: {
      Accept: 'application/json'
    }
  })
  const data = await res.json()
  return data
}
