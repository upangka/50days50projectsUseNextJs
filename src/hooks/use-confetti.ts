import confetti from 'canvas-confetti'

/**
 * 纸屑庆祝
 * @param particleCount 粒子数量
 * @param numberOfGroups  分组数量
 * @returns
 */
export function useConfetti(particleCount = 50, numberOfGroups = 5) {
  /**
   * 随机获取屏幕窗口的随机坐标
   * @param numPoints
   * @returns
   */
  function getRandomCoordinatesOfWindowsCenter(numPoints: number = 3) {
    const coordinates = []
    const width = window.innerWidth
    const height = window.innerHeight

    // 计算中间区域的范围
    const centerWidth = width / 4 // 中间区域的宽度
    const centerHeight = height / 4 // 中间区域的高度
    const centerXStart = (width - centerWidth) / 2 // 中间区域的起始 X 坐标
    const centerYStart = (height - centerHeight) / 2 // 中间区域的起始 Y 坐标

    for (let i = 0; i < numPoints; i++) {
      // 在中间区域内生成随机坐标
      const x = Math.floor(centerXStart + Math.random() * centerWidth)
      const y = Math.floor(centerYStart + Math.random() * centerHeight)
      coordinates.push({ x, y })
    }

    return coordinates
  }

  /**
   * 展示
   */
  function showConfetti() {
    const randomCoords = getRandomCoordinatesOfWindowsCenter(numberOfGroups) // 获取3个随机坐标
    randomCoords.forEach(({ x, y }) => {
      setTimeout(() => {
        confetti({
          particleCount: particleCount,
          startVelocity: 30, // 初始速度
          spread: 360, // 角度
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight
          }
        })
      }, 100)
    })
  }

  return {
    showConfetti
  }
}
