import crypto from 'crypto'

/**
 * @description 生成一个 0 到 max 之间的随机整数
 * @param max 随机数最大值
 * @returns 生成一个 0 到 max 之间的随机整数
 */
export function getRandomInt(max: number): number {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return array[0] % max
  } else {
    // Node.js 环境
    return crypto.randomInt(0, max)
  }
}

/**
 * 打乱数组
 * @param array 数组
 * @returns
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array] // 创建副本以避免修改原数组
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(getRandomInt(i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // 交换元素
  }
  return newArray
}
