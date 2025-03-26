'use client'
import { useState, useRef } from 'react'
import { PostDemoA, PostDemoB } from './_components/post-demo'
import NavBar from './_components/nav-bar'
import BlogBanner from './_components/blog-banner'
import { useScrollEffect } from '@/hooks'

export default function StickyNavbarPage() {
  const [isSticky, setIsSticky] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  function fixNav(e: Event) {
    if (!navRef.current) return
    // 注意：window.scrollY 是更可靠的滚动位置获取方式
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsSticky(scrollTop > navRef.current.offsetHeight + 100)
  }

  useScrollEffect(fixNav)

  return (
    <section className='relative w-screen'>
      {/* nav start  react19支持直接传递ref属性 */}
      <NavBar isSticky={isSticky} ref={navRef} />
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
