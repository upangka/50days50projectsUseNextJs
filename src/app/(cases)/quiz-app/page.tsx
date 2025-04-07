'use client'
import { useMemo, useState } from 'react'
import { type Question, quizData } from './questions'
import Styles from './page.module.scss'
import clsx from 'clsx'

import { ZCOOL_KuaiLe } from 'next/font/google'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})

type Answer = {
  answer: string
  isCorrect: boolean
}

export default function QuizAppPage() {
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)

  const currentQuiz = quizData[currentQuizIndex]
  const isOver = useMemo(() => currentQuizIndex >= quizData.length, [currentQuizIndex])

  return (
    <section
      className={clsx(
        zcoolKuaiLe.className,
        'flex h-screen w-screen items-center justify-center select-none'
      )}
    >
      {isOver ? (
        <OverCard
          answers={answers}
          total={quizData.length}
          onReset={() => {
            setCurrentQuizIndex(0)
            setAnswers([])
          }}
        />
      ) : (
        <QuizCard
          key={currentQuizIndex}
          question={currentQuiz}
          onSubmit={choosed => {
            setAnswers(prev => [
              ...prev,
              { answer: choosed, isCorrect: currentQuiz.correct === choosed }
            ])
            setCurrentQuizIndex(prev => prev + 1)
          }}
        />
      )}
    </section>
  )
}

/**
 * 问题卡片组件
 */

interface QuizCardProps {
  question: Question
  onSubmit: (choosed: string) => void
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onSubmit }) => {
  const [choosed, setChoosed] = useState<string | null>(null)

  return (
    <div className={clsx(Styles.Card, 'rounded-md bg-white')}>
      <div className='p-10 text-black'>
        <h1 className='text-2xl'>{question.question}</h1>
        <ul className='pt-2.5'>
          <RadioOption
            id='a'
            name='answer'
            value='a'
            checked={choosed === 'a'}
            onChange={setChoosed}
            label={question.a}
          />
          <RadioOption
            id='b'
            name='answer'
            value='b'
            checked={choosed === 'b'}
            onChange={setChoosed}
            label={question.b}
          />
          <RadioOption
            id='c'
            name='answer'
            value='c'
            checked={choosed === 'c'}
            onChange={setChoosed}
            label={question.c}
          />
          <RadioOption
            id='d'
            name='answer'
            value='d'
            checked={choosed === 'd'}
            onChange={setChoosed}
            label={question.d}
          />
        </ul>
      </div>
      <button
        disabled={!choosed}
        onClick={() => {
          if (choosed) onSubmit(choosed)
        }}
        className={clsx(
          choosed ? 'cursor-pointer' : 'cursor-not-allowed',
          'w-full rounded-b-md bg-green-500 py-3 text-center text-white hover:bg-green-700'
        )}
      >
        提交
      </button>
    </div>
  )
}

QuizCard.displayName = 'QuizCard'

interface RadioOptionProps {
  id: string
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label: string
}

const RadioOption: React.FC<RadioOptionProps> = ({ id, name, value, checked, onChange, label }) => {
  return (
    <li>
      <label className='flex cursor-pointer items-center'>
        <input
          type='radio'
          id={id}
          name={name}
          value={value}
          onChange={() => onChange(value)}
          checked={checked}
          className='h-[15px] w-[15px]' // 可以在这里应用之前的自定义样式
        />
        <span className='ml-3'>{label}</span>
      </label>
    </li>
  )
}

/**
 * 结束总结组件
 */

interface OverCard {
  answers: Answer[]
  total: number
  onReset: () => void
}

const OverCard: React.FC<OverCard> = ({ onReset, answers, total }) => {
  const corrects = answers.filter(item => item.isCorrect).length

  return (
    <div className={clsx(Styles.Card, 'rounded-md bg-white text-black')}>
      <h1 className='px-16 py-5 text-center text-xl'>
        答对题数：{corrects}/{total}
      </h1>
      <button
        onClick={onReset}
        className={clsx(
          'w-full cursor-pointer bg-green-500 py-3 text-center text-white hover:bg-green-700'
        )}
      >
        重来
      </button>
    </div>
  )
}

OverCard.displayName = 'OverCard'
