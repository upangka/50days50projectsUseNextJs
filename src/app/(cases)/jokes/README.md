1. 基于next.js快速建立接口，注意page.tsx与route.ts是同路径访问的，所以不能在同一个路径下，这样会冲突报错。

```jsx
export async function GET() {
  // 使用 JSON.stringify 美化输出，第二个参数为 null，第三个参数指定缩进空格数

  const target = jokes[getRandomInt(jokes.length)]

  const formattedJson = JSON.stringify(target, null, 2)

  // 返回 JSON 响应
  return new Response(formattedJson, {
    headers: {
      'Content-Type': 'application/json' // 确保响应头标记为 JSON
    }
  })
}
```
