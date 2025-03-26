'use client'
import { useState } from 'react'
import clsx from 'clsx'
export default function Footer() {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <footer
      style={{
        transition: 'all 0.3s ease-in-out'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={clsx(
        'fixed bottom-0 z-50 flex w-screen justify-center rounded-t-full border-t-2 border-gray-100 bg-black italic shadow-2xl shadow-amber-50 select-none',
        isHovering ? 'translate-y-0' : 'translate-y-[30%]'
      )}
    >
      <div className='py-3'>
        <a
          href='https://gitee.com/pkmer/50days50projects-use-next-js'
          className='font-bold text-green-600'
        >
          Pkmer
        </a>{' '}
        is built with{' '}
        <a href='https://nextjs.org/' className='font-bold text-green-600'>
          Next.js
        </a>
        , inspired by {''}
        <a className='text-green-600' href='https://github.com/bradtraversy/50projects50days'>
          50 Projects 50 Days
        </a>
      </div>
    </footer>
  )
}
