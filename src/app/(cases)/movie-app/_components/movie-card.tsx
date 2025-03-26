import type { Movie } from '../types'

import { IMG_PATH } from '../api-data'
import clsx from 'clsx'
interface MovieCardProps {
  movie: Movie
  currentHoverMovie: Movie | null
  onHover: (movie: Movie | null) => void
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, currentHoverMovie, onHover }) => {
  return (
    <>
      <li
        onMouseEnter={() => onHover(movie)}
        onMouseLeave={() => onHover(null)}
        className='relative flex w-[265px] flex-col items-center justify-center overflow-hidden rounded-lg shadow-md shadow-yellow-500'
      >
        <img
          src={`${IMG_PATH}${movie.poster_path}`}
          alt={movie.title}
          className='h-[380px] w-full object-cover'
        />
        {/* footer start */}
        <div className='flex w-full flex-1 items-center justify-between gap-2 bg-purple-700 px-1 py-3 text-white'>
          <p className='overflow-hidden font-bold text-ellipsis whitespace-nowrap'>{movie.title}</p>
          <div
            className={clsx(
              'rounded-md p-1 text-sm text-white',
              movie.vote_average >= 8 ? 'bg-green-700' : 'bg-red-700'
            )}
          >
            {movie.vote_average}
          </div>
        </div>
        {/* footer end */}

        {/* overview start */}
        <section
          style={{
            transition: 'all 0.3s ease-in-out'
          }}
          className={clsx(
            movie.id === currentHoverMovie?.id ? 'translate-y-0' : 'translate-y-full',
            'absolute right-0 bottom-0 left-0 max-h-4/5 overflow-y-hidden rounded-t-2xl bg-white p-3 text-ellipsis text-black'
          )}
        >
          <h1 className='text-md mb-3.5 font-bold'>Overview</h1>
          <p className='overflow-hidden text-sm break-words text-ellipsis text-gray-600'>
            {movie.overview}
          </p>
        </section>
        {/* overview end */}
      </li>
    </>
  )
}
