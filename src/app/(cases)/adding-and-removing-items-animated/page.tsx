'use client'
import { Button } from '@/components/pkmer-button'
import { useState, useRef } from 'react'
import { default as ItemsMove, type API } from './items-move'
import clsx from 'clsx'
import ToggleBall from '@/components/toggle-ball/toggle-ball'
type Item = {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 内容
   */
  content: React.ReactElement | string
  /**
   * 主要用于逻辑删除
   */
  visiable: boolean
}

const bgColors = ['#1e3a8a', '#581c87', '#14532d', '#7c2d12']

let unikey = 0
let idPrefix = 'item-'
function initItems(): Item[] {
  return []
}

type Direction = 'row' | 'column'

export default function AddingAndRemovingItemsAnimatedPage() {
  const [direction, setDirection] = useState<Direction>('column')
  const [items, setItems] = useState<Item[]>(initItems)
  const itemListRef = useRef<API>(null)

  /**
   * 清除全部
   */
  async function clear() {
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i]
      // 间隔300ms进行删除
      setTimeout(
        () => {
          removeItem(it.id)
        },
        300 * (items.length - 1 - i)
      )
    }
  }

  /**
   * 新增
   */
  function addItem() {
    console.log(unikey)
    const id = `${idPrefix}${unikey++}`
    const content = (
      <div
        onClick={() => removeItem(id)}
        style={{
          backgroundColor: bgColors[unikey % bgColors.length]
        }}
        className='mx-auto w-[300px] cursor-pointer rounded-md border border-white px-3 py-6 text-center text-lg select-none'
      >{`Item ${unikey}`}</div>
    )

    const newItem = {
      id,
      content,
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

  /**
   * 删除指定的item
   */
  function removeItem(id: React.Key) {
    setItems(prevItems => {
      return prevItems.filter(item => {
        if (item.id === id) {
          // 逻辑删除
          item.visiable = false
        }
        return item
      })
    })

    // 2秒之后真实删除节点，主要是等待动画完成
    setTimeout(() => {
      // 真实删除节点
      setItems(prevItems => {
        return prevItems.filter(item => item.id !== id)
      })
      // 同时清理内部维护的dom ref节点
      itemListRef.current?.cleanUp(id)
    }, 2000)
  }

  return (
    <section className='relative flex h-screen w-screen items-center justify-center gap-3'>
      {/* items start */}
      <ItemsMove ref={itemListRef} width={350} data={items} direction={direction}>
        {item => <>{item.content}</>}
      </ItemsMove>
      {/* items end */}

      {/* 控制面板 start */}
      <section className='absolute right-20 bottom-20 flex flex-col items-start justify-center gap-3'>
        <Button onClick={addItem}>Add Items</Button>
        <Button onClick={clear}>Clear</Button>
        <div>
          <ToggleBall
            isOpen={direction === 'row'}
            bgColorClose='#f0b100'
            bgColorOpen='green'
            onChange={() => setDirection(prev => (prev === 'row' ? 'column' : 'row'))}
          />
        </div>
        <div>
          Current Style:{' '}
          <span
            className={clsx(
              'text-xl font-bold italic',
              direction === 'row' ? 'text-green-500' : 'text-yellow-500'
            )}
          >
            {direction}
          </span>
        </div>
      </section>
      {/* 控制面板 end */}
    </section>
  )
}
