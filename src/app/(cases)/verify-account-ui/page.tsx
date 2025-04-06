'use client'
import { useState, useRef, useEffect } from 'react'
import { handleSafeFocus, handleSafeBlur } from '@/utils/dom'
import CodeInput from './_components/code-input'

export default function VerifyAccountUIPage() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])

  // 是否输入完成
  const isValid = digits.every(digit => digit !== '')

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  /**
   * 处理按键事件 只允许输入数字和删除键
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key
    if (key >= '0' && key <= '9') {
      // 处理数字输入
      const newDigits = digits.map((digit, indexDigit) => {
        if (indexDigit === index) return key
        return digit
      })
      setDigits(newDigits)
      handleSafeFocus(inputRefs.current[index + 1])

      // 处理最后一个输入
      if (digits.every((digit, indexDigit) => indexDigit == index || digit !== '')) {
        handleSafeBlur(inputRefs.current[index])
      }
    } else if (key === 'Backspace') {
      // 处理删除
      const newDigits = [...digits]
      newDigits[index] = ''
      setDigits(newDigits)
      handleSafeFocus(inputRefs.current[index - 1])
    } else {
      // 阻止input默认行为
      e.preventDefault()
    }
  }

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='relative rounded-2xl border border-white p-10 shadow-lg shadow-white'>
        {/* 数字框start */}
        <ul className='flex flex-nowrap gap-2'>
          {digits.map((digit, index) => (
            <li key={index}>
              <CodeInput
                ref={e => {
                  if (e) inputRefs.current[index] = e
                }}
                value={digit}
                onKeyDown={e => handleKeyDown(e, index)}
              />
            </li>
          ))}
        </ul>
        {/* 数字框end */}
        {/* 提示start */}
        <h1
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isValid ? 'scale(1)' : 'scale(0)'
          }}
          className='absolute -top-12 left-1/2 -translate-x-1/2 pb-1 text-center text-3xl font-bold text-green-500'
        >
          Success 🥳
        </h1>
        {/* 提示end */}
      </div>
    </section>
  )
}
