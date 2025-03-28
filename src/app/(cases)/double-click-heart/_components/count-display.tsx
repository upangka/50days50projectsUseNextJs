import HeartStyle from '../double-click-heart.module.scss'
import clsx from 'clsx'

interface CountDisplayProps {
  count: number
  position: { x: number; y: number }
}

const CountDisplay: React.FC<CountDisplayProps> = ({ count, position }) => {
  const countStyle = {
    left: `${position.x}px`,
    top: `${position.y - 60}px`
  }

  return (
    <p
      style={countStyle}
      className={clsx(
        HeartStyle.Count,
        'absolute -top-1 z-20 text-lg font-bold select-none',
        count < 10 ? 'text-white' : 'text-yellow-500'
      )}
    >
      +{count}
    </p>
  )
}
export default CountDisplay
