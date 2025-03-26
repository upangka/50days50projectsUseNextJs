1. 理解next.js流式渲染很好的例子，流式渲染主要式集中再服务端组件，通过客户端组件在浏览器中维护状态。next.js将服务端组件处理成一个独立的模块的来处理，这样能避免每次处理页面都传输整个页面。这主要是在客户端通过router智能路由来请求服务端组件。

2. 同时为了提供用户的体验，能够快速看到页面。结合Suspense + 自定义Loading组件（或者骨架效果）能够用户知道数据在处理中。

3. 服务端组件能够接收路由参数以及query参数。

```tsx
const GithubProfiles: React.FC<GithubProfilesProps> = async props => {
  const { username = '' } = await props.searchParams

  return (
    <section className='flex h-screen w-screen flex-col items-center justify-center'>
      <div className='flex w-1/2 flex-col items-center justify-center gap-4'>
        {/* 输入框start */}
        <SearchInput />
        {/* 输入框end */}
        {/* 用户信息start */}
        {!!username && (
          <Suspense key={username} fallback={<UserCardLoading />}>
            <UserCard username={username} />
          </Suspense>
        )}
        {/* 用户信息end */}
      </div>
    </section>
  )
}
```
