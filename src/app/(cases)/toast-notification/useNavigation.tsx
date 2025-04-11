import { useRef, useMemo } from 'react'
import Notifications from './notifications'
import type { Pretty } from '@/types'
import type { NotificationsInstanceApi, NotificationType, Notification } from './types'

/**
 * 去掉type类型
 */
type NotificationTypeNotInclueType = Pretty<Omit<Notification, 'type'>>
/**
 * 扩展的api success,info,warning,error
 */
type BasicAPI = Record<NotificationType, (notification: NotificationTypeNotInclueType) => void>

// 导出类型API
export type API = Pretty<BasicAPI & NotificationsInstanceApi>

// 导出默认函数useNavigation，返回一个只读的数组，包含NotificationsInstanceApi和React.ReactElement
export default function useNavigation(): readonly [API, React.ReactElement] {
  const notificationRef = useRef<NotificationsInstanceApi>(null)

  const notficationHolder = <Notifications ref={notificationRef} />

  const wrapperApi = useMemo<API>(() => {
    const open = (notification: Notification) => {
      // 可以实时访问到最新的值
      if (notificationRef.current) {
        notificationRef.current.open(notification)
      } else {
        console.error('还正在初始化中')
      }
    }

    const api = {
      open
    } as API

    const keys = ['success', 'info', 'warning', 'error'] as const

    keys.forEach(type => {
      api[type] = (notification: NotificationTypeNotInclueType) =>
        open({
          ...notification,
          type
        })
    })
    return api
  }, [])

  return [wrapperApi, notficationHolder] as const
}
