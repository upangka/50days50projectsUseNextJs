import { memo } from 'react'
interface HeaderProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputDisabled?: boolean
}

const Header: React.FC<HeaderProps> = memo(({ handleSearch, inputDisabled = false }) => {
  return (
    <header className='bg-green-600 p-5 text-white'>
      <h1 className='text-xl font-bold'>实时用户过滤器</h1>
      <small className='text-sm italic'>按名称和/或位置搜索</small>
      <input
        onInput={handleSearch}
        type='text'
        disabled={inputDisabled}
        placeholder='搜索用户'
        className='mt-2 w-full rounded-lg bg-green-800 px-3 py-2 text-white focus:outline-none'
      />
    </header>
  )
})

Header.displayName = 'Live User Filter Header'

export default Header
