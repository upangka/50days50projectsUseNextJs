import { memo } from 'react'
import clsx from 'clsx'
import type { User } from '../types'
interface UserProps {
  user: User
}

const User: React.FC<UserProps> = memo(({ user }) => {
  return (
    <>
      <li
        key={user.login.uuid}
        className={clsx(
          'transition-duration-300 flex items-center gap-4 border-b border-gray-400 p-2 transition-all last:border-b-0 hover:bg-gray-100'
        )}
      >
        <img
          src={user.picture.large}
          alt={user.name.first}
          className='h-[50px] w-[50px] rounded-full object-cover'
        />
        <div className='flex flex-col items-center justify-center gap-1'>
          <h1 className='text-md w-full font-bold'>
            {user.name.first} {user.name.last}
          </h1>
          <p className='w-full text-sm text-gray-600'>
            {user.location.city}, {user.location.country}
          </p>
        </div>
      </li>
    </>
  )
})

User.displayName = 'Live User Filter User' // for debugging purposes

export default User
