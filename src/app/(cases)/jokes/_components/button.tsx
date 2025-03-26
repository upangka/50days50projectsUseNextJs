'use client'
import { useRouter } from 'next/navigation'

interface ButtonProps extends React.PropsWithChildren {}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  const router = useRouter()

  function handleClick(e: React.SyntheticEvent) {
    e.preventDefault()
    router.replace('/jokes')
  }

  //TODO 通过回车直接下一个笑话
  return (
    <form onSubmit={handleClick}>
      <button className='rounded-md bg-blue-500 px-3 py-2 text-white shadow-md shadow-blue-400 hover:scale-105 hover:bg-blue-700'>
        {children}
      </button>
    </form>
  )
}
