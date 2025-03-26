'use client'

import { useEffect, useState } from 'react'
import type { User } from './types'
const API = 'https://randomuser.me/api?results=50'
/**
 * 这个API是国外站点，这里为了方便不使用服务端组件渲染
 * @returns
 */
export default function LiveUserFilterPage() {
  const [users, setUsers] = useState<User[]>([])

  async function getUsers() {
    const res = await fetch(API)
    const data = await res.json()
    return data.results
  }

  useEffect(() => {
    ;(async () => {
      const users = await getUsers()
      setUsers(users)
    })()
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='w-[300px] overflow-hidden rounded-xl shadow-md shadow-white select-none'>
        <header className='bg-green-600 p-5 text-white'>
          <h1 className='text-xl font-bold'>实时用户过滤器</h1>
          <small className='text-sm italic'>按名称和/或位置搜索</small>
          <input
            type='text'
            placeholder='搜索用户'
            className='mt-2 w-full rounded-md bg-green-800 px-3 py-2 text-white focus:outline-none'
          />
        </header>
        <ul className='h-[400px] overflow-y-auto bg-white py-3.5 text-black'>
          {users.map(user => {
            return (
              <li
                key={user.name.first + user.name.last}
                className='transition-duration-300 flex items-center gap-4 border-b border-gray-400 p-2 transition-all last:border-b-0 hover:bg-gray-100'
              >
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  className='h-[50px] w-[50px] rounded-full object-cover'
                />
                <div className='flex flex-col items-center justify-center gap-1'>
                  <h1 className='text-md w-full font-bold'>
                    {user.name.first} {user.name.last}
                  </h1>
                  <p className='w-full text-sm text-gray-600'>
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
