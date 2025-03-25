'use client'
import { useRouter } from 'next/navigation'

interface SearchInputProps {}
const SearchInput: React.FC<SearchInputProps> = () => {
  const router = useRouter()
  const handleFormSubmit = (formData: FormData) => {
    const username = formData.get('username')
    if (!username) {
      router.push(`/github-profiles`)
    } else {
      router.push(`/github-profiles?username=${username}`)
    }
  }
  return (
    <>
      <form
        action={handleFormSubmit}
        className='w-full items-center justify-center rounded-md px-32'
      >
        <div className='relative w-full'>
          <input
            className='mr-0.5 w-full rounded-md border-2 border-gray-300 px-5 py-2 focus:border-blue-400 focus:outline-none'
            type='text'
            name='username'
            placeholder='搜索Github用户'
          />
          <button className='absolute top-0 right-0 bottom-0 w-[80px] rounded-r-md bg-blue-400 px-5 py-2 hover:border-blue-400 hover:bg-blue-600'>
            搜索
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchInput
