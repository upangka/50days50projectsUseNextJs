'use client'
import { useState } from 'react'
import ToggleBall from '@/components/toggle-ball/toggle-ball'
import clsx from 'clsx'
import { ZCOOL_KuaiLe } from 'next/font/google'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})
const projectPriorities = ['快', '好', '省']
export default function GoodCheapFastPage() {
  const [chooseStates, setChooseStates] = useState(Array(projectPriorities.length).fill(false))

  return (
    <section
      className={clsx(zcoolKuaiLe.className, 'flex h-screen w-screen items-center justify-center')}
    >
      <div className='rounded-lg bg-white p-10 text-black shadow-lg shadow-white'>
        <h1 className='mb-3 text-2xl font-bold'>
          甲方の终极难题：
          <br /> 快、好、省，您想放弃哪一个？
        </h1>
        <ul className='flex flex-col items-start justify-start gap-2.5'>
          {projectPriorities.map((project, index) => (
            <li key={index} className='flex items-center gap-2'>
              <ToggleBall
                isOpen={chooseStates[index]}
                onChange={isOpen => {
                  setChooseStates(prev => {
                    const newChooseStates = [...prev]
                    newChooseStates[index] = isOpen
                    return newChooseStates
                  })
                }}
              />
              <span className='text-xl'>{project}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
