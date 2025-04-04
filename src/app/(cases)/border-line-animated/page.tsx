import BorderAnimatedCard from '@/components/card/border-animated-card'
export default function BorderLineAnimatedPage() {
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <BorderAnimatedCard>
        <button className='p-6'>边框按钮</button>
      </BorderAnimatedCard>
    </section>
  )
}
