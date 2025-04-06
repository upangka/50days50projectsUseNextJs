export function delay(ms: number = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export const mapRange = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number = 0,
  out_max: number = 360
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

/**
 * 将秒数转换为 MM:SS 格式
 * @param totalSeconds 总秒数
 * @returns
 */
export function formatSecondsToMMSS(totalSeconds: number) {
  // 计算分钟和秒数
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // 使用 padStart 确保两位数格式
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
    full: `${formattedMinutes}:${formattedSeconds}`
  }
}
