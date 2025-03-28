'use client'
import { useState, useRef, useCallback } from 'react'
import { getRandomInt } from '@/utils'
import HeartStyle from './double-click-heart.module.scss'
import { clsx } from 'clsx'
const DOUBLE_CLICK_TIME = 300 // ms

interface Heart {
  id: number
  x: number
  y: number
  icon: string
}

const icons = ['🔥', '❤️', '😽', '😘', '🥳']

export default function DoubleClickHeartPage() {
  const [hearts, setHearts] = useState<Heart[]>([])

  const clickTime = useRef(0)

  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const currentTime = Date.now()
    if (!clickTime.current) {
      // 第一次点击记录事件
      clickTime.current = Date.now()
    } else if (currentTime - clickTime.current < DOUBLE_CLICK_TIME) {
      // 在DOUBLE_CLICK_TIME内再次点击才算双击
      clickTime.current = 0

      // 计算坐标
      let x = e.clientX - e.currentTarget.offsetLeft
      // 随机偏移
      x = Math.random() > 0.5 ? getRandomInt(15) + x : x - getRandomInt(15)
      const y = e.clientY - e.currentTarget.offsetTop

      console.log({ x: x, originX: e.clientX - e.currentTarget.offsetLeft })
      setHearts(prev => [
        ...prev,
        { id: currentTime, x, y, icon: icons[getRandomInt(icons.length)] }
      ])
      setTimeout(() => {
        // 直接闭包的方式记录要删除的值
        setHearts(prev => prev.filter(heart => heart.id !== currentTime))
      }, 1000)
    } else {
      // 超过DOUBLE_CLICK_TIME时间，则重置
      clickTime.current = currentTime
    }
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div
        onClick={handleDoubleClick}
        className='relative h-[530px] w-[300px] border-2 border-white'
      >
        {hearts.map(heart => (
          <div
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`
            }}
            key={heart.id}
            className={clsx(
              HeartStyle.Love,
              'absolute -translate-x-1/2 -translate-y-full text-3xl text-white select-none'
            )}
          >
            {' '}
            {heart.icon}{' '}
          </div>
        ))}
      </div>
    </section>
  )
}
