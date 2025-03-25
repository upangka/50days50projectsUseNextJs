'use client'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { mapRange } from '@/utils'
import { Clock } from './_components/clock'

export default function ThemeClockPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [secondDegree, setSecondDegree] = useState(mapRange(currentDate.getSeconds(), 0, 60))
  const [minuteDegree, setMinuteDegree] = useState(mapRange(currentDate.getMinutes(), 0, 60))
  const [hourDegree, setHourDegree] = useState(mapRange(currentDate.getHours() % 12 || 0, 0, 12))
  const scale = useCallback(mapRange, [])

  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const seconds = date.getSeconds()
      const minute = date.getMinutes() + seconds / 60
      const hour = (date.getHours() % 12 || 0) + minute / 60
      setSecondDegree(_ => scale(seconds, 0, 60))
      setMinuteDegree(_ => scale(minute, 0, 60))
      setHourDegree(_ => scale(hour, 0, 12))
      setCurrentDate(_ => date)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // todo 基于长度计算
  return (
    <section className='flex h-screen w-screen flex-col items-center justify-start pt-3.5'>
      <Clock secondDegree={secondDegree} minuteDegree={minuteDegree} hourDegree={hourDegree} />
      {/* 数字显示start */}
      <div className='mt-2.5 flex flex-col items-center justify-center gap-3.5 select-none'>
        <h1 suppressHydrationWarning={true} className='relative text-7xl font-bold text-white'>
          {currentDate.getHours() < 10 && '0'}
          {currentDate.getHours()}:{currentDate.getMinutes() < 10 && '0'}
          {currentDate.getMinutes()}{' '}
          <span className='absolute right-0 bottom-0 translate-x-full text-2xl'>
            {currentDate.getHours() >= 12 ? 'PM' : 'AM'}
          </span>
        </h1>
        <p className='text-sm text-gray-200'>{formatter.format(currentDate)}</p>
      </div>
      {/* 数字显示end */}
    </section>
  )
}
