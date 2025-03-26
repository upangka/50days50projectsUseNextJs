'use client'
import { useState, useEffect, useMemo } from 'react'
import { useTextEffect } from './useTextEffect'
import { shuffleArray, originColors, toColorsWords } from '@/utils'
import { useConfetti } from '@/hooks'
const msg = 'I Love Next.js And React 😊: )'

export default function AutoTextEffectPage() {
  const { showConfetti } = useConfetti()
  const [letterIndex, timeGap, setTimeGap] = useTextEffect(msg, showConfetti)
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
      <div className='absolute top-1/2 -translate-y-1/2 border-b border-white pb-2 text-6xl font-bold italic select-none'>
        {toColorsWords(showText, colors)}
      </div>

      {/* 通过绝对定位固定相对位置 */}
      <input
        type='number'
        step={1}
        min={1}
        value={timeGap}
        onChange={e => setTimeGap(parseInt(e.target.value) || 100)}
        className='absolute top-1/2 ml-4 w-1/12 translate-y-28 rounded-2xl border-2 border-green-600 px-3 py-2 text-center text-xl font-bold text-white focus:border-green-600 focus:outline-none'
      />
    </section>
  )
}
