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
