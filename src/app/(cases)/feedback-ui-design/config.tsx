import type { SatisfactionOption } from './types'
/**
 * 用户满意度评价选项配置
 */
export const satisfactionOptions: SatisfactionOption[] = [
  {
    icon: 'ri:emotion-unhappy-fill',
    text: '不满意',
    color: '#fb2c36'
  },
  {
    icon: 'ri:emotion-normal-fill',
    text: '一般',
    color: '#f0b100'
  },
  {
    icon: 'material-symbols:sentiment-satisfied',
    text: '满意',
    color: '#00c950'
  }
]
