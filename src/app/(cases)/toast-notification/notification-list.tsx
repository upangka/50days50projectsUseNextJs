import clsx from 'clsx'
import { useRef, useImperativeHandle, type Ref } from 'react'
import type { Placement, NotificationConfig } from './types'
import { default as NotificationComp } from './notification'
import { default as ItemsMove, type API } from '@/components/transition/items-move'

export type NotificationListApi = {
  removeNotification: (id: React.Key) => void
}

interface NotificationListProps {
  placement: Placement
  notifications: NotificationConfig[]
  ref: Ref<NotificationListApi>
  onNotificationClose: (id: React.Key) => void
}

const NotificationList: React.FC<NotificationListProps> = ({
  placement,
  notifications,
  ref,
  onNotificationClose
}) => {
  const itemsMoveRef = useRef<API>(null)

  useImperativeHandle(ref, () => {
    return {
      removeNotification(id: React.Key) {
        itemsMoveRef.current?.cleanUp(id)
      }
    }
  })

  return (
    <section
      className={clsx(
        'fixed z-[2050] flex flex-col items-center justify-center gap-3 text-xl text-white',
        placement === 'top-right' && 'top-10 right-2',
        placement === 'top-left' && 'top-10 left-10',
        placement === 'bottom-right' && 'right-10 bottom-10',
        placement === 'bottom-left' && 'bottom-10 left-10'
      )}
    >
      {/* 使用动画效果 */}
      <ItemsMove ref={itemsMoveRef} width={230} data={notifications} direction='row'>
        {config => {
          const noticeConfig = config as NotificationConfig

          return (
            <>
              {/* 具体的class */}
              <NotificationComp notification={noticeConfig} onClose={onNotificationClose}>
                <div className='w-[200px] text-center'>{config.content}</div>
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
