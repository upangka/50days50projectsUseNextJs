'use client'
import HeartStyle from './double-click-heart.module.scss'
import clsx from 'clsx'
import CountDisplay from './_components/count-display'
import IconShow from './_components/icon-show'
import useHeartClick from './use-heart-click'

export default function DoubleClickHeartPage() {
  const { hearts, count, handleDoubleClick } = useHeartClick()

  const lastHeartPosition =
    hearts.length > 0
      ? { x: hearts[hearts.length - 1].originX, y: hearts[hearts.length - 1].y }
      : { x: -100, y: -100 }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div
        onClick={handleDoubleClick}
        className='relative h-[530px] w-[300px] overflow-hidden rounded-lg border-2 border-white shadow-lg shadow-gray-500/50'
      >
        <div className='absolute top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-50'></div>
        <img
          src='/landscape.jpg'
          alt='girls'
          className={clsx(HeartStyle.Image, 'h-full w-full object-cover')}
        />
        {/* 大于5的时候显示 */}
        {count > 5 && <CountDisplay key={count} count={count} position={lastHeartPosition} />}
        {hearts.map(heart => (
          <IconShow heart={heart} key={heart.id} />
        ))}
      </div>
    </section>
  )
}
