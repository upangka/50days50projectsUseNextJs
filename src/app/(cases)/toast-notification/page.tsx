'use client'

// https://gitee.com/developeros/videos-online/blob/master/vue-admin/src/utils/message.ts
// https://react.dev/reference/react/useImperativeHandle
import { Button } from '@/components/pkmer-button'
import useNavigation from './useNavigation'
export default function ToastNotificationPage() {
  const [api, notificationHolder] = useNavigation()

  // 点击事件处理函数
  function handleClick() {
    api.open({
      message: 'info text',
      duration: 3000,
      type: 'info'
    })

    // api.open({
    //   message: 'success text',
    //   duration: 3000,
    //   type: 'success',
    //   placement: 'bottom-right'
    // })

    // api.open({
    //   message: 'error text',
    //   duration: 3000,
    //   type: 'error'
    // })

    // api.open({
    //   message: 'warning text',
    //   duration: 3000,
    //   type: 'warning',
    //   placement: 'top-left'
    // })
  }
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <Button onClick={handleClick}>Show Notification</Button>
      {notificationHolder}
    </section>
  )
}
