import { noop } from '@/utils'
import clsx from 'clsx'
interface ButtonProps extends React.PropsWithChildren {
  onClick?: () => void
  isEnable?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  onClick = noop,
  children,
  isEnable = true,
  className = ''
}) => {
  return (
    <>
      <button
        disabled={!isEnable}
        className={clsx(
          className,
          'rounded-md px-3 py-2 font-bold text-white shadow-2xs transition-all duration-200 select-none',
          isEnable
            ? 'border border-green-400 bg-green-600 shadow-green-300 hover:bg-green-700 hover:shadow-green-400'
            : 'cursor-not-allowed border border-gray-400 bg-gray-600 shadow-gray-300'
        )}
        onClick={() => onClick()}
      >
        {children}
      </button>
    </>
  )
}
