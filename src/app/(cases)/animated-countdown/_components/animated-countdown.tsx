'use client'
import clsx from 'clsx'
import { useState } from 'react'
import Styles from './animate-countdow.module.scss'
import { originColors } from '@/utils/word'
interface AnimatedCountdownProps {
  count: number
  colors?: string[]
}

const AnimatedCountdown: React.FC<AnimatedCountdownProps> = props => {
  const [currentIndex, setCurrentIndex] = useState(props.count)
  const [currentAnimation, setCurrentAnimation] = useState<'goIn' | 'goOut' | null>('goIn')

  function handleAnimationEnd(e: React.AnimationEvent<HTMLLIElement>) {
    const animationName = e.animationName
    console.log(animationName)
    if (currentAnimation === 'goIn') {
      /*
        1. 如果当前数字是最后一个数字，则不执行任何操作
        2. 如果当前数字不是最后一个数字，则将当前数字设置为goOut动画
        */
      if (currentIndex > 0) {
        // 当前数字添加goOut动画
        setCurrentAnimation('goOut')
      }
    } else if (currentAnimation === 'goOut') {
      /**
       * 1. 准备下一个数字的GoIn
       */
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
        setCurrentAnimation('goIn')
      }
    }
  }

  const count = props.count + 1
  return (
    <ul className='relative h-[100px] w-[250px] overflow-hidden border-b-2 border-dashed border-white'>
      {[...Array(count)].map((_, index) => (
        <li
          key={index}
          style={{
            color: originColors[index % originColors.length]
          }}
          onAnimationEnd={handleAnimationEnd}
          className={clsx(
            Styles.Number,
            currentIndex === index && currentAnimation === 'goIn' && Styles.GoIn,
            currentIndex === index && currentAnimation === 'goOut' && Styles.GoOut,
            'absolute bottom-0 left-1/2 -translate-x-1/2 text-8xl'
          )}
        >
          {index}
        </li>
      ))}
    </ul>
  )
}

export default AnimatedCountdown
