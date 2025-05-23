import type { Pretty } from '@/types'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type Placement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type Notification = {
  /**
   * 持续时间，默认3000
   * 传入0则不自动关闭
   */
  duration?: number
  message: string
  placement?: Placement
  type: NotificationType
  onClose?: VoidFunction
}

export type NotificationConfig = Pretty<
  {
    id: React.Key
    /**
     * 逻辑删除与显示
     */
    visiable: boolean
    content: React.ReactElement | string
  } & Omit<Notification, 'message'>
>

export type NotificationsInstanceApi = {
  open: (notification: Notification) => void
}

export type Placements = Partial<Record<Placement, NotificationConfig[]>>

export type NotificationMethods = {
  handleShowNotification: (message: string) => void
}
