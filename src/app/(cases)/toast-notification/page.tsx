'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/pkmer-button'
import { noop } from '@/utils'

type Notification = {
  id: number
  message: string
}

export default function ToastNotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const countRef = useRef(0)
  function handleShowNotification() {
    const newNotification: Notification = {
      id: countRef.current++,
      message: `[ ${countRef.current} ] This is a notification`
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <Button onClick={handleShowNotification}>Show Notification</Button>
      {/* 提示的容器 */}
      <ul className='fixed right-4 bottom-6 flex flex-col items-center justify-start gap-2 border-1 border-green-500 p-3'>
        {notifications.map(item => (
          <NotificationBox
            key={item.id}
            notification={item}
            onClose={() => setNotifications(prev => prev.filter(it => it.id !== item.id))}
          />
        ))}
      </ul>
    </section>
  )
}

interface NotificationProps {
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
}

const NotificationBox: React.FC<NotificationProps> = ({
  notification,
  duration = 1000,
  onClose = noop
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
