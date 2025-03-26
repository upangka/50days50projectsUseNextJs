1. 这个相对简单，这里完全可以用setTimeout来代替setInterval。而且处理起来还比较简单。结合useEffect依赖的参数变化，不断调用setTimeout

```jsx
const animateText = () => {
  if (timerRef.current)
    return // 防止多次启动
  else if (letterIndex + 1 <= msg.length) {
    // 持续更改当前要展示字符的位置
    timerRef.current = window.setTimeout(() => {
      setLetterIndex(letterIndex + 1)
      timerRef.current = null // 清空定时器引用
    }, timeGap)
  } else {
    // 调用回调函数
    cb()
    // 暂停1分钟后再调用
    timerRef.current = window.setTimeout(() => {
      setLetterIndex(0)
      timerRef.current = null // 清空定时器引用
    }, 1000)
  }
}

useLayoutEffect(() => {
  animateText()
  return () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }
}, [letterIndex, timeGap]) // 依赖 letterIndex，使其更新时重新触发
```
