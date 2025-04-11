import clsx from 'clsx'
import type { Placement, Notification } from './types'
import { default as NotificationComp } from './notification'

interface NotificationListProps {
  placement: Placement
  notifications: Notification[]
  onNotificationClose: (id: React.Key) => void
}

const NotificationList: React.FC<NotificationListProps> = ({
  placement,
  notifications,
  onNotificationClose
}) => {
  return (
    <ul
      className={clsx(
        'fixed z-[2050] flex flex-col items-center justify-center gap-3 text-xl text-white',
        placement === 'top-right' && 'top-10 right-10',
        placement === 'top-left' && 'top-10 left-10',
        placement === 'bottom-right' && 'right-10 bottom-10',
        placement === 'bottom-left' && 'bottom-10 left-10'
      )}
    >
      {notifications.map(n => (
        <NotificationComp key={n.id} notification={n} onClose={onNotificationClose} />
      ))}
    </ul>
  )
}

NotificationList.displayName = 'NotificationList'
export default NotificationList
