'use client'
import { useCallback, useMemo, useEffect, useState } from 'react'

type ClockIndicator = {
  index: number
  degree: number
}

// const Clock:React.FC = () => {

//     return <div>

//     </div>
// }

export default function ThemeClockPage() {
  const [secondDegree, setSecondDegree] = useState(0)
  const [minuteDegree, setMinuteDegree] = useState(0)
  const [hourDegree, setHourDegree] = useState(0)
  const scale = useCallback(
    (num: number, in_min: number, in_max: number, out_min: number = 0, out_max: number = 360) => {
      const degree = ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      console.log({ degree })
      return degree
    },
    []
  )

  // todo缓存数字
  const clockIndicators: ClockIndicator[] = useMemo(() => {
    const indicators: ClockIndicator[] = []
    for (let i = 0; i < 12; i++) {
      indicators.push({ index: i, degree: scale(i, 0, 12) })
    }
    return indicators
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const seconds = date.getSeconds()
      const minute = date.getMinutes() + seconds / 60
      const hour = (date.getHours() % 12 || 0) + minute / 60
      setSecondDegree(scale(seconds, 0, 60))
      setMinuteDegree(scale(minute, 0, 60))
      setHourDegree(scale(hour, 0, 12))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // todo 基于长度计算
  return (
    <section className='flex h-screen w-screen justify-center bg-white pt-3.5'>
      <div className='relative h-[410px] w-[410px]'>
        {/* 圆圈start */}
        <div className='absolute -top-[5px] z-20 h-full w-full rounded-full border-8 border-green-600'>
          {/* 时钟中心圆圈start */}
          <div className='absolute top-1/2 left-1/2 z-20 h-[20px] w-[20px] -translate-1/2 rotate-180 rounded-full bg-amber-500'>
            {/* 时针start */}
            <div
              style={{
                zIndex: '50',
                transformOrigin: 'top center',
                transition: secondDegree != 0 ? 'transform 0.5s ease-in-out' : 'none',
                transform: `rotate(${hourDegree}deg)`
              }}
              className='absolute left-1/2 h-[100px] w-[11px] translate-[10px] -translate-x-1/2 rounded-3xl bg-yellow-600 select-none'
            ></div>
            {/* 时针end */}

            {/* 分针start */}
            <div
              style={{
                zIndex: '50',
                transformOrigin: 'top center',
                transition: secondDegree != 0 ? 'transform 0.5s ease-in-out' : 'none',
                transform: `rotate(${minuteDegree}deg)`
              }}
              className='absolute left-1/2 h-[130px] w-[8px] translate-[10px] -translate-x-1/2 rounded-3xl bg-blue-600 select-none'
            ></div>
            {/* 分针end */}

            {/* 秒钟start */}
            <div
              style={{
                zIndex: '50',
                transformOrigin: 'top center',
                transition: secondDegree != 0 ? 'transform 0.5s ease-in-out' : 'none',
                transform: `rotate(${secondDegree}deg)`
              }}
              className='absolute left-1/2 h-[160px] w-[5px] translate-[10px] -translate-x-1/2 rounded-3xl bg-green-600 select-none'
            ></div>
            {/* 秒钟end */}
          </div>
          {/* 时钟中心圆圈end */}
        </div>
        {/* 圆圈end */}

        {/* 数字start */}
        <ul className='relative z-10 h-[400px] w-[400px] rounded-full bg-white'>
          {clockIndicators.map(indicator => {
            return (
              <li
                key={indicator.index}
                className='absolute h-[200px] w-[15px] bg-transparent text-lg text-black select-none'
                style={{
                  left: '50%',
                  transform: `rotate(${indicator.degree}deg)`,
                  transformOrigin: 'bottom center'
                }}
              >
                <div
                  style={{
                    transform: `rotate(${-indicator.degree}deg)`
                  }}
                >
                  {indicator.index}
                </div>
              </li>
            )
          })}
        </ul>
        {/* 数字end */}
      </div>
    </section>
  )
}
