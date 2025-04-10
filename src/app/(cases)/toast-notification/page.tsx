'use client'

// https://gitee.com/developeros/videos-online/blob/master/vue-admin/src/utils/message.ts
// https://react.dev/reference/react/useImperativeHandle
import { Button } from '@/components/pkmer-button'
import Message from './showNotification'
export default function ToastNotificationPage() {
  function handleShowNotification() {
    Message.info('Hello World', 'info')
  }

  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <Button onClick={handleShowNotification}>Show Notification</Button>
    </section>
  )
}
