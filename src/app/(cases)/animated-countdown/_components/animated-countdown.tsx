'use client'
import clsx from 'clsx'
import { useState } from 'react'
import Styles from './animate-countdow.module.scss'
import { originColors } from '@/utils/word'
import { Button } from '@/components/pkmer-button'
interface AnimatedCountdownProps {
  count: number
  colors?: string[]
}

const AnimatedCountdown: React.FC<AnimatedCountdownProps> = props => {
  const [currentIndex, setCurrentIndex] = useState(props.count)
  const [currentAnimation, setCurrentAnimation] = useState<'goIn' | 'goOut' | null>('goIn')
  // 设置准备状态，确保最后一个0 GoIn结束之后再出现
  const goOrReady = currentIndex === 0 && currentAnimation === null

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
      } else {
        setCurrentAnimation(null)
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

  function handleBtnClick() {
    // 重新开始
    setCurrentIndex(props.count)
    setCurrentAnimation('goIn')
  }

  const count = props.count + 1
  return (
    <section className='w-[250px]'>
      {goOrReady ? (
        <>
          <h1 className={clsx(Styles.GoTitle, 'mb-4 w-full text-center text-5xl font-bold')}>
            Go Go Go
          </h1>
          <Button onClick={handleBtnClick} className='w-full'>
            重新开始
          </Button>
        </>
      ) : (
        <>
          <ul className='relative h-[100px] w-full overflow-hidden border-b-2 border-dashed border-white'>
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
          <h1 className='mt-4 w-full text-center text-3xl font-bold'>倒计时</h1>
        </>
      )}
    </section>
  )
}

export default AnimatedCountdown
