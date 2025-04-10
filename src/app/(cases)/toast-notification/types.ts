export type Notification = {
  id: number
  message: string
}

export type NotificationMethods = {
  handleShowNotification: (message: string) => void
}
