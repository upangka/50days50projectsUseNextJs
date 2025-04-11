'use client'
import type { NotificationConfig, NotificationType } from './types'
import { useEffect } from 'react'
import { clsx } from 'clsx'
import { Icon } from '@iconify/react'
import Styles from './notice.module.scss'
import { defaultDuration } from './notifications'

interface NotificationProps extends React.PropsWithChildren {
  notification: NotificationConfig
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

const defaultContent = <div className='bg-green-500 text-white'>Nothing</div>

const Notification: React.FC<NotificationProps> = ({ notification, children, onClose }) => {
  const iconHolder = iconObj[notification.type]

  useEffect(() => {
    if (notification.duration === 0) return
    else {
      const timeoutId = window.setTimeout(() => {
        onClose(notification.id)
      }, notification.duration ?? defaultDuration)

      return () => {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <section
      suppressHydrationWarning={true}
      className={clsx(
        Styles.ItemTopRight,
        'w-fit rounded-lg border bg-white p-3 text-black shadow-lg',
        notification.type === 'success' && 'border-green-500 shadow-green-500/50',
        notification.type === 'info' && 'border-blue-500 shadow-blue-500/50',
        notification.type === 'error' && 'border-red-500 shadow-red-500/50',
        notification.type === 'warning' && 'border-amber-500 shadow-amber-500/50'
      )}
    >
      {/* logo start*/}
      <div className='flex h-[26px] w-full justify-between'>
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
          className='cursor-pointer transition-all duration-300 ease-linear hover:scale-150 hover:text-red-600'
          {...iconSize}
        />
      </div>
      <hr className='m-0.5 w-full text-gray-200' />
      {/* content start */}
      <div>{children ? children : defaultContent}</div>
      {/* content end */}
    </section>
  )
}

Notification.displayName = 'Notification'
export default Notification
