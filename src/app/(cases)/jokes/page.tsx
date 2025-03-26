import { getJoke } from './actions'
import { Button } from './_components/button'
export default async function JokesPage() {
  const joke = await getJoke()
  console.log(joke)

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='flex w-1/3 flex-col items-center justify-center gap-6 rounded-lg bg-white px-3 py-5 shadow-md shadow-white'>
        <h1 className='text-md font-bold text-gray-400 italic'>程序员冷笑话</h1>
        <p className='px-11 text-xl text-black'>{joke.joke}</p>
        <Button>下一个</Button>
      </div>
    </section>
  )
}
