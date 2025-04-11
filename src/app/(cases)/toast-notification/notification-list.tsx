import clsx from 'clsx'
import { useRef, useImperativeHandle, type Ref, useMemo } from 'react'
import type { Placement, NotificationConfig } from './types'
import { default as NotificationComp } from './notification'
import { default as ItemsMove, type API, type Direction } from '@/components/transition/items-move'
import { zcoolKuaiLe } from '@/app/config'

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

  const direction = useMemo<Direction>(
    () => (placement === 'top-left' || placement === 'bottom-left' ? 'row-reverse' : 'row'),
    []
  )

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
      <ItemsMove ref={itemsMoveRef} width={280} data={notifications} direction={direction}>
        {config => {
          const noticeConfig = config as NotificationConfig

          return (
            <>
              {/* 具体的class */}
              <NotificationComp notification={noticeConfig} onClose={onNotificationClose}>
                <div className={clsx('text-md w-[250px] break-words', zcoolKuaiLe.className)}>
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
