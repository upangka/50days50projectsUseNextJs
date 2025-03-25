import Image from 'next/image'
import { getGithubUser, getRepos } from '../actions'
interface UserCardProps {
  username: string
}
export const UserCard: React.FC<UserCardProps> = async ({ username }) => {
  const [githubUser, repos] = await Promise.all([getGithubUser(username), getRepos(username)])
  const name = githubUser.name || githubUser.login || username

  return (
    <>
      <section className='flex w-full items-center justify-start gap-5 rounded-md bg-blue-800 p-10 px-20 text-white shadow-md shadow-blue-500'>
        <div className='flex-1/3'>
          <Image
            className='rounded-full border-4 border-gray-500'
            src={githubUser.avatar_url}
            alt={name}
            width={250}
            height={250}
          />
        </div>
        <div className='flex flex-2/3 flex-col gap-2'>
          <h1 className='text-xl font-bold'>{name}</h1>
          <p className='text-white italic'>{githubUser.bio || 'No bio'}</p>
          <ul className='flex gap-4'>
            <li>
              {githubUser.followers}
              <span className='mx-1 font-bold italic'>Followers</span>
            </li>
            <li>
              {githubUser.following}
              <span className='mx-1 font-bold italic'>Following</span>
            </li>
            <li>
              {githubUser.public_repos}
              <span className='mx-1 font-bold italic'>Repos</span>
            </li>
          </ul>
          <ul className='flex flex-wrap gap-2'>
            {repos.map(repo => (
              <li key={repo.id}>
                <a className='rounded-md bg-gray-200 px-2 py-1 text-gray-700' href={repo.html_url}>
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export const UserCardLoading: React.FC = () => {
  return (
    <>
      <section className='flex w-full items-center justify-start gap-5 rounded-md bg-blue-800 p-10 px-20 text-white shadow-md shadow-blue-500'>
        <p className='flex w-full items-center justify-center text-2xl text-gray-200'>Loading...</p>
      </section>
    </>
  )
}
