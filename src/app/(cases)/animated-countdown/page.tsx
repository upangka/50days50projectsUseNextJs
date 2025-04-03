import AnimatedCountdown from './_components/animated-countdown'
export default function AnimatedCountdownPage() {
  return (
    <section className='flex h-screen items-center justify-center'>
      <AnimatedCountdown count={5} />
    </section>
  )
}
