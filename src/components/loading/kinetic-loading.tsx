import clsx from 'clsx'
import LoaderStyles from './kinetic-loader.module.scss'
interface KineticLoadingProps {
  size?: number
  triangleAColor?: string
  triangleBColor?: string
}

const KineticLoading: React.FC<KineticLoadingProps> = ({
  size = 50,
  triangleAColor = '#d08700',
  triangleBColor = '#00a63e'
}) => {
  return (
    <>
      {/* 三角形1 向上 start */}
      <div
        style={{
          borderWidth: `${size}px`,
          borderColor: `${triangleAColor}`,
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent'
        }}
        className={clsx(LoaderStyles.TriangleA, 'absolute top-1/2 left-1/2 h-0 w-0 -translate-1/2')}
      ></div>
      {/* 三角形1 end */}

      {/* 三角形2 向左 start */}
      <div
        style={{
          borderWidth: `${size}px`,
          borderColor: `${triangleBColor}`,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          borderTopColor: 'transparent'
        }}
        className={clsx(LoaderStyles.TriangleB, 'absolute top-1/2 left-1/2 h-0 w-0 -translate-1/2')}
      ></div>
      {/* 三角形2 end */}
    </>
  )
}

export default KineticLoading
