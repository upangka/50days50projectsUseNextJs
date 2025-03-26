'use client'
/**
 * 这里用的是国外的api，需要科学上网
 * 所以就在浏览器中请求接口了，不做服务端渲染了
 */
import { useEffect, useState } from 'react'
import { MovieCard } from './_components/movie-card'
import { API_URL, SEARCH_API } from './api-data'
import type { Movie } from './types'
import { debounce } from '@/utils'
export default function MovieApp() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentHoverMovie, setCurrentHoverMovie] = useState<Movie | null>(null)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(API_URL)
      const data = await res.json()
      setMovies(data.results)
    })()
  }, [])

  const handleInputValueChange = debounce(async function handleMovieNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const movieName = e.target.value
    if (!movieName) {
      return
    } else {
      const res = await fetch(`${SEARCH_API}${movieName}`)
      const data = await res.json()
      setMovies(data.results)
    }
  }, 700)

  return (
    <section className='relative flex h-fit w-screen justify-center py-28'>
      <div className='absolute top-3.5 right-20'>
        <input
          onChange={handleInputValueChange}
          type='text'
          placeholder='Search movie'
          className='w-80 rounded-md border border-purple-300 bg-purple-800 p-2 text-white focus:border-2 focus:outline-none'
        />
      </div>
      {movies.length == 0 ? (
        <div className='text-center text-2xl text-purple-500'>暂时没有相关电影资源</div>
      ) : (
        <ul className='flex h-auto max-w-[1180px] min-w-[1180px] flex-wrap items-center justify-start gap-8 overflow-auto'>
          {movies.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                currentHoverMovie={currentHoverMovie}
                onHover={setCurrentHoverMovie}
              />
            )
          })}
        </ul>
      )}
    </section>
  )
}
