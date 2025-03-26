import { getJoke } from './actions'
import { Button } from './_components/button'
export default async function JokesPage() {
  const joke = await getJoke()
  console.log(joke)

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='flex w-1/2 flex-col items-center justify-center gap-4 rounded-lg bg-white px-3 py-5 shadow-md shadow-white'>
        <h1 className='text-xl font-bold text-black'>程序员冷笑话</h1>
        <p className='px-11 text-lg text-black'>{joke.joke}</p>
        <Button>下一个</Button>
      </div>
    </section>
  )
}
