import { useRef, useCallback, useEffect, useImperativeHandle, type Ref } from 'react'
import { clsx } from 'clsx'
import Styles from './item.module.scss'

export type API = {
  cleanUp: (id: React.Key) => void
}

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
  direction?: 'row' | 'column'
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
    divRef.current = divRef.current.filter(it => it.key !== id)
  }, [])

  /**
   * 暴露清理方法
   */
  useImperativeHandle(ref, () => ({
    cleanUp: handleRemove
  }))

  return (
    <ul className='flex w-fit flex-col items-center justify-center overflow-hidden p-3.5'>
      {data.map(item => (
        // list-container
        <li
          style={{
            height: item.visiable ? `${getHeight(item.id)}px` : '0',
            minWidth: `${width}px`
          }}
          className={clsx(
            'relative transition-all duration-500 [:not(:first-child)]:mt-[20px]',
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
              'absolute top-0 left-0 w-fit transition-all duration-700'
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
