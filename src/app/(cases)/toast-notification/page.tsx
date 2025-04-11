'use client'

// https://gitee.com/developeros/videos-online/blob/master/vue-admin/src/utils/message.ts
// https://react.dev/reference/react/useImperativeHandle
import { useEffect } from 'react'
import { Button } from '@/components/pkmer-button'
import useNavigation from './useNavigation'
export default function ToastNotificationPage() {
  const [api, notificationHolder] = useNavigation()

  // 点击事件处理函数
  function handleClick() {
    api.error({
      message: '操作失败，请检查网络连接',
      placement: 'bottom-right',
      duration: 2000
    })

    api.warning({
      message: '系统即将维护，请保存数据',
      placement: 'bottom-left',
      duration: 3000
    })

    api.success({
      message: '订单提交成功，正在跳转支付页面',
      placement: 'top-left',
      duration: 2000
    })

    api.info({
      message: '系统更新提示：新增多项实用功能',
      placement: 'top-right',
      duration: 3900
    })
  }

  useEffect(() => {
    api.info({
      message: 'Love React.js And Next.js',
      placement: 'top-right',
      duration: 0
    })
  }, [])
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <Button onClick={handleClick}>Show Notification</Button>
      {notificationHolder}
    </section>
  )
}
