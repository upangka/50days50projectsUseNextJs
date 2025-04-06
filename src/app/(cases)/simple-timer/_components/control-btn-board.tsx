'use client'
import { Icon } from '@iconify/react'
interface ControlBtnBoardProps {
  isStarted: boolean
  onReset: () => void
  toggleStopAndResume: () => void
}

/**
 * 控制按钮面板
 */
const ControlBtnBoard: React.FC<ControlBtnBoardProps> = ({
  isStarted,
  onReset,
  toggleStopAndResume
}) => {
  return (
    <section className='absolute bottom-0 left-0 flex w-full justify-around pb-5'>
      <button onClick={onReset}>
        <Icon
          icon='ic:outline-refresh'
          className='text-white hover:text-green-500'
          width={30}
          height={30}
        />
      </button>
      <button onClick={toggleStopAndResume}>
        <Icon
          icon={isStarted ? 'carbon:pause-outline' : 'iconamoon:player-play-fill'}
          className='text-white hover:text-green-500'
          width={30}
          height={30}
        />
      </button>
    </section>
  )
}

ControlBtnBoard.displayName = 'ControlBtnBoard'
export default ControlBtnBoard
