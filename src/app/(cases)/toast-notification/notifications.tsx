'use client'
import { useEffect, useState, useRef, useImperativeHandle, type Ref } from 'react'
import { createPortal } from 'react-dom'
import { default as NotificationList, type NotificationListApi } from './notification-list'
import { noop } from '@/utils'

import type {
  Notification,
  NotificationConfig,
  Placement,
  NotificationType,
  Placements,
  NotificationMethods,
  NotificationsInstanceApi
} from './types'

interface NotificationsProps {
  ref?: Ref<NotificationsInstanceApi>
}
let unikey = 0

/**
 * 所有通知的管理中心
 */
const Notifications: React.FC<NotificationsProps> = ({ ref }) => {
  const [notifications, setNotifications] = useState<NotificationConfig[]>([])
  const [placements, setPlacements] = useState<Placements>({})
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const notificationListRef = useRef<NotificationListApi>(null)

  /**
   * todo useCallback
   * @param config
   */
  const open = (config: Notification) => {
    const noticeConfig: NotificationConfig = {
      id: `pkmer-notification-${unikey++}`,
      content: config.message,
      placement: config.placement,
      type: config.type,
      duration: config.duration ?? 3000,
      onClose: config.onClose ?? noop,
      visiable: false
    }
    setNotifications(prev => [noticeConfig, ...prev])

    // 触发动画的一个效果
    setTimeout(() => {
      setNotifications(prevItems =>
        prevItems.map(item => {
          if (item.id === noticeConfig.id) {
            item.visiable = true
          }
          return item
        })
      )
    }, 15)
  }

  /**
   * 暴露的API
   */
  useImperativeHandle(ref, () => {
    return {
      open
    }
  })

  function notificationClose(key: React.Key) {
    // 找到目标对象
    const noticeIndex = notifications.findIndex(it => it.id === key)
    if (noticeIndex === -1) return
    const targetNotice = notifications[noticeIndex]!

    // 做逻辑删除
    setNotifications(prev =>
      prev.filter(it => {
        if (it.id === targetNotice.id) {
          it.visiable = false
        }
        return it
      })
    )
    targetNotice?.onClose && targetNotice.onClose()

    // 2s之后逻辑删除后，做物理删除
    setTimeout(() => {
      setNotifications(prev => prev.filter(it => it.id !== key))
      notificationListRef.current?.removeNotification(targetNotice.id)
    }, 2000)
  }

  /**
   * 分组转换成不同的位置
   * 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
   */
  useEffect(() => {
    const nextPlacements: Placements = {}
    let count = 0
    notifications.forEach(notification => {
      const { placement = 'top-right' } = notification
      nextPlacements[placement] = nextPlacements[placement] ?? []
      nextPlacements[placement].push(notification)
      console.log(`执行${++count}次`)
    })
    console.log(nextPlacements)

    setPlacements(nextPlacements)
  }, [notifications])

  useEffect(() => {
    setContainer(window.document.body)
  }, [])

  if (!container) return null

  const allplacesments = Object.keys(placements) as Placement[]
  const content = allplacesments.map(placement => {
    const notificationsOfPlacecment = placements[placement] || []

    return (
      <NotificationList
        key={placement}
        ref={notificationListRef}
        placement={placement}
        notifications={notificationsOfPlacecment}
        onNotificationClose={notificationClose}
      />
    )
  })

  return createPortal(<section>{content}</section>, container)
}

Notifications.displayName = 'Notifications'
export default Notifications

// interface NotificationProps {
//   ref: Ref<NotificationMethods>
// }

// const Notification: React.FC<NotificationProps> = ({ ref }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const countRef = useRef(0)
//   // 暴露内部的方法
//   useImperativeHandle(ref, () => {
//     return {
//       handleShowNotification(message: string) {
//         const newNotification: Notification = {
//           id: countRef.current++,
//           message: `[ ${countRef.current} ] ${message}`
//         }
//         setNotifications(prev => [newNotification, ...prev])
//       }
//     }
//   })

//   return (
//     <>
//       <ul className='fixed right-4 bottom-6 flex flex-col items-center justify-start gap-2 border-1 border-green-500 p-3'>
//         {notifications.map(item => (
//           <NotificationBox
//             key={item.id}
//             notification={item}
//             onClose={() => setNotifications(prev => prev.filter(it => it.id !== item.id))}
//           />
//         ))}
//       </ul>
//     </>
//   )
// }

// interface NotificationBoxProps {
//   /**
//    * 提示
//    */
//   notification: Notification
//   /**
//    * 持续时间
//    */
//   duration?: number
//   /**
//    * 关闭
//    * @returns
//    */
//   onClose?: () => void
//   //   ref: Ref<HTMLLIElement>
// }

// const NotificationBox: React.FC<NotificationBoxProps> = ({
//   notification,
//   duration = 1000,
//   onClose = noop
//   //   ref
// }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose()
//     }, duration)

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <>
//       <li className='w-full rounded-lg px-2.5 py-2.5 text-lg shadow-md shadow-white'>
//         {notification.message}
//       </li>
//     </>
//   )
// }
// Notification.displayName = 'Notification'
// NotificationBox.displayName = 'NotificationBox'
// export default Notification
