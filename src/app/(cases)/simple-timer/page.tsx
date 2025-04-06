'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { mapRange } from '@/utils'
import CircleClock from './_components/circle-clock'
import ControlBtnBoard from './_components/control-btn-board'
const totalCount = 60
export default function SimpleTimerPage() {
  const [currentDegree, setCurrentDegree] = useState(0)
  const totalTime = useRef(0)
  const timer = useRef<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  // 清除定时器的通用函数
  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  /**
   * 开始
   */
  const startTimer = useCallback(() => {
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
  }, [])
  /**
   * 暂停
   */
  const toggleStopAndResume = useCallback(() => {
    if (isStarted) {
      // 处理正在记时间的情况
      setIsStarted(false)
      clearTimer()
    } else {
      // 继续运行
      startTimer()
      setIsStarted(true)
    }
  }, [clearTimer, isStarted, startTimer]) // 要依赖isStarted，不然总是snapshot快照

  /**
   * 重置
   */
  const resetTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    totalTime.current = 0
    setCurrentDegree(0)
    setIsStarted(false)
  }, [])

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      {/* 面板start */}
      <div className='relative rounded-xl border border-gray-200 p-20 shadow-md shadow-white'>
        <CircleClock
          degree={currentDegree}
          isStarted={isStarted}
          totalCount={totalCount}
          currentTotalTime={totalTime.current}
        />

        {/* 按钮start */}
        <ControlBtnBoard
          isStarted={isStarted}
          onReset={resetTimer}
          toggleStopAndResume={toggleStopAndResume}
        />
        {/* 按钮end */}
      </div>
      {/* 面板end */}
    </section>
  )
}
