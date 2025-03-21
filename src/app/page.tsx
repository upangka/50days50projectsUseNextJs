'use client'

import clsx from 'clsx'
import { use, useState } from 'react'
import { Button } from '@/components/pkmer-button'
import { projects, finishedProjects } from '@/data/projects'

export default function App() {
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [chooseStatus, setChooseStatus] = useState<ChooseStatus>('unchoosed')

  function start(milliseconds: number = 5000) {
    setChooseStatus('choosing')
    const interval = setInterval(() => {
      let randomIndex = -1
      while (true) {
        randomIndex = Math.floor(Math.random() * projects.length)
        if (!projects[randomIndex].finished) {
          break
        }
      }
      setHighlightedIndex(randomIndex)
    }, 450)

    setTimeout(() => {
      clearInterval(interval)
      setChooseStatus('choosed')
    }, milliseconds)
  }

  return (
    <>
      <div className='flex w-screen flex-col items-center justify-center gap-3.5 pt-12'>
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
                'flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-black bg-white text-black transition-all duration-500',
                project.id == highlightedIndex && '!bg-yellow-600 text-white',
                project.finished && '!bg-green-600 text-white'
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
