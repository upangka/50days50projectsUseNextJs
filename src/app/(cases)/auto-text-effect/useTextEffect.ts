import { useRef, useState, useLayoutEffect } from 'react'
import { noop } from '@/utils'

/**
 * 自动展示文本效果
 * @param msg 需要展示的文本
 * @param cb 回调函数
 * @returns [letterIndex当前要展示字符串的位置，timeGap展示字符的速度]
 */
export function useTextEffect(msg: string, cb: Function = noop) {
  const [letterIndex, setLetterIndex] = useState(0)
  const [timeGap, setTimeGap] = useState(100)
  const timerRef = useRef<number | null>(null)

  const animateText = () => {
    if (timerRef.current)
      return // 防止多次启动
    else if (letterIndex + 1 <= msg.length) {
      // 持续更改当前要展示字符的位置
      timerRef.current = window.setTimeout(() => {
        setLetterIndex(letterIndex + 1)
        timerRef.current = null // 清空定时器引用
      }, timeGap)
    } else {
      // 调用回调函数
      cb()
      // 暂停1分钟后再调用
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
