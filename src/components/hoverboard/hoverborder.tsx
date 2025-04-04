'use client'
import clsx from 'clsx'
import Styles from './hoverboard.module.scss'
import { useMemo, useState } from 'react'
import { originColors, getRandomInt } from '@/utils'

interface HoverBoardProps {
  size?: number
  defaultColor?: string
  hoverColors?: string[]
  count?: number
  hoverColorDuration?: number // hover颜色持续时间
}

const HoverBoard: React.FC<HoverBoardProps> = ({
  size = 20,
  defaultColor = '#1d1d1d',
  hoverColors = originColors,
  count = 100,
  hoverColorDuration = 1
}) => {
  // 提前固定每个格子hover的颜色
  const colors = useMemo(() => {
    const colors = []
    for (let i = 0; i < count; i++) {
      colors.push(getRandomInt(hoverColors.length))
    }
    return colors
  }, [hoverColors, count])

  return (
    <ul className='flex w-full flex-wrap'>
      {[...Array(count)].map((_, index) => {
        return (
          <HoverSquare
            key={index}
            hoverColor={hoverColors[colors[index]]}
            {...{ size, defaultColor, hoverColorDuration }}
          />
        )
      })}
    </ul>
  )
}

interface HoverSquareProps {
  size: number
  defaultColor: string
  hoverColor: string
  hoverColorDuration: number // hover颜色持续时间
}
/**
 * 每个小方格的大小
 */
const HoverSquare: React.FC<HoverSquareProps> = ({
  size,
  defaultColor,
  hoverColor,
  hoverColorDuration
}) => {
  const [currentBgColor, setCurrentBgColor] = useState<string>(defaultColor)

  const hoverSquareStyle = {
    backgroundColor: currentBgColor,
    width: `${size}px`,
    height: `${size}px`,
    // 不在style中做的原因是因为权重太高了，导致hover的时候无法取消transition-duration
    '--transition-duration': `${hoverColorDuration}s`
  } as React.CSSProperties

  return (
    <li
      onMouseEnter={e => {
        setCurrentBgColor(hoverColor)
      }}
      onMouseLeave={e => {
        setCurrentBgColor(defaultColor)
      }}
      style={hoverSquareStyle}
      className={clsx(Styles.Square, 'm-[2px] rounded-md')}
    ></li>
  )
}

export default HoverBoard
