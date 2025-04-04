'use client'
import clsx from 'clsx'
import Styles from './hoverboard.module.scss'
import { useMemo } from 'react'
import { originColors, getRandomInt } from '@/utils'

interface HoverBoardProps {
  size?: number
  defaultColor?: string
  hoverColors?: string[]
  count?: number
}

const HoverBoard: React.FC<HoverBoardProps> = ({
  size = 20,
  defaultColor = 'transparent',
  hoverColors = originColors,
  count = 100
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
    <ul className='flex w-full flex-wrap gap-[1px]'>
      {[...Array(count)].map((_, index) => {
        return (
          <HoverSquare
            key={index}
            size={size}
            defaultColor={defaultColor}
            hoverColor={hoverColors[colors[index]]}
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
}
/**
 * 每个小方格的大小
 */
const HoverSquare: React.FC<HoverSquareProps> = ({ size, defaultColor, hoverColor }) => {
  return (
    <li
      onMouseEnter={e => {
        ;(e.target as HTMLLIElement).style.backgroundColor = hoverColor
      }}
      onMouseLeave={e => {
        ;(e.target as HTMLLIElement).style.backgroundColor = defaultColor
      }}
      style={{
        backgroundColor: defaultColor,
        width: `${size}px`,
        height: `${size}px`
      }}
      className={clsx(Styles.Square, 'border border-gray-400')}
    ></li>
  )
}

export default HoverBoard
