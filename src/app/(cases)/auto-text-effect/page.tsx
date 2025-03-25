'use client'
import { useRef, useState, useLayoutEffect } from 'react'
const msg = 'I Love Next.js And React'
const colors = [
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
  const [letterIndex, setLetterIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  const animateText = () => {
    if (timerRef.current)
      return // 防止多次启动
    else if (letterIndex + 1 <= msg.length) {
      timerRef.current = window.setTimeout(() => {
        setLetterIndex(letterIndex + 1)
        timerRef.current = null // 清空定时器引用
      }, 100)
    } else {
      timerRef.current = window.setTimeout(() => {
        setLetterIndex(0)
        timerRef.current = null // 清空定时器引用
      }, 1000)
    }
  }

  useLayoutEffect(() => {
    animateText()
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [letterIndex]) // 依赖 letterIndex，使其更新时重新触发

  const showText = msg.slice(0, letterIndex)

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='text-4xl font-bold'>
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
    </section>
  )
}
