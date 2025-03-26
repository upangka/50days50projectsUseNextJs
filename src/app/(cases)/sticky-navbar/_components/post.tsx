interface PostProps extends React.PropsWithChildren {
  title: string
}

export const Post: React.FC<PostProps> = ({ title, children }) => {
  return (
    <>
      <div className='pt-10'>
        <h1 className='mx-auto mb-6 w-fit border-b-2 border-black pb-2 text-center text-4xl font-bold'>
          {title}
        </h1>
        {/* 内容start 这个居中有点意思*/}
        <div className='mx-auto flex max-w-3xl flex-col gap-4'>{children}</div>
        {/* 内容end */}
      </div>
    </>
  )
}
