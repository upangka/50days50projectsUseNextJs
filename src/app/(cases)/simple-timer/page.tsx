'use client'
import { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { mapRange } from '@/utils'
import CircleClock from './_components/circle-clock'
const totalCount = 60
export default function SimpleTimerPage() {
  const [currentDegree, setCurrentDegree] = useState(0)
  const totalTime = useRef(0)
  const timer = useRef<number | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  /**
   * 暂停
   */
  function toggleStopAndResume() {
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
  }

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

interface ControlBtnBoardProps {
  isStarted: boolean
  onReset: () => void
  toggleStopAndResume: () => void
}

/**
 * 控制按钮面板
 */
const ControlBtnBoard: React.FC<ControlBtnBoardProps> = ({
  isStarted,
  onReset,
  toggleStopAndResume
}) => {
  return (
    <section className='absolute bottom-0 left-0 flex w-full justify-around pb-5'>
      <button onClick={onReset}>
        <Icon
          icon='ic:outline-refresh'
          className='text-white hover:text-green-500'
          width={30}
          height={30}
        />
      </button>
      <button onClick={toggleStopAndResume}>
        <Icon
          icon={isStarted ? 'carbon:pause-outline' : 'iconamoon:player-play-fill'}
          className='text-white hover:text-green-500'
          width={30}
          height={30}
        />
      </button>
    </section>
  )
}

ControlBtnBoard.displayName = 'ControlBtnBoard'
