'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { PostDemoA, PostDemoB } from './_components/post-demo'

export default function StickyNavbarPage() {
  const [isSticky, setIsSticky] = useState(false)
  return (
    <section className='relative w-screen'>
      {/* nav start */}
      <nav
        className={clsx(
          'fixed top-0 right-0 left-0 z-50 flex items-center justify-around',
          isSticky ? 'py-3' : 'bg-black py-5'
        )}
      >
        <h1 className='flex items-center gap-1'>
          <span className='text-md text-green-500'>L</span>
          <span className='text-xl font-bold'>棧深</span>
          <span className='text-md text-green-500'>⅂</span>{' '}
        </h1>
        <ul className='flex items-center justify-center gap-4'>
          <li className='cursor-pointer text-red-400 hover:underline'>首页</li>
          <li className='cursor-pointer hover:underline'>项目</li>
          <li className='cursor-pointer hover:underline'>关于</li>
          <li className='cursor-pointer hover:underline'>联系</li>
        </ul>
      </nav>
      {/* nav end */}

      {/* banner start */}
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
