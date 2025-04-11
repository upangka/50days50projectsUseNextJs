'use client'

// https://gitee.com/developeros/videos-online/blob/master/vue-admin/src/utils/message.ts
// https://react.dev/reference/react/useImperativeHandle
import { Button } from '@/components/pkmer-button'
import useNavigation from './useNavigation'
export default function ToastNotificationPage() {
  const [api, notificationHolder] = useNavigation()

  // 点击事件处理函数
  function handleClick() {
    api.info({
      message: 'info text',
      placement: 'bottom-right'
    })
  }
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <Button onClick={handleClick}>Show Notification</Button>
      {notificationHolder}
    </section>
  )
}
