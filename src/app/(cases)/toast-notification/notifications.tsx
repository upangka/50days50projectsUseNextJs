'use client'
import { useEffect, useState, useRef, useImperativeHandle, type Ref } from 'react'
import { createPortal } from 'react-dom'
import NotificationList from './notification-list'
import { noop } from '@/utils'
import type {
  Notification,
  NotificationConfig,
  Placement,
  NotificationType,
  Placements,
  NotificationMethods,
  NotificationsInstance
} from './types'

interface NotificationsProps {
  ref?: Ref<NotificationsInstance>
}
let unikey = 0
const Notifications: React.FC<NotificationsProps> = ({ ref }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [placements, setPlacements] = useState<Placements>({})
  const [container, setContainer] = useState<HTMLElement | null>(null)

  const open = (config: NotificationConfig) => {
    const notification: Notification = {
      id: `pkmer-notification-${unikey++}`,
      message: config.message,
      placement: config.placement,
      type: config.type,
      duration: config.duration ?? 3000,
      onClose: config.onClose ?? noop
    }
    setNotifications(prev => [notification, ...prev])
  }

  // 暴露的API
  useImperativeHandle(ref, () => {
    return {
      open
    }
  })

  function notificationClose(key: React.Key) {
    const noticeIndex = notifications.findIndex(it => it.id === key)
    if (noticeIndex === -1) return
    const notice = notifications[noticeIndex]!
    setNotifications(prev => prev.filter(it => it.id !== key))
    notice?.onClose && notice.onClose()
  }

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
