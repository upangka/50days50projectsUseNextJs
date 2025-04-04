import BorderAnimatedCard from '@/components/card/border-animated-card'
import FeedbackUiDesign from './_components/feedback-ui-design'
import AppVariable from '@/styles/variables.module.scss'
export default function FeedbackUiDesignPage() {
  const iconSize = {
    width: 50,
    height: 50
  }
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <BorderAnimatedCard borderColor={AppVariable.primaryColor} backgroundColor='white'>
        <FeedbackUiDesign />
      </BorderAnimatedCard>
    </section>
  )
}
