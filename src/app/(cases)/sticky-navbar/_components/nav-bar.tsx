import StickNavStyle from '../stick-navbar.module.scss'
import clsx from 'clsx'
/**
 * 导航栏
 */
const NavBar: React.FC<{ isSticky: boolean }> = ({ isSticky }) => {
  return (
    <nav
      style={{
        transition: StickNavStyle.transition
      }}
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 flex items-center justify-around',
        isSticky ? 'bg-white py-3' : 'bg-black py-6'
      )}
    >
      <h1 className='flex items-center gap-1'>
        <span className='text-md text-green-500'>L</span>
        <span
          style={{
            transition: StickNavStyle.transition
          }}
          className={clsx('text-xl font-bold', isSticky && 'text-black')}
        >
          棧深
        </span>
        <span className='text-md text-green-500'>⅂</span>{' '}
      </h1>
      <ul className='flex items-center justify-center gap-4'>
        <li
          className={clsx(
            'cursor-pointerhover:underline',
            isSticky ? 'text-red-700' : 'text-red-400'
          )}
        >
          首页
        </li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>项目</li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>关于</li>
        <li className={clsx('cursor-pointer hover:underline', isSticky && 'text-black')}>联系</li>
      </ul>
    </nav>
  )
}

export default NavBar
