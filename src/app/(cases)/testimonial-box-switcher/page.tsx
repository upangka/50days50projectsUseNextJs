'use client'
import { ZCOOL_KuaiLe } from 'next/font/google'

import Image from 'next/image'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import TestimonialBoxSwitherStyle from './testimonial-box-switcher.module.scss'
import { testimonials, type Testimonial } from './data'

const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})
export default function TestimonialBoxSwitcher() {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0)

  const currentTestimonial: Testimonial = testimonials[currentActiveIndex]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentActiveIndex(prev => (prev + 1) % testimonials.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-[768px] flex-col gap-3 rounded-2xl bg-green-500 px-2 py-10 text-white shadow-md shadow-green-400/50'>
        {/* progress bar start */}
        <div
          className={clsx(
            TestimonialBoxSwitherStyle.ProgressBar,
            'my-2.5 h-[5px] w-full rounded-2xl bg-white'
          )}
        ></div>
        {/* progress bar end */}
        <p className={`flex-1 px-3 text-xl ${zcoolKuaiLe.className}`}>
          {/* <Icon icon='pixel:quote-left-solid' width={50} height={50} /> */}
          {currentTestimonial.text}
        </p>
        <div className='flex items-center justify-center gap-4'>
          <Image
            className='rounded-full'
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
            <p className={`text-md text-gray-200 ${zcoolKuaiLe.className}`}>
              {currentTestimonial.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
