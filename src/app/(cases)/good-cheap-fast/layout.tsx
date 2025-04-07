import clsx from 'clsx'
import { ZCOOL_KuaiLe } from 'next/font/google'
const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})

export default function GoodCheapFastLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <section
      className={clsx(
        zcoolKuaiLe.className,
        'flex h-screen w-screen flex-col items-center justify-center gap-10'
      )}
    >
      {children}
    </section>
  )
}
