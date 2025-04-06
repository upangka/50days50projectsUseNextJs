'use client'
import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import Styles from './page.module.scss'
import AppVariables from '@/styles/variables.module.scss'
import { Icon } from '@iconify/react'
import { mapRange, addLeadingZero } from '@/utils'

const totalCount = 10
export default function SimpleTimerPage() {
  // todo 抽离属性 totalCount

  const [currentDegree, setCurrentDegree] = useState(0)
  const totalTime = useRef(0)
  const timer = useRef<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  const hasExceededHalfway = currentDegree > 180

  /**
   * 暂停
   */
  function stopTimer() {
    if (isStarted) {
      // 处理正在记时间的情况
      setIsStarted(false)
      if (timer.current) {
        clearInterval(timer.current)
      }
    } else {
      // 继续运行
      startTimer()
      setIsStarted(true)
    }
  }

  /**
   * 重置
   */
  function resetTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    totalTime.current = 0
    setCurrentDegree(0)
    setIsStarted(false)
  }

  /**
   * 开始
   */
  function startTimer() {
    timer.current = window.setInterval(() => {
      if (totalTime.current >= totalCount && timer.current) {
        clearInterval(timer.current)
      } else {
        // 计数+1
        totalTime.current += 1
        // 计算角度
        const degree = mapRange(totalTime.current, 0, totalCount)
        setCurrentDegree(degree)
      }
    }, 1000)

    if (totalTime.current === 0) {
      // 一开始就开始计算
      totalTime.current = 1
    }
  }

  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      {/* 面板start */}
      <div className='relative rounded-xl border border-gray-200 p-20 shadow-md shadow-white'>
        <div
          style={
            {
              '--rotate-degree': `${currentDegree}deg`
            } as React.CSSProperties
          }
          className={clsx(Styles.Conic, 'relative aspect-square w-60 rounded-full')}
        >
          {/* 搭配父容器实现线条效果start */}
          <div
            style={{
              backgroundColor: AppVariables.primaryBgColor
            }}
            className='absolute inset-1 top-1/2 left-1/2 aspect-square w-[234px] -translate-1/2 rounded-full'
          ></div>
          {/* 搭配父容器实现线条效果end */}
          {/* 时间显示start */}
          <p
            className={clsx(
              !isStarted && '!text-white',
              isStarted && hasExceededHalfway ? 'text-red-500' : 'text-green-500',
              'absolute top-1/2 left-1/2 -translate-1/2 text-6xl'
            )}
          >
            00:{addLeadingZero(totalCount - totalTime.current)}
          </p>
          {/* 时间显示end */}
          {/* 一个圆形的指示器start */}
          <div
            style={{
              transform: `rotate(${currentDegree}deg)`,
              transformOrigin: 'bottom center'
            }}
            className='absolute top-0 left-1/2 h-1/2 w-[40px] -translate-x-1/2'
          >
            <div className='absolute -top-2 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-white'></div>
          </div>
          {/* 一个圆形的指示器end */}
        </div>

        {/* 按钮start */}
        <section className='absolute bottom-0 left-0 flex w-full justify-around pb-5'>
          <button onClick={resetTimer}>
            <Icon
              icon='ic:outline-refresh'
              className='text-white hover:text-green-500'
              width={30}
              height={30}
            />
          </button>
          <button onClick={stopTimer}>
            <Icon
              icon={isStarted ? 'carbon:pause-outline' : 'iconamoon:player-play-fill'}
              className='text-white hover:text-green-500'
              width={30}
              height={30}
            />
          </button>
        </section>
        {/* 按钮end */}
      </div>
      {/* 面板end */}
    </section>
  )
}
