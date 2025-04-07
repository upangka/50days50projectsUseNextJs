'use client'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import Styles from './toggle-ball.module.scss'
import AppVariables from '@/styles/variables.module.scss'
interface ToggleBallProps {
  /**
   * 打开背景颜色
   */
  bgColorOpen?: string
  /**
   * 关闭背景颜色
   */
  bgColorClose?: string
  /**
   * 球的颜色
   */
  ballColor?: string
  /**
   * 开关是否打开
   */
  isOpen: boolean
  /**
   * 开关状态改变
   */
  onChange: (isOpen: boolean) => void
}
const ToggleBall: React.FC<ToggleBallProps> = ({
  bgColorOpen = AppVariables.primaryColor,
  bgColorClose = AppVariables.primaryGray,
  ballColor = 'white',
  isOpen,
  onChange
}) => {
  // 控制动画的开关，避免初始加载就运行动画
  const openAnimation = useRef(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isOpen = e.target.checked
    onChange(isOpen)
    openAnimation.current = true
  }

  return (
    <label
      style={{
        backgroundColor: isOpen ? bgColorOpen : bgColorClose
      }}
      className={clsx(
        Styles.ToggleBallContainer,
        'relative inline-block aspect-[2/1] w-[80px] rounded-3xl'
      )}
    >
      {/* 隐藏input用于无障碍，但不作为动画触发依据,这里只作为事件的触发，不在css使用:checked处理样式 */}
      <input
        onChange={e => handleChange(e)}
        type='checkbox'
        checked={isOpen}
        className={clsx(Styles.CheckedBox, 'hidden')}
      />
      <div
        style={{
          backgroundColor: ballColor
        }}
        className={clsx(
          openAnimation.current && Styles.Ball, // 控制是否允许动画
          isOpen ? Styles.ToRight : Styles.ToLeft, // 前提是要有Ball父类，控制左移动，右移动动画
          'absolute top-1/2 aspect-square w-2/5 -translate-y-1/2 rounded-full'
        )}
      ></div>
    </label>
  )
}
ToggleBall.displayName = 'ToggleBall'
export default ToggleBall
