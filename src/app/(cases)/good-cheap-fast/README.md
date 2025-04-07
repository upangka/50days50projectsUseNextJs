css动画结构清楚，动画效果清晰，动画控制清晰

```scss
.ToggleBallContainer {
  .Ball {
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;

    &.ToLeft {
      animation-name: $slide-left;
      @include slide($slide-left);
    }

    &.ToRight {
      animation-name: $slide-right;
      @include slide($slide-right);
    }
  }
}
```

控制动画

```tsx
// 控制动画的开关，避免初始加载就运行动画
const openAnimation = useRef(false)


<div
  style={{
    backgroundColor: ballColor
  }}
  className={clsx(
    openAnimation.current && Styles.Ball, // 控制是否允许动画
    isOpen ? Styles.ToRight : Styles.ToLeft, // 前提是要有Ball父类，控制左移动，右移动动画
    'absolute top-1/2 aspect-square w-2/5 -translate-y-1/2 rounded-full'
  )}
></div>
```
