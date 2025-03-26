'use client'
import { useRouter } from 'next/navigation'

interface ButtonProps extends React.PropsWithChildren {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  const router = useRouter()

  function handleClick() {
    router.replace('/jokes')
  }

  return (
    <button
      className='rounded-md bg-blue-500 px-3 py-2 text-white hover:scale-105 hover:bg-blue-700'
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
