import { createRoot } from 'react-dom/client'
import Notification from './notification'
import type { Notification as NotificationType, NotificationMethods } from './types'
import React, { useRef } from 'react'

let notificationRoot: ReturnType<typeof createRoot> | null = null

const createNotification = () => {
  const notificationRef = useRef<NotificationMethods>(null)
  if (!notificationRoot) {
    const notificationDomNode = document.createElement('div')
    document.body.appendChild(notificationDomNode)

    const root = createRoot(notificationDomNode)
    root.render(<Notification ref={notificationRef} />)
  }

  return {
    info: (message: string, type: string) => {
      console.log('准备添加消息')
      notificationRef.current?.handleShowNotification(message)
    }
  }
}

const Message = createNotification()
type MessageType = ReturnType<typeof createNotification>
export { type MessageType, Message as default }
