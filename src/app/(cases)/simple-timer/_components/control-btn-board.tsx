'use client'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
interface ControlBtnBoardProps {
  /**
   * 是否运行结束
   */
  isOver: boolean
  /**
   * 是否开始
   */
  isStarted: boolean
  /**
   * 重置
   */
  onReset: () => void
  /**
   * 切换停止和恢复
   */
  toggleStopAndResume: () => void
}

/**
 * 控制按钮面板
 */
const ControlBtnBoard: React.FC<ControlBtnBoardProps> = ({
  isOver,
  isStarted,
  onReset,
  toggleStopAndResume
}) => {
  return (
    <section className='absolute bottom-0 left-0 flex w-full justify-around pb-5'>
      <button onClick={onReset}>
        <Icon
          icon='ic:outline-refresh'
          className='cursor-pointer text-white hover:text-green-500'
          width={30}
          height={30}
        />
      </button>
      <button disabled={isOver} onClick={toggleStopAndResume}>
        <Icon
          icon={isStarted ? 'carbon:pause-outline' : 'iconamoon:player-play-fill'}
          className={clsx(
            !isOver && 'cursor-pointer text-white hover:text-green-500',
            isOver && 'cursor-not-allowed text-gray-500'
          )}
          width={30}
          height={30}
        />
      </button>
    </section>
  )
}

ControlBtnBoard.displayName = 'ControlBtnBoard'
export default ControlBtnBoard
