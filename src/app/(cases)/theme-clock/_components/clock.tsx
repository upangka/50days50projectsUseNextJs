'use client'
import { memo, useMemo } from 'react'
import { mapRange } from '@/utils'

type ClockIndicator = {
  index: number
  degree: number
}

interface ClockProps {
  secondDegree: number
  minuteDegree: number
  hourDegree: number
}
export const Clock: React.FC<ClockProps> = ({ secondDegree, minuteDegree, hourDegree }) => {
  return (
    <div className='relative h-[410px] w-[410px]'>
      {/* 圆圈start */}
      <div className='absolute -top-[5px] z-20 h-full w-full rounded-full border-8 border-green-600'>
        {/* 时钟中心圆圈start */}
        <div className='absolute top-1/2 left-1/2 z-20 h-[20px] w-[20px] -translate-1/2 rotate-180 rounded-full bg-amber-500'>
          {/* 时针start */}
          <div
            suppressHydrationWarning={true}
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
            suppressHydrationWarning={true}
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
            suppressHydrationWarning={true}
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
      <ClockNumebr />
    </div>
  )
}

/**
 * 数字显示UI组件
 */
const ClockNumebr = memo(function ClockNumber() {
  const clockIndicators: ClockIndicator[] = useMemo(() => {
    const indicators: ClockIndicator[] = []
    for (let i = 0; i < 12; i++) {
      indicators.push({ index: i, degree: mapRange(i, 0, 12) })
    }
    return indicators
  }, [])

  return (
    <>
      {/* 数字start */}
      <ul className='relative z-10 h-[400px] w-[400px] rounded-full'>
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
                className='text-white'
              >
                {indicator.index}
              </div>
            </li>
          )
        })}
      </ul>
      {/* 数字end */}
    </>
  )
})
