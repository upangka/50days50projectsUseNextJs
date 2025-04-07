'use client'
import { useState, useRef, useEffect, type Ref } from 'react'
import ToggleBall from '@/components/toggle-ball/toggle-ball'
import clsx from 'clsx'
import Styles from './styles.module.scss'
import { ZCOOL_KuaiLe } from 'next/font/google'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})
const projectPriorities = ['快', '好', '省']
/**
 * 对应翻译，sum代表组合的projectPriorities的下表和
 */

type Msg = {
  sum: number
  mark: string
  description: string
}
const msgs: Msg[] = [
  {
    sum: 1,
    mark: '好 + 快 → 成本高',
    description: '五星级服务+加急专送？准备好掏空钱包吧！'
  },
  {
    sum: 2,
    mark: '好 + 便宜 → 速度慢',
    description: '物美价廉？等货等到海枯石烂……'
  },
  {
    sum: 3,
    mark: '快 + 便宜 → 质量差',
    description: '9块9包邮次日达?拆开一看是 [ 废渣 ] ！'
  }
]

export default function GoodCheapFastPage() {
  const [chooseStates, setChooseStates] = useState(Array(projectPriorities.length).fill(false))
  /** 用队列来实现会比较简单点: 记录为true的下标队列 */
  const indexQueue = useRef<number[]>([])
  const history = useRef<string[]>([])
  const ulRef = useRef<HTMLUListElement | null>(null)

  const msgsSumkey = indexQueue.current.reduce((prev, item) => prev + item, 0)
  // 找到对应的msg
  const msg = msgs.find(msg => msg.sum === msgsSumkey)
  const isShowMsgPrompt = msg && indexQueue.current.length >= 2

  /**
   * 在 history 添加新数据后，让滚动条自动滚动到底部
   */
  useEffect(() => {
    const ul = ulRef.current
    if (ul) {
      ul.scrollTop = ul.scrollHeight
    }
  }, [history.current.length]) // 每次新增时触发

  /**
   * true情况分析
   * 1. 加入一个true,此时判断是否有2个true，没有直接加入。
   * 2. 如果已经有两个true，此时移除掉最先的true，并调整最先的为false，再添加新的true。
   *
   * false情况分析
   * 1. 检查队列中是否有当前下标，如果有，则移除，并更新chooseStates
   */
  function handleChange(isOpen: boolean, index: number) {
    if (isOpen) {
      const hasTwo = chooseStates.filter(state => state).length >= 2
      if (hasTwo) {
        // 移除最先的true
        const firstIndex = indexQueue.current.shift()
        // 加入此时的true下标
        indexQueue.current.push(index)
        history.current.push(
          `移除 ${firstIndex} ,并更新队列 <span class='${Styles.HistoryText}'>[ ${indexQueue.current} ] </span>`
        )

        setChooseStates(prevStates => {
          const newStates = [...prevStates]
          newStates[firstIndex!] = false
          newStates[index] = true
          return newStates
        })
      } else {
        // 直接加入
        setChooseStates(prevStates => {
          const newStates = [...prevStates]
          newStates[index] = isOpen
          return newStates
        })
        indexQueue.current.push(index)
        history.current.push(
          `新增 ${index} , 此时队列 <span class='${Styles.HistoryText}'>[ ${indexQueue.current} ]</span> `
        )
      }
    } else {
      // 处理关闭的开关
      // 1. 从队列中移除中下标
      indexQueue.current = indexQueue.current.filter(i => i !== index)
      // 2. 更新chooseStates
      setChooseStates(prevStates => {
        const newStates = [...prevStates]
        newStates[index] = isOpen
        return newStates
      })
      history.current.push(
        `移除 ${index} 此时队列 <span class='${Styles.HistoryText}'>[ ${indexQueue.current} ]</span>`
      )
    }
  }

  return (
    <section
      className={clsx(
        zcoolKuaiLe.className,
        'flex h-screen w-screen flex-col items-center justify-center gap-10'
      )}
    >
      {/* msg start */}
      {isShowMsgPrompt && <ProjectMsgPrompt msg={msg} />}
      {/* msg end */}
      <div className='relative -translate-x-1/2 rounded-lg bg-white p-10 text-black shadow-lg shadow-white'>
        <h1 className='mb-3 text-xl font-bold'>
          甲方の终极难题：
          <br /> 快、好、省，您想放弃哪一个？
        </h1>
        <ul className='flex flex-col items-start justify-start gap-2.5'>
          {projectPriorities.map((project, index) => (
            <li key={index} className='flex items-center gap-2'>
              <ToggleBall
                isOpen={chooseStates[index]}
                onChange={isOpen => {
                  handleChange(isOpen, index)
                }}
              />
              <span className='text-xl'>{project}</span>
            </li>
          ))}
        </ul>

        {/* 操作日志start */}
        {history.current.length >= 0 && <HistoryTerminal ref={ulRef} history={history.current} />}
        {/* 操作日志end */}
      </div>
    </section>
  )
}

// ============Project Msg Prompt=============================

interface ProjectMsgPromptProps {
  msg: Msg
}

const ProjectMsgPrompt: React.FC<ProjectMsgPromptProps> = ({ msg }) => {
  return (
    <div className='flex w-fit flex-col items-center justify-center gap-3.5'>
      <h1 className='text-2xl font-bold'>{msg.mark}</h1>
      <p className='text-xl text-green-500'>{msg.description}</p>
    </div>
  )
}
ProjectMsgPrompt.displayName = 'ProjectMsgPrompt'
// ==========History terminal================
interface HistoryTerminalProps {
  ref?: Ref<HTMLUListElement>
  history: string[]
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

HistoryTerminalContent.displayName = 'HistoryTerminal'
