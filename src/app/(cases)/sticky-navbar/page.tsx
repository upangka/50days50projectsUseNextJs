'use client'
import { useState } from 'react'
import { PostDemoA, PostDemoB } from './_components/post-demo'
import NavBar from './_components/nav-bar'
import BlogBanner from './_components/blog-banner'
import { useScrollEffect } from '@/hooks'

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
