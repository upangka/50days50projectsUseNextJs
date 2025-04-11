'use client'
import { Button } from '@/components/pkmer-button'
import { useState } from 'react'
import Styles from './item.module.scss'
import clsx from 'clsx'
type Item = {
  id: string
  name: string
  visiable: boolean
}
let unikey = 0
let idPrefix = 'item-'
function initItems(): Item[] {
  return [
    {
      id: `${idPrefix}${++unikey}`,
      name: `Item ${unikey}`,
      visiable: true
    }
  ]
}

export default function AddingAndRemovingItemsAnimatedPage() {
  const [items, setItems] = useState<Item[]>(initItems)

  function addItem() {
    console.log(unikey)
    const newItem = {
      id: `${idPrefix}${unikey++}`,
      name: `Item ${unikey}`,
      visiable: false
    } satisfies Item

    setItems([newItem, ...items])
    // 触发动画的一个效果
    setTimeout(() => {
      setItems(prevItems => {
        return prevItems.map(item => {
          if (item.id === newItem.id) {
            item.visiable = true
          }
          return item
        })
      })
    }, 15)
  }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <ul>
        {items.map(item => (
          // list-container
          <li
            style={{
              height: '50px'
            }}
            className='relative cursor-pointer [:not(:first-child)]:mt-10'
            key={item.id}
          >
            {/* list-item */}
            <div
              suppressHydrationWarning={true}
              className={clsx(
                Styles.Item,
                item.visiable && Styles.Show,
                'absolute top-0 left-0 rounded-md border border-white p-3 transition-all duration-700'
              )}
            >
              {' '}
              {item.name}
            </div>
          </li>
        ))}
        <li>
          <Button onClick={addItem}>Add Items</Button>
        </li>
      </ul>
    </section>
  )
}
