'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import type { User } from './types'
import { debounce } from '@/utils'
import clsx from 'clsx'
const API = 'https://randomuser.me/api?results=50'
/**
 * 这个API是国外站点，这里为了方便不使用服务端组件渲染
 * @returns
 */
export default function LiveUserFilterPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.trim()
      if (term.length > 0) {
        setSearch(term)
      } else {
        setSearch('')
      }
    }),
    []
  )

  // 缓存过滤后的用户列表
  const filteredUsers = useMemo(() => {
    if (!search) return users // 如果没有搜索词，直接返回所有用户

    return users.filter(user =>
      [user.name.first, user.name.last, user.location.city, user.location.country].some(field =>
        field.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [users, search])

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
      <div className='w-[300px] overflow-hidden rounded-xl shadow-lg shadow-green-600/50 select-none'>
        <header className='bg-green-600 p-5 text-white'>
          <h1 className='text-xl font-bold'>实时用户过滤器</h1>
          <small className='text-sm italic'>按名称和/或位置搜索</small>
          <input
            onInput={handleSearch}
            type='text'
            placeholder='搜索用户'
            className='mt-2 w-full rounded-lg bg-green-800 px-3 py-2 text-white focus:outline-none'
          />
        </header>
        <ul className='h-[400px] overflow-y-auto bg-white py-3.5 text-black'>
          {filteredUsers.map(user => {
            return (
              <li
                key={user.login.uuid}
                className={clsx(
                  'transition-duration-300 flex items-center gap-4 border-b border-gray-400 p-2 transition-all last:border-b-0 hover:bg-gray-100'
                )}
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
