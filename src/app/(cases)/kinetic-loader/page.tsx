'use client'
import KineticLoading from '@/components/loading/kinetic-loading'

export default function KineticLoaderPage() {
  const borderStyles: React.CSSProperties = {
    borderWidth: '50px'
  }
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      {/* 父容器用来居中 */}
      <div className='relative h-[80px] w-[80px] border border-dashed border-red-400'>
        <KineticLoading />
      </div>
    </section>
  )
}
