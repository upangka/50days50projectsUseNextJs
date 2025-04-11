import { useRef, useMemo } from 'react'
import Notifications from './notifications'
import type { NotificationsInstance, NotificationConfig } from './types'
export default function useNavigation(): readonly [NotificationsInstance, React.ReactElement] {
  const notificationRef = useRef<NotificationsInstance>(null)

  const notficationHolder = <Notifications ref={notificationRef} />

  const instanceApi: NotificationsInstance = useMemo(() => {
    const open = (notification: NotificationConfig) => {
      // 可以实时访问到最新的值
      if (notificationRef.current) {
        notificationRef.current.open(notification)
      } else {
        console.error('还正在初始化中')
      }
    }
    return { open }
  }, [])

  return [instanceApi, notficationHolder] as const
}
