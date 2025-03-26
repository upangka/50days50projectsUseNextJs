import { getJoke } from './actions'
import { Button } from './_components/button'
import { Suspense } from 'react'
export default function JokesPage() {
  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='flex w-1/3 flex-col items-center justify-center gap-6 rounded-lg bg-white px-3 py-5 shadow-md shadow-white'>
        <h1 className='text-md font-bold text-gray-400 italic'>程序员冷笑话</h1>
        {/* 为了dev测试这里直接使用了随机数作为key */}
        <Suspense key={Math.random()} fallback={<JokeLoading />}>
          <JokerInfo />
        </Suspense>
        <Button>下一个</Button>
      </div>
    </section>
  )
}

/**
 * 这里单独抽离出来一个服务端组件，主要是为了使用Suspense组件做loading效果。
 * next.js流式传输的体现
 * @returns
 */
const JokerInfo: React.FC = async () => {
  const joke = await getJoke()
  return <p className='w-full px-11 text-center text-xl text-black'>{joke.joke}</p>
}

const JokeLoading: React.FC = () => {
  return (
    <>
      <p className='w-full px-11 text-center text-xl text-gray-500 italic'>Loading ...</p>
    </>
  )
}
