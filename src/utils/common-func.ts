/**
 * 执行回调函数
 * @param callback 回调函数
 * @returns
 */
export function act(callback: VoidFunction): Promise<void> | void {
  if (callback) {
    return callback()
  }
}
