import clsx from 'clsx'
import Styles from './border-animated-card.module.scss'

interface BorderAnimatedCardProps extends React.PropsWithChildren {
  /**
   * 边框颜色
   * @default 'green'
   */
  borderColor?: string

  /**
   * 背景颜色
   * @default 'black'
   */
  backgroundColor?: string

  /**
   * 动画持续时间（秒为单位）
   * @default 3
   */
  duration?: number
}

const BorderAnimatedCard: React.FC<BorderAnimatedCardProps> = ({
  children,
  borderColor = 'green',
  backgroundColor = 'black',
  duration = 3
}) => {
  return (
    <div className={clsx(Styles.CardContainer, 'relative w-auto overflow-hidden rounded-md')}>
      <main className={Styles.ContentContainer}>{children}</main>
      {/* 显示边框颜色start */}
      <div
        style={
          {
            backgroundColor: borderColor,
            '--animation-duration': `${duration}s`
          } as React.CSSProperties
        }
        className={clsx(Styles.LineBg, 'absolute top-1/2 left-1/2 -z-20 h-[300%] w-[300%]')}
      ></div>
      {/* 显示边框颜色end */}
      {/* 空隙start */}
      <div
        style={{ backgroundColor: backgroundColor }}
        className='absolute inset-1 -z-10 rounded-md'
      ></div>
      {/* 空隙end */}
    </div>
  )
}

export default BorderAnimatedCard
