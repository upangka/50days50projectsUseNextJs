'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { PostDemoA, PostDemoB } from './_components/post-demo'
import { useScrollEffect } from '@/hooks'
import StickNavStyle from './stick-navbar.module.scss'

export default function StickyNavbarPage() {
  const [isSticky, setIsSticky] = useState(false)

  function fixNav(e: Event) {
    // 注意：window.scrollY 是更可靠的滚动位置获取方式
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsSticky(scrollTop > 178)
  }

  useScrollEffect(fixNav)

  return (
    <section className='relative w-screen'>
      {/* nav start */}
      <NavBar isSticky={isSticky} />
      {/* nav end */}

      {/* banner start */}
      <BlogBanner />
      {/* banner end */}

      {/* content start */}
      <main className='bg-white pb-32 text-black select-none'>
        <PostDemoA />
        <PostDemoB />
      </main>
      {/* content end */}
    </section>
  )
}

/**
 * 导航栏
 */
const NavBar: React.FC<{ isSticky: boolean }> = ({ isSticky }) => {
  return (
    <nav
      style={{
        transition: StickNavStyle.transition
      }}
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 flex items-center justify-around',
        isSticky ? 'bg-white py-3' : 'bg-black py-6'
      )}
    >
      <h1 className='flex items-center gap-1'>
        <span className='text-md text-green-500'>L</span>
        <span
          style={{
            transition: StickNavStyle.transition
          }}
          className={clsx('text-xl font-bold', isSticky && 'text-black')}
        >
          棧深
        </span>
        <span className='text-md text-green-500'>⅂</span>{' '}
      </h1>
      <ul className='flex items-center justify-center gap-4'>
        <li
          className={clsx(
            'cursor-pointerhover:underline',
            isSticky ? 'text-red-700' : 'text-red-400'
          )}
        >
          首页
        </li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>项目</li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>关于</li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>联系</li>
      </ul>
    </nav>
  )
}

/**
 * Banner
 */
const BlogBanner: React.FC = () => {
  return (
    <section
      className='relative flex h-screen w-full items-center justify-center'
      style={{
        backgroundImage: "url('/pexels-photo-450035.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 遮罩层开始 */}
      <div className='absolute top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-50'></div>
      <div className='z-40'>
        <h1 className='text-5xl font-bold text-white'>欢迎来到我的博客网站</h1>
        <p className='py-5 text-center text-gray-100 italic'>
          打铁没样，边打边像 | Happy Coding :)
        </p>
      </div>
    </section>
  )
}
