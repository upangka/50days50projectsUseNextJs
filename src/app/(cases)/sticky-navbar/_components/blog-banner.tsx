import { memo } from 'react'
/**
 * Banner
 */
const BlogBanner: React.FC = memo(() => {
  return (
    <section
      className='relative flex h-screen w-full items-center justify-center'
      style={{
        backgroundImage: "url('/pexels-photo-450035.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 遮罩层开始 */}
      <div className='absolute top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-50'></div>
      <div className='z-40'>
        <h1 className='text-5xl font-bold text-white'>
          You've reached Pkmer's blog <span className='text-yellow-600'>: )</span>
        </h1>
        <p className='py-5 text-center text-white italic'>打铁没样，边打边像 | Happy Coding :)</p>
      </div>
    </section>
  )
})

export default BlogBanner
