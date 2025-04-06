/**
 * 安全处理输入框焦点切换
 *
 * 使用 setTimeout 延迟执行 focus() 是为了解决浏览器和 React 的潜在问题：
 * 1. **避免输入冲突** - 防止立即切换焦点干扰当前键盘事件的正常处理流程
 * 2. **确保渲染完成** - 等待 React 状态更新后的 DOM 渲染周期完成
 * 3. **跨浏览器一致性** - 解决某些浏览器中直接调用 focus() 可能导致的光标异常问题
 *
 * @param element 待聚焦的输入框元素（可选）
 *
 * @example
 * handleFocus(nextInputRef.current) // 安全地将焦点移至下一个输入框
 *
 * @note 10ms 延迟是经验值：
 * - 足够让浏览器完成当前输入处理
 * - 远低于人类感知延迟阈值（约100ms）
 * - 在大多数设备上可保证可靠执行
 */
export const handleSafeFocus = (element?: HTMLInputElement) => {
  if (element) {
    setTimeout(() => {
      element.focus()
    }, 10)
  }
}

/**
 * 安全处理输入框失焦操作
 *
 * 使用 setTimeout 延迟执行 blur() 是为了解决浏览器和 React 的潜在问题：
 * 1. **避免状态冲突** - 防止在React状态更新完成前意外移除焦点
 * 2. **确保事件完成** - 保证当前交互事件（如点击/键盘事件）完全处理完毕
 * 3. **动画兼容性** - 允许焦点相关动画（如:focus-visible样式）正常完成
 *
 * @param element 待失焦的输入框元素（可选）
 *
 * @example
 * handleSafeBlur(currentInputRef.current) // 安全移除当前输入框焦点
 *
 * @note 10ms延迟的合理性：
 * - 现代浏览器通常需要3-5ms完成事件冒泡
 * - 保留额外时间应对低性能设备
 * - 与handleSafeFocus保持对称实现
 *
 * @see handleSafeFocus 配套的焦点处理方法
 */
export const handleSafeBlur = (element?: HTMLInputElement) => {
  if (element) {
    setTimeout(() => {
      element.blur()
    }, 15)
  }
}
