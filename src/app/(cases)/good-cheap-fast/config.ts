export type Msg = {
  sum: number
  mark: string
  description: string
}

export const projectPriorities = ['快', '好', '便宜']
/**
 * 对应翻译，sum代表组合的projectPriorities的下表和
 */
export const msgs: Msg[] = [
  {
    sum: 1,
    mark: '快 + 好 → 成本高',
    description: '五星级服务+加急专送？准备好掏空钱包吧！'
  },
  {
    sum: 2,
    mark: '快 + 便宜 → 质量差',
    description: '9块9包邮次日达?拆开一看是 [ 废渣 ] ！'
  },
  {
    sum: 3,
    mark: '好 + 便宜 → 速度慢',
    description: '物美价廉？等货等到海枯石烂……'
  }
]
