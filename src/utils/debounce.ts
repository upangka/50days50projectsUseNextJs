/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param delay 延迟时间(毫秒)
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (this: any, ...args: Parameters<T>): void {
    // 清除之前的定时器
    clearTimeout(timeoutId)

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
