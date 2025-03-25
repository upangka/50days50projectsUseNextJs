'use client'
import { useState, useEffect } from 'react'
import { useTextEffect } from './useTextEffect'
import { shuffleArray } from '@/utils'
const msg = 'I Love Next.js And React 😊: )'
const originColors = [
  '#3A7B9F',
  '#E1C340',
  '#6D8F42',
  '#B45A12',
  '#9F3D7B',
  '#42C5F0',
  '#8E24AA',
  '#1F6E43',
  '#F0B723',
  '#7C4DFF',
  '#388E3C',
  '#FF5722',
  '#607D8B',
  '#E91E63',
  '#009688',
  '#795548',
  '#CDDC39',
  '#2196F3',
  '#FF9800',
  '#9C27B0'
]
export default function AutoTextEffectPage() {
  const [letterIndex, timeGap, setTimeGap] = useTextEffect(msg)
  const [colors, setColors] = useState(originColors)
  useEffect(() => {
    // 新的一轮的时候重新打乱颜色数组
    if (letterIndex === 0) {
      setColors(shuffleArray(originColors))
    }
  }, [letterIndex])

  const showText = msg.slice(0, letterIndex)

  return (
    <section className='relative flex h-screen w-screen flex-col items-center justify-center'>
      <div className='border-b border-white pb-2 text-4xl font-bold italic'>
        {showText.split('').map((letter, index) => {
          return (
            <span
              key={index}
              style={{
                color: colors[index % colors.length]
              }}
            >
              {letter}
            </span>
          )
        })}
      </div>

      <input
        type='number'
        step={1}
        min={1}
        value={timeGap}
        onChange={e => setTimeGap(parseInt(e.target.value) || 100)}
        className='absolute bottom-52 ml-4 w-fit rounded-2xl border-2 border-green-600 px-3 py-2 text-center text-xl font-bold text-white focus:border-green-600 focus:outline-none'
      />
    </section>
  )
}
