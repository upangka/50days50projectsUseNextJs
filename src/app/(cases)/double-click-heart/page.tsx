'use client'
import { useState, useRef, useCallback } from 'react'
import { getRandomInt } from '@/utils'
import HeartStyle from './double-click-heart.module.scss'
import clsx from 'clsx'
import type { Heart } from './types'
import CountDisplay from './_components/count-display'
import IconShow from './_components/icon-show'
const DOUBLE_CLICK_TIME = 500 // ms

const icons = ['🔥', '❤️', '😽', '😘', '🥳']

export default function DoubleClickHeartPage() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [count, setCount] = useState(0)
  const clickTime = useRef(0)

  const lastHeartPosition =
    hearts.length > 0
      ? { x: hearts[hearts.length - 1].originX, y: hearts[hearts.length - 1].y }
      : { x: -100, y: -100 }

  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const currentTime = Date.now()
    if (!clickTime.current) {
      // 第一次点击记录事件
      clickTime.current = Date.now()
    } else if (currentTime - clickTime.current < DOUBLE_CLICK_TIME) {
      // 在DOUBLE_CLICK_TIME内再次点击才算双击
      clickTime.current = 0

      // 计算坐标
      const x = e.clientX - e.currentTarget.offsetLeft
      // 随机偏移
      const randomX = Math.random() > 0.5 ? getRandomInt(15) + x : x - getRandomInt(15)
      const y = e.clientY - e.currentTarget.offsetTop

      setCount(prev => prev + 1)
      setHearts(prev => [
        ...prev,
        { id: currentTime, originX: x, x: randomX, y, icon: icons[getRandomInt(icons.length)] }
      ])

      setTimeout(() => {
        // 直接闭包的方式记录要删除的值
        setHearts(prev => {
          const arr = prev.filter(heart => heart.id !== currentTime)
          // 当没有爱心时，重置计数
          if (arr.length === 0) {
            setCount(0)
          }
          return arr
        })
      }, 1000)
    } else {
      // 超过DOUBLE_CLICK_TIME时间，则重置
      clickTime.current = currentTime
      setCount(0)
    }
  }, [])

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
