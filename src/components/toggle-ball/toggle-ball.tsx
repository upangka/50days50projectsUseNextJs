'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Styles from './toggle-ball.module.scss'

interface ToggleBallProps {
  bgColor?: string
  ballColor?: string
  onChange: (isOpen: boolean) => void
}
const ToggleBall: React.FC<ToggleBallProps> = ({
  bgColor = 'green',
  ballColor = 'white',
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleChange() {
    setIsOpen(prev => !prev)
    onChange(!isOpen)
    console.log('Click Me')
  }

  const animationName = isOpen ? Styles.slideRight : Styles.slideLeft
  console.log({ animationName })
  return (
    <label
      onClick={handleChange}
      style={{
        backgroundColor: bgColor
      }}
      className={clsx(
        Styles.ToggleBallContainer,
        'relative inline-block aspect-[2/1] w-[80px] rounded-3xl'
      )}
    >
      <input type='checkbox' className={clsx(Styles.CheckedBox, 'hidden')} />
      <div
        style={{
          backgroundColor: ballColor
        }}
        className={clsx(
          Styles.Ball,
          'absolute top-1/2 aspect-square w-1/3 -translate-y-1/2 rounded-full'
        )}
      ></div>
    </label>
  )
}
ToggleBall.displayName = 'ToggleBall'
export default ToggleBall
