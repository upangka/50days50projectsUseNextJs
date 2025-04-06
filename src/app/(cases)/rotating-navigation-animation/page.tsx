'use client'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'
export default function RotatingNavigationAnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const size = {
    width: 36,
    height: 36
  }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='fixed top-0 left-0 -translate-1/2'>
        {/* circle menu部分start */}
        <div
          className={clsx(
            isMenuOpen && '-rotate-90',
            'relative h-[200px] w-[200px] rounded-full bg-red-500 transition-all duration-500'
          )}
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            className='absolute right-1/4 bottom-1/4 translate-x-1/3 translate-y-1/3 cursor-pointer'
          >
            <Icon icon='bytesize:menu' {...size} className='text-white hover:text-green-500' />
          </button>

          <button
            onClick={() => setIsMenuOpen(false)}
            className='absolute bottom-1/4 left-1/4 -translate-x-1/3 translate-y-1/3 cursor-pointer'
          >
            <Icon
              icon='flowbite:close-outline'
              {...size}
              className='text-white hover:text-green-500'
            />
          </button>
        </div>
        {/* circle menu部分end */}
      </div>
    </section>
  )
}
