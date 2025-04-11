import clsx from 'clsx'
import { useRef } from 'react'
import type { Placement, NotificationConfig } from './types'
import { default as NotificationComp } from './notification'
import { default as ItemsMove, type API } from '@/components/transition/items-move'
interface NotificationListProps {
  placement: Placement
  notifications: NotificationConfig[]
  onNotificationClose: (id: React.Key) => void
}

const NotificationList: React.FC<NotificationListProps> = ({
  placement,
  notifications,
  onNotificationClose
}) => {
  const itemsMoveRef = useRef<API>(null)

  return (
    <section
      className={clsx(
        'fixed z-[2050] flex flex-col items-center justify-center gap-3 text-xl text-white',
        placement === 'top-right' && 'top-10 right-10',
        placement === 'top-left' && 'top-10 left-10',
        placement === 'bottom-right' && 'right-10 bottom-10',
        placement === 'bottom-left' && 'bottom-10 left-10'
      )}
    >
      {/* 使用动画效果 */}
      <ItemsMove ref={itemsMoveRef} width={350} data={notifications} direction='row'>
        {config => {
          const noticeConfig = config as NotificationConfig

          return (
            <>
              {/* 具体的class */}
              <NotificationComp notification={noticeConfig} onClose={onNotificationClose}>
                <div className='w-[300px] bg-red-500 p-2 text-center text-white'>
                  {config.content}
                </div>
              </NotificationComp>
            </>
          )
        }}
      </ItemsMove>
    </section>
  )
}

NotificationList.displayName = 'NotificationList'
export default NotificationList
