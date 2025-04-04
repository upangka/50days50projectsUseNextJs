import BorderAnimatedCard from '@/components/card/border-animated-card'
import FeedbackUiDesign from './_components/feedback-ui-design'
export default function FeedbackUiDesignPage() {
  const iconSize = {
    width: 50,
    height: 50
  }
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <BorderAnimatedCard borderColor='orange' backgroundColor='white'>
        <FeedbackUiDesign />
      </BorderAnimatedCard>
    </section>
  )
}
