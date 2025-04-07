'use client'
import ToggleBall from '@/components/toggle-ball/toggle-ball'
export default function GoodCheapFastPage() {
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div>
        <h1>甲方の终极难题：快、好、省，您想放弃哪一个？</h1>
        <ul>
          <li>
            <ToggleBall onChange={isOpen => {}} />
          </li>
        </ul>
      </div>
    </section>
  )
}
