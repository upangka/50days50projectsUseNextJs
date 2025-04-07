import { type Ref } from 'react'
import clsx from 'clsx'
import Styles from './history-terminal.module.scss'
interface HistoryTerminalProps {
  ref?: Ref<HTMLUListElement>
  history: string[]
}

const HistoryTerminalContent: React.FC<HistoryTerminalProps> = ({ ref, history }) => {
  return (
    <ul
      ref={ref}
      style={{
        scrollbarColor: '#10b981 #000' // 滚动条颜色
      }}
      className='text-md flex flex-col items-start justify-start gap-1 overflow-y-auto rounded-lg p-3 text-white'
    >
      {history.map((item, index) => (
        <li key={index} className='flex gap-2'>
          <span>{'>'}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: item
            }}
          ></p>
        </li>
      ))}
    </ul>
  )
}

const HistoryTerminal: React.FC<HistoryTerminalProps> = ({ ref, history }) => {
  return (
    <section
      className={clsx(
        Styles.HistoryContainer,
        'absolute top-0 -right-[130%] flex h-full w-full flex-col border border-white shadow-md shadow-white'
      )}
    >
      {/* 头部start */}
      <ul className='flex w-full items-center justify-start gap-1 p-3.5'>
        <li className='h-[15px] w-[15px] rounded-full bg-red-500'></li>
        <li className='h-[15px] w-[15px] rounded-full bg-green-500'></li>
        <li className='h-[15px] w-[15px] rounded-full bg-blue-500'></li>
        <li className='text-md flex-1 text-center text-white'>操作日志</li>
      </ul>
      {/* 头部end */}
      <hr className='text-white' />
      {/* 日志start */}
      <HistoryTerminalContent ref={ref} history={history} />
      {/* 日志end */}
    </section>
  )
}

HistoryTerminal.displayName = 'HistoryTerminal'
HistoryTerminalContent.displayName = 'HistoryTerminal'

export default HistoryTerminal
