'use client'
import { useState } from 'react'
import { clsx } from 'clsx'
import type { NavItem } from './types'
import { Icon } from '@iconify/react'
interface Props extends React.PropsWithChildren {
  /**
   * 菜单图标大小
   * @default 36
   */
  menuIconSize?: number
  navList: NavItem[]
}

const RotatingNavigationAnimation: React.FC<Props> = ({ menuIconSize = 36, navList, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const size = {
    width: menuIconSize,
    height: menuIconSize
  }

  return (
    <section className='relative overflow-hidden bg-black'>
      {/* memu start */}
      <div className='fixed top-0 left-0 z-50 -translate-1/2'>
        {/* circle menu部分start */}
        <div
          className={clsx(
            isMenuOpen ? '-rotate-90 bg-red-500' : 'bg-green-500',
            'relative h-[200px] w-[200px] rounded-full transition-all duration-500'
          )}
        >
          <button
            onClick={() => setIsMenuOpen(true)}
            className='absolute right-1/4 bottom-1/4 translate-x-1/3 translate-y-1/3 cursor-pointer'
          >
            <Icon icon='bytesize:menu' {...size} className='text-white hover:text-red-500' />
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
          'relative z-10 w-screen overflow-auto bg-white transition-all duration-500'
        )}
      >
        {children}
      </main>
      {/* content end */}

      {/* footer description start */}
      <footer className='absolute right-1/12 bottom-1/12 flex flex-col gap-2'>
        <p
          style={{
            transform: isMenuOpen ? `translateY(0)` : 'translateY(200%)',
            transition: 'transform 0.5s ease-in-out',
            transitionDelay: isMenuOpen ? `${1 * 0.1}s` : '0s'
          }}
          className='text-left text-xl'
        >
          I Love <span className='text-green-500'>React</span> And{' '}
          <span className='text-green-500'>Next.js</span>
        </p>
        <p
          style={{
            transform: isMenuOpen ? `translateY(0)` : 'translateY(200%)',
            transition: 'transform 0.5s ease-in-out',
            transitionDelay: isMenuOpen ? `${2 * 0.1}s` : '0s'
          }}
          className='text-left text-xl'
        >
          Happy Coding <span className='text-2xl text-yellow-500'>:)</span>🥳 from{' '}
          <a href='https://gitee.com/pkmer/50days50projects-use-next-js' className='text-green-500'>
            Pkmer
          </a>
        </p>
      </footer>
      {/* footer description end */}
    </section>
  )
}

RotatingNavigationAnimation.displayName = 'RotatingNavigationAnimation'

export default RotatingNavigationAnimation
