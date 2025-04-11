'use client'
import { Button } from '@/components/pkmer-button'
import { useState } from 'react'

type Item = {
  id: string
  name: string
}
let unikey = 0
let idPrefix = 'item-'
function initItems(): Item[] {
  return [
    {
      id: `${idPrefix}${++unikey}`,
      name: `Item ${unikey}`
    }
  ]
}

export default function AddingAndRemovingItemsAnimatedPage() {
  const [items, setItems] = useState<Item[]>(initItems)

  function addItem() {
    console.log(unikey)
    const newItem = {
      id: `${idPrefix}${unikey++}`,
      name: `Item ${unikey}`
    } satisfies Item

    setItems([newItem, ...items])
  }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <ul>
        {items.map(item => (
          // list-container
          <li
            style={{}}
            className='relative cursor-pointer rounded-lg border border-white p-3 [:not(:first-child)]:mt-10'
            key={item.id}
          >
            {/* list-item */}
            <div className='absolute top-0 left-0 transition-all duration-700'> {item.name}</div>
          </li>
        ))}
        <li>
          <Button onClick={addItem}>Add Items</Button>
        </li>
      </ul>
    </section>
  )
}
