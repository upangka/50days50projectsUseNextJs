'use client'

import clsx from 'clsx'
import { use, useState } from 'react'
import { Button } from '@/components/pkmer-button'
import { projects, finishedProjects } from '@/data/projects'

export default function App() {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [chooseStatus, setChooseStatus] = useState<ChooseStatus>('unchoosed')

  /**
   * 开始随机选择一个未完成的项目
   * @param milliseconds {number} 选择的时间间隔，默认为 5000 毫秒
   */
  function start(milliseconds: number = 5000) {
    setChooseStatus('choosing')
    const interval = setInterval(() => {
      const chooseIndex = doChoose()
      setHighlightedIndex(chooseIndex)
    }, 450)

    setTimeout(() => {
      clearInterval(interval)
      // 确保最终选中的项目是未完成的
      doChoose()
      setChooseStatus('choosed')
    }, milliseconds)
  }

  /**
   * 随机选择一个未完成的项目
   * @returns {number} 返回未完成的项目的索引
   */
  function doChoose() {
    let randomIndex = -1
    while (true && finishedProjects.length < projects.length) {
      randomIndex = Math.floor(Math.random() * projects.length)
      if (!projects[randomIndex].finished) {
        break
      }
    }
    return randomIndex
  }

  return (
    <>
      <div className='flex w-screen flex-col items-center justify-center gap-1.5 pt-8'>
        <h1 className='rounded-md bg-green-600 px-3.5 py-2 text-3xl font-bold text-white'>
          {projects.length} Days {projects.length} Projects
        </h1>
        <p className='text-lg text-gray-200'>
          Happy Coding 😊 <span className='text-3xl'>:)</span>
        </p>
      </div>

      <div className='absolute top-1/2 left-1/2 flex h-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'>
        <h2 className='mb-3.5 border-b border-double border-gray-200 pb-1.5 text-lg text-gray-200'>
          You have completed{' '}
          <span className='text-2xl text-green-500'>{finishedProjects.length}</span>{' '}
          {finishedProjects.length < 2 ? 'case' : 'cases'}, keep it up!
        </h2>
        <section className='mx-auto flex w-[51vw] flex-col items-center justify-center gap-4'>
          <Card highlightedIndex={highlightedIndex} total={projects.length} />
          <ChooseBtn
            chooseStatus={chooseStatus}
            highlightedIndex={highlightedIndex}
            onStart={start}
          />
        </section>
      </div>
    </>
  )
}

interface CardProps {
  highlightedIndex: number
  total?: number
}
const Card: React.FC<CardProps> = ({ highlightedIndex, total = 50 }) => {
  return (
    <>
      <section className='mx-auto flex flex-col items-center justify-center gap-4'>
        <ul className='mx-auto flex h-full w-full flex-wrap items-center justify-start gap-2'>
          {projects.map(project => (
            <li
              className={clsx(
                'flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all duration-500',
                project.id == highlightedIndex && '!bg-yellow-500 text-white',
                project.finished ? 'cursor-pointer !bg-green-600 text-white' : 'cursor-not-allowed'
              )}
              key={project.id}
            >
              {project.id}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

interface ChooseBtnProps {
  onStart: (milliseconds?: number) => void
  highlightedIndex: number
  chooseStatus: ChooseStatus
}

type ChooseStatus = 'choosed' | 'unchoosed' | 'choosing'

const ChooseBtn: React.FC<ChooseBtnProps> = ({ highlightedIndex, chooseStatus, onStart }) => {
  const isChoosed = chooseStatus === 'choosed' || chooseStatus === 'choosing'

  return (
    <div>
      {isChoosed ? (
        <div className='flex items-center justify-center gap-4'>
          <p className='rounded-md border border-green-400 bg-green-600 px-3.5 py-2 font-bold text-white shadow-2xs shadow-green-300'>
            选中的是：{highlightedIndex <= 0 ? '' : highlightedIndex}
          </p>
          <Button onClick={() => onStart()} isEnable={!(chooseStatus == 'choosing')}>
            重新开始
          </Button>
        </div>
      ) : (
        <Button onClick={() => onStart()}>开始</Button>
      )}
    </div>
  )
}
