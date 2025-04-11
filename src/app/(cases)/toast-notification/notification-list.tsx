import clsx from 'clsx'
import type { Placement, Notification } from './types'
interface NotificationListProps {
  placement: Placement
  notifications: Notification[]
}

const NotificationList: React.FC<NotificationListProps> = ({ placement, notifications }) => {
  return (
    <ul
      className={clsx(
        'fixed z-20 flex flex-col items-center justify-center gap-3 text-xl text-white',
        placement === 'top-right' && 'top-10 right-10',
        placement === 'top-left' && 'top-10 left-10',
        placement === 'bottom-right' && 'right-10 bottom-10',
        placement === 'bottom-left' && 'bottom-10 left-10'
      )}
    >
      {notifications.map(n => (
        <li
          key={n.id}
          className={clsx(
            'rounded-lg border p-3',
            n.type === 'success' && 'border-green-500',
            n.type === 'info' && 'border-blue-500',
            n.type === 'error' && 'border-red-500',
            n.type === 'warning' && 'border-amber-500'
          )}
        >
          {n.message}
        </li>
      ))}
    </ul>
  )
}

NotificationList.displayName = 'NotificationList'
export default NotificationList
