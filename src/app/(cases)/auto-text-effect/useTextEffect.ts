import { useRef, useState, useLayoutEffect } from 'react'
export function useTextEffect(msg: string) {
  const [letterIndex, setLetterIndex] = useState(0)
  const [timeGap, setTimeGap] = useState(100)
  const timerRef = useRef<number | null>(null)

  const animateText = () => {
    if (timerRef.current)
      return // 防止多次启动
    else if (letterIndex + 1 <= msg.length) {
      timerRef.current = window.setTimeout(() => {
        setLetterIndex(letterIndex + 1)
        timerRef.current = null // 清空定时器引用
      }, timeGap)
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
        timerRef.current = null
      }
    }
  }, [letterIndex, timeGap]) // 依赖 letterIndex，使其更新时重新触发

  return [letterIndex, timeGap, setTimeGap] as const
}
