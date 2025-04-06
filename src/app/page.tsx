'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { navList } from '@/data/config'
import { Button } from '@/components/pkmer-button'
import BorderAnimatedCard from '@/components/card/border-animated-card'
import RotatingNavigationAnimation from '@/components/nav/animation/rotating-navigation-animation'
import { projects, finishedProjects, unfinishedProjects } from '@/data/projects'
import { getRandomInt } from '@/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
export default function App() {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [chooseStatus, setChooseStatus] = useState<ChooseStatus>('unchoosed')

  /**
   * 开始随机选择一个未完成的项目
   * @param milliseconds {number} 选择的时间长度，默认为 5000 毫秒
   */
  function start(milliseconds: number = 3000) {
    setChooseStatus('choosing')

    // 处理最后还剩最后一个未完成的项目的情况
    if (unfinishedProjects.length === 1) {
      setHighlightedIndex(unfinishedProjects[0].id)
      setChooseStatus('choosed')
      return
    }

    const interval = setInterval(() => {
      const chooseUnfinishedId = doChoose()
      setHighlightedIndex(chooseUnfinishedId)
    }, 250)

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
    const randomIndex = getRandomInt(unfinishedProjects.length)
    return unfinishedProjects[randomIndex].id
  }

  return (
    <RotatingNavigationAnimation navList={navList}>
      <section className='h-screen w-screen overflow-x-hidden bg-black'>
        {/* 标题start */}
        <div className='flex w-screen flex-col items-center justify-center gap-1.5 pt-8 select-none'>
          <h1 className='rounded-md bg-green-600 px-3.5 py-2 text-3xl font-bold text-white'>
            {projects.length} Days {projects.length} Projects
          </h1>
          <p className='text-lg text-gray-200'>
            Happy Coding 😊<span className='text-2xl'> :)</span>
          </p>
          <Image className='rounded-full' src='/pkmer.jpeg' width={39} height={39} alt='pkmer' />
        </div>
        {/* 标题end */}
        {/* 面板start */}
        <div className='mt-4 flex flex-col items-center justify-center'>
          {/* 面板描述start */}
          <h2 className='mb-3.5 border-b border-dashed border-gray-200 pb-1.5 text-lg text-gray-200 italic select-none'>
            <a href='https://gitee.com/pkmer/50days50projects-use-next-js' className='font-bold'>
              Pkmer
            </a>{' '}
            have completed{' '}
            <span className='text-2xl text-green-500'>{finishedProjects.length}</span>{' '}
            {finishedProjects.length < 2 ? 'case' : 'cases'}, keep it up!
          </h2>
          {/* 面板描述end */}
          {/* 面板选项start */}
          <section className='mx-auto flex w-[50vw] flex-col items-center justify-center gap-4'>
            <BoardCard highlightedIndex={highlightedIndex} total={projects.length} />
            <ChooseBtn
              chooseStatus={chooseStatus}
              highlightedIndex={highlightedIndex}
              onStart={start}
            />
          </section>
          {/* 面板选项end */}
        </div>
        {/* 面板end */}
      </section>
    </RotatingNavigationAnimation>
  )
}

interface CardProps {
  highlightedIndex: number
  total?: number
}
const BoardCard: React.FC<CardProps> = ({ highlightedIndex }) => {
  const router = useRouter()
  return (
    <BorderAnimatedCard duration={5}>
      <section className='flex flex-col items-center justify-center gap-4 p-10'>
        <ul className='flex h-full w-[51vw] flex-wrap items-center justify-start gap-2 overflow-hidden select-none'>
          {projects.map(project => (
            <li
              className={clsx(
                'flex h-[45px] w-[45px] items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all duration-500',
                project.id == highlightedIndex && '!bg-yellow-600 text-white',
                project.finished
                  ? 'cursor-pointer !bg-green-600 text-white hover:scale-105 hover:!bg-green-700'
                  : 'cursor-not-allowed'
              )}
              key={project.id}
              onClick={() => project.finished && router.push(`/${project.route}`)}
              title={project.finished ? project.title : ''}
            >
              {project.id}
            </li>
          ))}
        </ul>
      </section>
    </BorderAnimatedCard>
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
          <p
            className={clsx(
              'w-[130px] rounded-md border border-green-400 bg-green-600 px-3.5 py-2 font-bold text-white shadow-2xs shadow-green-300 select-none'
            )}
          >
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
