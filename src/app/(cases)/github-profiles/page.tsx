'use server'
import type { SearchParams } from '@/types'
import SearchInput from './_components/search-input'
import { UserCard } from './_components/user-card'
interface GithubProfilesProps extends SearchParams {}

const GithubProfiles: React.FC<GithubProfilesProps> = async props => {
  const { username = '' } = await props.searchParams

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='flex w-1/2 flex-col items-center justify-center gap-4'>
        {/* 输入框start */}
        <SearchInput />
        {/* 输入框end */}
        {/* 用户信息start */}
        {!!username && <UserCard username={username} />}
        {/* 用户信息end */}
      </div>
    </section>
  )
}

export default GithubProfiles
