'use client'
import { useState, useMemo, useCallback } from 'react'
import type { User } from './types'
import { debounce } from '@/utils'
import LiUser from './_components/user'
import Header from './_components/header'
import { useData } from './use-data'
const API = 'https://randomuser.me/api?results=50'
/**
 * 这个API是国外站点，这里为了方便不使用服务端组件渲染
 * @returns
 */
export default function LiveUserFilterPage() {
  const [search, setSearch] = useState('')
  const { data: users, loading } = useData<User[]>(API, [])

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.trim()
      setSearch(term)
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

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='w-[300px] overflow-hidden rounded-xl shadow-lg shadow-green-600/50 select-none'>
        {/* header start */}
        <Header handleSearch={handleSearch} />
        {/* header end */}
        {/* 用户列表start */}
        <ul className='h-[400px] overflow-y-auto bg-white py-3.5 text-black'>
          {filteredUsers.map(user => (
            <LiUser key={user.login.uuid} user={user} />
          ))}
        </ul>
        {/* 用户列表end */}
      </div>
    </section>
  )
}
