'use client'
import { ZCOOL_KuaiLe } from 'next/font/google'
import Image from 'next/image'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import TestimonialBoxSwitherStyle from './testimonial-box-switcher.module.scss'
import { testimonials, type Testimonial } from './data'
import { Icon } from '@iconify/react'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})
// 保持与scss中定义的时间一致
const timerInMs = parseInt(TestimonialBoxSwitherStyle.timer) * 1000

export default function TestimonialBoxSwitcher() {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

  const currentTestimonial: Testimonial = testimonials[currentActiveIndex]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentActiveIndex(prev => (prev + 1) % testimonials.length)
    }, timerInMs)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-[768px] flex-col gap-3 rounded-2xl bg-green-500 px-2 py-10 text-white shadow-lg shadow-green-400/50'>
        {/* progress bar start */}
        <div
          className={clsx(
            TestimonialBoxSwitherStyle.ProgressBar,
            'my-2.5 h-[8px] w-full rounded-2xl bg-white'
          )}
        ></div>
        {/* progress bar end */}
        {/* text start */}
        <p className={`px-3 text-xl ${zcoolKuaiLe.className}`}>
          <Icon
            icon='pixel:quote-left-solid'
            className='mr-2 inline-block -translate-y-2 text-gray-200'
            width={20}
            height={20}
          />
          {currentTestimonial.text}
          <Icon
            icon='pixel:quote-right-solid'
            className='ml-2 inline-block -translate-y-2 text-gray-200'
            width={20}
            height={20}
          />
        </p>
        {/* text end */}
        <div className='flex items-center justify-center gap-4'>
          <Image
            className={clsx('rounded-full', TestimonialBoxSwitherStyle.Image)}
            key={currentActiveIndex}
            src={currentTestimonial.photo}
            width={75}
            height={75}
            alt='profile'
          />
          <div className='flex flex-col justify-start gap-1'>
            <h1 className={`text-lg ${zcoolKuaiLe.className}`}>
              {currentTestimonial.playlistName}
            </h1>
            <p className={`text-md text-gray-100 ${zcoolKuaiLe.className}`}>
              {currentTestimonial.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
