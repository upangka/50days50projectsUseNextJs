'use client'
import { useEffect, useState, useRef, useImperativeHandle, type Ref } from 'react'
import { noop } from '@/utils'
import type { Notification, NotificationMethods } from './types'

interface NotificationProps {
  ref: Ref<NotificationMethods>
}

const Notification: React.FC<NotificationProps> = ({ ref }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const countRef = useRef(0)
  // 暴露内部的方法
  useImperativeHandle(ref, () => {
    return {
      handleShowNotification(message: string) {
        const newNotification: Notification = {
          id: countRef.current++,
          message: `[ ${countRef.current} ] ${message}`
        }
        setNotifications(prev => [newNotification, ...prev])
      }
    }
  })

  return (
    <>
      <ul className='fixed right-4 bottom-6 flex flex-col items-center justify-start gap-2 border-1 border-green-500 p-3'>
        {notifications.map(item => (
          <NotificationBox
            key={item.id}
            notification={item}
            onClose={() => setNotifications(prev => prev.filter(it => it.id !== item.id))}
          />
        ))}
      </ul>
    </>
  )
}

interface NotificationBoxProps {
  /**
   * 提示
   */
  notification: Notification
  /**
   * 持续时间
   */
  duration?: number
  /**
   * 关闭
   * @returns
   */
  onClose?: () => void
  //   ref: Ref<HTMLLIElement>
}

const NotificationBox: React.FC<NotificationBoxProps> = ({
  notification,
  duration = 1000,
  onClose = noop
  //   ref
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <li className='w-full rounded-lg px-2.5 py-2.5 text-lg shadow-md shadow-white'>
        {notification.message}
      </li>
    </>
  )
}
Notification.displayName = 'Notification'
NotificationBox.displayName = 'NotificationBox'
export default Notification
