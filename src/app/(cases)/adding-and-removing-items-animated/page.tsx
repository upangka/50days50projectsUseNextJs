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
  backgroundColor: string
}

const bgColors = ['#1e3a8a', '#581c87', '#14532d', '#7c2d12']

let unikey = 0
let idPrefix = 'item-'
function initItems(): Item[] {
  return []
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
      height: 0,
      backgroundColor: bgColors[unikey % bgColors.length]
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

  function removeItem(id: string) {
    setItems(prevItems => {
      return prevItems.filter(item => {
        if (item.id === id) {
          item.visiable = false
        }
        return item
      })
    })

    setTimeout(() => {
      divRef.current = divRef.current.filter(item => item.id !== id)
      setItems(prevItems => {
        return prevItems.filter(item => item.id !== id)
      })
    }, 1000)
  }

  useEffect(() => {
    // 判断是否需要更新高度
    const needUpdate = items.some(item => item.height === 0)
    // 设置容器的高度
    if (divRef.current.length && needUpdate) {
      const clone = [...items]
      divRef.current.forEach(item => {
        const target = clone.find(it => it.id === item.id)
        if (target && target.height === 0) {
          target.height = item.el.clientHeight
          console.log(target.height)
        }
      })

      setItems(clone)
    }
  }, [items])

  return (
    <section className='flex h-screen w-screen items-center justify-center gap-3'>
      <ul className='flex w-[300px] flex-col items-center justify-center overflow-hidden border border-red-500 p-3.5'>
        {items.map(item => (
          // list-container
          <li
            onClick={() => removeItem(item.id)}
            style={{
              height: item.visiable ? `${item.height}px` : '0',
              width: '200px'
            }}
            className={clsx(
              'relative cursor-pointer border border-yellow-200 [:not(:first-child)]:mt-[20px]',
              !item.visiable && '!mt-0'
            )}
            key={item.id}
          >
            {/* list-item */}
            <div
              ref={dom => {
                if (dom) {
                  if (divRef.current.find(it => it.id === item.id)) {
                    return
                  } else {
                    divRef.current.push({
                      el: dom,
                      id: item.id
                    })
                  }
                }
              }}
              suppressHydrationWarning={true}
              style={{
                backgroundColor: item.backgroundColor
              }}
              className={clsx(
                Styles.Item,
                item.visiable && Styles.Show,
                'absolute top-0 left-0 w-[200px] rounded-md border border-white p-3 text-white transition-all duration-700'
              )}
            >
              {' '}
              {item.name}
            </div>
          </li>
        ))}
      </ul>
      <Button onClick={addItem}>Add Items</Button>
    </section>
  )
}
