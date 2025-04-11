'use client'
import { useState } from 'react'
import ChildList from './children-list'
import type { Config } from './children-list'
export default function ChildrenFunctionPage() {
  const [data] = useState<Config[]>([
    { key: '1', name: 'React' },
    { key: '2', name: 'Next.js' }
  ])

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center gap-3'>
      <h1>React Children Function</h1>
      <ChildList keys={data}>
        {config => <div className='rounded-lg border border-white p-3'>{config.name}</div>}
      </ChildList>
    </section>
  )
}
