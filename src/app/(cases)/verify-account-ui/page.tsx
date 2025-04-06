'use client'
import { useState, useRef, useEffect } from 'react'
import { handleSafeFocus, handleSafeBlur } from '@/utils/dom'
import { clsx } from 'clsx'
export default function VerifyAccountUIPage() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<HTMLInputElement[]>([])

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
      <div className='rouned-2xl relative border border-white p-10 shadow-lg shadow-white'>
        {/* 数字框start */}
        <ul className='flex flex-nowrap gap-2'>
          {digits.map((digit, index) => (
            <li key={index}>
              <input
                ref={e => {
                  if (e) inputRefs.current[index] = e
                }}
                onKeyDown={e => handleKeyDown(e, index)}
                maxLength={1}
                placeholder='0'
                type='text'
                className={clsx(
                  digit !== '' && 'border-green-400',
                  'h-[120px] w-[100px] border-2 text-center text-6xl !outline-none placeholder:text-gray-200/20 focus:border-amber-400'
                )}
              />
            </li>
          ))}
        </ul>
        {/* 数字框end */}
        <h1
          style={{
            transition: 'all 0.3s ease-in-out',
            transform: isValid ? 'scale(1)' : 'scale(0)'
          }}
          className='absolute -bottom-12 left-1/2 -translate-x-1/2 pb-1 text-center text-3xl font-bold text-green-500'
        >
          Success
        </h1>
      </div>
    </section>
  )
}
