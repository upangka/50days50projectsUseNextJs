import { navList } from '@/data/config'
import Styles from '@/styles/variables.module.scss'
import RotatingNavigationAnimation from '@/components/nav/animation/rotating-navigation-animation'
export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <RotatingNavigationAnimation navList={navList}>
      <section
        style={{
          backgroundColor: Styles.primaryBgColor
        }}
      >
        {children}
      </section>
    </RotatingNavigationAnimation>
  )
}
