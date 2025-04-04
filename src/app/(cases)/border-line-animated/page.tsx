import BorderAnimatedCard from '@/components/card/border-animated-card'
export default function BorderLineAnimatedPage() {
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <BorderAnimatedCard borderColor='red' backgroundColor='blue' duration={1}>
        <button className='rounded-2xl p-6'>内容区域</button>
      </BorderAnimatedCard>
    </section>
  )
}
