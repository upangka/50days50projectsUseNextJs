import { memo } from 'react'
import type { Heart } from '../types'
import HeartStyle from '../double-click-heart.module.scss'
import clsx from 'clsx'

interface IconShowProps {
  heart: Heart
}

// 抽离爱心组件
const IconShow: React.FC<IconShowProps> = memo(({ heart }) => {
  return (
    <div
      style={{
        left: `${heart.x}px`,
        top: `${heart.y}px`
      }}
      className={clsx(
        HeartStyle.Love,
        'absolute z-20 -translate-x-1/2 -translate-y-full text-3xl text-white select-none'
      )}
    >
      {heart.icon}
    </div>
  )
})
IconShow.displayName = 'icon show'
export default IconShow
