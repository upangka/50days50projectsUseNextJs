'use client'
import { Button } from '@/components/pkmer-button'
import { useState, useRef, useEffect } from 'react'
import Styles from './item.module.scss'
import clsx from 'clsx'
type Item = {
  id: string
  name: string
  visiable: boolean
  height: number
}
let unikey = 0
let idPrefix = 'item-'
function initItems(): Item[] {
  return [
    {
      id: `${idPrefix}${++unikey}`,
      name: `Item ${unikey}`,
      visiable: true,
      height: 0
    }
  ]
}

export default function AddingAndRemovingItemsAnimatedPage() {
  const [items, setItems] = useState<Item[]>(initItems)
  const divRef = useRef<
    {
      el: HTMLDivElement
      id: string
    }[]
  >([])

  function addItem() {
    console.log(unikey)
    const newItem = {
      id: `${idPrefix}${unikey++}`,
      name: `Item ${unikey}`,
      visiable: false,
      height: 0
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

  useEffect(() => {
    // 判断是否需要更新高度
    const needUpdate = items.some(item => item.height === 0)
    // 设置容器的高度
    if (divRef.current.length && needUpdate) {
      const clone = [...items]
      divRef.current.forEach(item => {
        const target = clone.find(it => it.id === item.id)
        if (target) {
          target.height = item.el.clientHeight
        }
      })

      setItems(clone)
    }
  }, [items])

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <ul>
        {items.map(item => (
          // list-container
          <li
            style={{
              height: `${item.height}px`
            }}
            className='relative cursor-pointer [:not(:first-child)]:mt-10'
            key={item.id}
          >
            {/* list-item */}
            <div
              ref={dom => {
                dom &&
                  divRef.current.push({
                    el: dom,
                    id: item.id
                  })
              }}
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
