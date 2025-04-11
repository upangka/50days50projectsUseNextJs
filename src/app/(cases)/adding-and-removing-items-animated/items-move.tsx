import { useRef, useCallback, useEffect } from 'react'
import { clsx } from 'clsx'
import Styles from './item.module.scss'

export interface Item {
  id: React.Key
  visiable: boolean
  height: number
  [name: string]: any
}

interface ItemsProps {
  data: Item[]
  direction?: 'row' | 'column'
  onRemove: (key: React.Key) => void
  children: (item: Item) => React.ReactElement
}

const ItemsMove: React.FC<ItemsProps> = ({ data, onRemove, direction = 'row', children }) => {
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
    onRemove(id)
    // 2秒之后进行清理,清除不需要在维护的dom节点
    setTimeout(() => {
      divRef.current = divRef.current.filter(it => it.key !== id)
    }, 2000)
  }, [])

  return (
    <ul className='flex w-[300px] flex-col items-center justify-center overflow-hidden p-3.5'>
      {data.map(item => (
        // list-container
        <li
          onClick={() => handleRemove(item.id)}
          style={{
            height: item.visiable ? `${getHeight(item.id)}px` : '0',
            width: '200px'
          }}
          className={clsx(
            'relative cursor-pointer transition-all duration-500 [:not(:first-child)]:mt-[20px]',
            !item.visiable && '!mt-0'
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
              direction === 'row' ? Styles.ItemShowRow : Styles.ItemShowColumn,
              item.visiable && Styles.Show,
              'absolute top-0 left-0 w-[200px] rounded-md border border-white p-3 text-white transition-all duration-700'
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
