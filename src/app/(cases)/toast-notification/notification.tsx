import type { Notification as N, NotificationType } from './types'

import { clsx } from 'clsx'
import { Icon } from '@iconify/react'
import Styles from './notice.module.scss'
interface NotificationProps {
  notification: N
  onClose: (key: React.Key) => void
}

const iconObj: Record<
  NotificationType,
  {
    icon: string
    color: string
  }
> = {
  success: {
    icon: 'material-symbols:check-circle-rounded',
    color: '#00c950'
  },
  info: {
    icon: 'material-symbols:info-outline-rounded',
    color: '#2b7fff'
  },
  error: {
    icon: 'codicon:error',
    color: '#fb2c36'
  },
  warning: {
    icon: 'solar:shield-warning-linear',
    color: '#fe9a00'
  }
}

const iconSize = {
  width: 25,
  height: 25
}

const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  const iconHolder = iconObj[notification.type]

  return (
    <li
      className={clsx(
        Styles.ItemTopRight,
        'min-w-[260px] rounded-lg border bg-white p-3 text-black shadow-md',
        notification.type === 'success' && 'border-green-500 shadow-green-500/50',
        notification.type === 'info' && 'border-blue-500 shadow-blue-500/50',
        notification.type === 'error' && 'border-red-500 shadow-red-500/50',
        notification.type === 'warning' && 'border-amber-500 shadow-amber-500/50'
      )}
    >
      {/* logo start*/}
      <div className='flex justify-between'>
        <Icon
          style={{
            color: iconHolder.color
          }}
          icon={iconHolder.icon}
          {...iconSize}
        />

        <Icon
          onClick={() => onClose(notification.id)}
          icon='material-symbols-light:close'
          {...iconSize}
        />
      </div>
      {/* content start */}
      <div className='py-3.5'>{notification.message}</div>
      {/* content end */}
    </li>
  )
}

Notification.displayName = 'Notification'
export default Notification
