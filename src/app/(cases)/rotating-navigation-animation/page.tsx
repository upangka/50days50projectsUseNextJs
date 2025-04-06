'use client'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'
import Styles from './rotating-navigation-animation.module.scss'
const navList = [
  {
    icon: 'ic:outline-home',
    text: '首页'
  },
  {
    icon: 'charm:person',
    text: '关于'
  },
  {
    icon: 'ic:outline-email',
    text: '联系'
  }
]

export default function RotatingNavigationAnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const size = {
    width: 36,
    height: 36
  }

  return (
    <section className='overflow-hidden bg-black'>
      {/* memu start */}
      <div className='fixed top-0 left-0 z-50 -translate-1/2'>
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
      {/* memu end */}

      {/* 菜单start */}
      <nav className='fixed bottom-0 left-2 -translate-y-3/4'>
        <ul className='flex flex-col items-center gap-4'>
          {navList.map((item, index) => (
            <li
              style={{
                transform: isMenuOpen
                  ? `translateX(${(index / 2) * (1 / 2) * 100}%)`
                  : 'translateX(-200%)',
                transition: 'transform 0.5s ease-in-out',
                transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s'
              }}
              key={index}
              className='flex items-center gap-1 border-b-2 border-gray-50 pb-2 hover:border-green-500 hover:text-green-500'
            >
              <Icon
                style={{
                  display: 'inline-block',
                  color: 'inherit'
                }}
                icon={item.icon}
                width={25}
                height={25}
              />
              {item.text}
            </li>
          ))}
        </ul>
      </nav>
      {/* 菜单end */}

      {/* content start */}
      <main
        style={{
          transformOrigin: 'top left'
        }}
        className={clsx(
          isMenuOpen &&
            '-rotate-12 rounded-lg border-4 border-green-500/50 shadow-lg shadow-green-500/50',
          'relative z-10 h-screen w-screen bg-white transition-all duration-500'
        )}
      ></main>
      {/* content end */}
    </section>
  )
}
