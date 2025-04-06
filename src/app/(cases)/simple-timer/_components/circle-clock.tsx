import clsx from 'clsx'
import { formatSecondsToMMSS } from '@/utils'
import AppVariables from '@/styles/variables.module.scss'
import Styles from './circle-clock.module.scss'

interface CircleClockProps {
  degree: number
  isStarted: boolean
  totalCount: number
  currentTotalTime: number
}

const CircleClock: React.FC<CircleClockProps> = ({
  degree,
  isStarted,
  totalCount,
  currentTotalTime
}) => {
  const hasExceededHalfway = degree >= 270
  const formatMMSS = formatSecondsToMMSS(totalCount - currentTotalTime)
  return (
    <div
      style={
        {
          '--rotate-degree': `${degree}deg`
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
        <span className={clsx(Number.parseInt(formatMMSS.minutes) == 0 && '!text-white')}>
          {formatMMSS.minutes}
          {':'}
        </span>

        <span>{formatMMSS.seconds}</span>
      </p>
      {/* 时间显示end */}
      {/* 一个圆形的指示器start */}
      <div
        style={{
          transform: `rotate(${degree}deg)`,
          transformOrigin: 'bottom center'
        }}
        className='absolute top-0 left-1/2 h-1/2 w-[40px] -translate-x-1/2'
      >
        <div className='absolute -top-2 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full bg-white'></div>
      </div>
      {/* 一个圆形的指示器end */}
    </div>
  )
}

CircleClock.displayName = 'CircleClock'

export default CircleClock
