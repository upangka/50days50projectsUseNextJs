export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type Placement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type NotificationConfig = {
  duration?: number
  message: string
  placement?: Placement
  type: NotificationType
  onClose?: VoidFunction
}

export type Notification = NotificationConfig & {
  id: React.Key
}

export type NotificationsInstance = {
  open: (config: NotificationConfig) => void
}

export type Placements = Partial<Record<Placement, Notification[]>>

export type NotificationMethods = {
  handleShowNotification: (message: string) => void
}
