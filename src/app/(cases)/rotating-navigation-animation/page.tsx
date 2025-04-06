import { navList } from './config'
import RotatingNavigationAnimation from '@/components/nav/animation/rotating-navigation-animation'
import { PostDemoA, PostDemoB } from '@/components/post/post-demo'
export default function RotatingNavigationAnimationPage() {
  return (
    <>
      <RotatingNavigationAnimation navList={navList}>
        <section className='m-auto h-screen max-w-[600px] min-w-[600px] p-3 pt-6 text-black'>
          <PostDemoA />
          <PostDemoB />
        </section>
      </RotatingNavigationAnimation>
    </>
  )
}
