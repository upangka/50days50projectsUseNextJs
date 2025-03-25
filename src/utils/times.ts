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
