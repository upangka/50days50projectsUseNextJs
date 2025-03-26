1. 主要是overview的动画显示，通过translateY实现,通过绝对定位进行辅助。

```jsx
 movie.id === currentHoverMovie?.id ? 'translate-y-0' : 'translate-y-full',
```
