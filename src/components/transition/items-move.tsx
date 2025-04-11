import { useRef, useCallback, useEffect, useImperativeHandle, type Ref, useMemo } from 'react'
import { clsx } from 'clsx'
import Styles from './item.module.scss'

export type API = {
  cleanUp: (id: React.Key) => void
}
/**
 * row 往右边
 * column 往上
 * row-reverse 往左边
 */
export type Direction = 'row' | 'column' | 'row-reverse'

export interface Item {
  /**
   * 唯一标识
   */
  id: React.Key
  visiable: boolean
  [name: string]: any
}

interface ItemsProps {
  /**
   * 数据集
   */
  data: Item[]
  /**
   * 横向还是竖向
   */
  direction?: Direction
  /**
   * 容器宽度
   * 默认300px
   */
  width?: number

  /**
   * 强制引用，需要暴露一个清理方法
   */
  ref: Ref<API>
  /**
   * 要渲染的children
   */
  children: (item: Item) => React.ReactElement
}

const ItemsMove: React.FC<ItemsProps> = ({
  data,
  direction = 'row',
  width = 300,
  ref,
  children
}) => {
  // 收集所有的真实dom节点，用于计算高度
  const divRef = useRef<
    {
      el: HTMLDivElement
      key: React.Key
    }[]
  >([])

  /**
   * 获取item的真实高度
   */
  const getHeight = useCallback((key: React.Key) => {
    const item = divRef.current.find(it => it.key === key)
    if (item) {
      return item.el.clientHeight
    } else {
      return 0
    }
  }, [])

  const handleRemove = useCallback((id: React.Key) => {
    setTimeout(() => {
      console.log('handleRemove执行之前', divRef.current.length)
      divRef.current = divRef.current.filter(it => it.key !== id)
      console.log('handleRemove执行之后', divRef.current.length)
    }, 2000)
  }, [])

  /**
   * 暴露清理方法
   */
  useImperativeHandle(ref, () => ({
    cleanUp: handleRemove
  }))

  // 找到第一个可见的元素
  let firstVisiableIndex = useMemo<number>(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].visiable) {
        return i
      }
    }
    return -1
  }, [data])

  return (
    <ul className='flex w-fit flex-col items-center justify-center overflow-hidden'>
      {data.map((item, index) => (
        // list-container
        <li
          style={{
            height: item.visiable ? `${getHeight(item.id)}px` : '0',
            minWidth: `${width}px`
          }}
          className={clsx(
            'relative transition-all duration-500 [:not(:first-child)]:mt-[20px]',
            !item.visiable && '!mt-0', // 本身不可见了，就取消margin-top
            firstVisiableIndex === index && '!mt-0' // 第一个可见的元素，取消margin-top
          )}
          key={item.id}
        >
          {/* list-item */}
          <div
            ref={dom => {
              if (dom) {
                if (divRef.current.find(it => it.key === item.id)) {
                  return
                } else {
                  divRef.current.push({
                    el: dom,
                    key: item.id
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
              direction === 'row' && Styles.ItemShowRow,
              direction === 'column' && Styles.ItemShowColumn,
              direction === 'row-reverse' && Styles.ItemShowRowReverse,
              item.visiable && Styles.Show,
              'absolute top-0 left-0 w-fit'
            )}
          >
            {/* 用children function 来进行循环渲染 */}
            {children(item)}
          </div>
        </li>
      ))}
    </ul>
  )
}

ItemsMove.displayName = 'ItemsMove'
export default ItemsMove
