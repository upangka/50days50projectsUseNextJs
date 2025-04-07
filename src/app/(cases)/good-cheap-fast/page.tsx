'use client'
import { useState, useRef, useMemo, type Ref } from 'react'
import clsx from 'clsx'
import HistoryStyles from './_components/history-terminal/history-terminal.module.scss'
import { ProjectMsgPrompt, ProjectOperationBoard } from './_components'
import { msgs, projectPriorities } from './config'
import { ZCOOL_KuaiLe } from 'next/font/google'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})
/**
 * 对应翻译，sum代表组合的projectPriorities的下表和
 */

export default function GoodCheapFastPage() {
  const [chooseStates, setChooseStates] = useState(Array(projectPriorities.length).fill(false))
  /** 用队列来实现会比较简单点: 记录为true的下标队列 */
  const indexQueue = useRef<number[]>([])
  const history = useRef<string[]>([])

  // 计算队列和，找到对应的msg
  const msgsSumkey = indexQueue.current.reduce((prev, item) => prev + item, 0)
  // 找到对应的msg
  const msg = msgs.find(msg => msg.sum === msgsSumkey)
  const isShowMsgPrompt = msg && indexQueue.current.length >= 2

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
          `移除 ${firstIndex} ,并更新队列 <span class='${HistoryStyles.HistoryText}'>[ ${indexQueue.current} ] </span>`
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
          `新增 ${index} , 此时队列 <span class='${HistoryStyles.HistoryText}'>[ ${indexQueue.current} ]</span> `
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
        `移除 ${index} 此时队列 <span class='${HistoryStyles.HistoryText}'>[ ${indexQueue.current} ]</span>`
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

      {/* 操作面板start */}
      <ProjectOperationBoard
        chooseStates={chooseStates}
        projectPriorities={projectPriorities}
        history={history.current}
        onToggleBallChange={handleChange}
      />
      {/* 操作面板end */}
    </section>
  )
}
