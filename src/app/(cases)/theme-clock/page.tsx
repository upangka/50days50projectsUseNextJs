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
  console.log({ secondDegree })
  const scale = useCallback(
    (
      num: number,
      in_min: number = 0,
      in_max: number = 60,
      out_min: number = 0,
      out_max: number = 360
    ) => {
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
      console.log(seconds)
      setSecondDegree(scale(seconds))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section className='flex h-screen w-screen justify-center bg-white pt-3.5'>
      <div className='relative h-[420px] w-[420px]'>
        {/* 圆圈start */}
        <div className='absolute -top-[10px] -left-[6px] h-full w-full rounded-full border-8 border-amber-500'></div>
        {/* 圆圈end */}

        {/* 数字start */}
        <ul className='relative h-[400px] w-[400px] rounded-full bg-white'>
          {clockIndicators.map(indicator => {
            return (
              <li
                key={indicator.index}
                className='absolute h-[200px] w-[15px] bg-white text-lg text-black select-none'
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

      {/* <div
        style={{
          transformOrigin: 'bottom center',
          transition: 'transform 0.5s ease-in-out',
          transform: `rotate(${secondDegree}deg)`
        }}
        className='h-[200px] w-[5px] bg-black select-none'
      ></div> */}
    </section>
  )
}
