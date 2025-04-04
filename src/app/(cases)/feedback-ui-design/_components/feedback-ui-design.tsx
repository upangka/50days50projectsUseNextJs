'use client'
import { Icon } from '@iconify/react'
import Styles from './feedback-ui-design.module.scss'
import { ZCOOL_KuaiLe } from 'next/font/google'
import clsx from 'clsx'
import { useState, memo } from 'react'
import { Button } from '@/components/pkmer-button'
import { satisfactionOptions, type SatisfactionOption } from '../config'

const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400', // 该字体只有一个权重
  subsets: ['latin']
})

interface FeedbackUiDesignProps {
  /**
   * 图标大小
   * @default 50
   */
  iconSize?: number
}

const FeedbackUiDesign: React.FC<FeedbackUiDesignProps> = ({ iconSize = 50 }) => {
  const [selectedOption, setSelectedOption] = useState<number>(-1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleFeedbackSubmit() {
    if (selectedOption !== -1) {
      setIsSubmitted(true)
    }
  }

  return (
    <div
      className={clsx(zcoolKuaiLe.className, 'flex flex-col items-center gap-5 p-10 text-black')}
    >
      {isSubmitted ? (
        // 反馈结果
        <FeedbackResultUi
          selectedOption={satisfactionOptions[selectedOption]}
          iconSize={iconSize}
          back={() => {
            setIsSubmitted(false)
            setSelectedOption(-1)
          }}
        />
      ) : (
        // 用户满意度评价
        <FeedbackUi
          iconSize={iconSize}
          currentSelectedOption={selectedOption}
          onSelectedOption={setSelectedOption}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  )
}

interface FeedbackResultUiProps {
  /**
   * 用户反馈的选项
   */
  selectedOption: SatisfactionOption
  /**
   * 图标大小
   */
  iconSize: number
  /**
   * 返回按钮的回调函数
   */
  back: () => void
}

/**
 * 反馈结果UI组件
 */

const FeedbackResultUi: React.FC<FeedbackResultUiProps> = ({ selectedOption, iconSize, back }) => {
  return (
    <>
      <Icon
        icon='ri:check-fill'
        width={iconSize}
        height={iconSize}
        style={{ color: selectedOption.color }}
      />
      <strong className='text-lg'>感谢您的反馈！</strong>
      <p className='w-full text-center'>
        反馈:{' '}
        <span
          style={{
            color: selectedOption.color
          }}
          className='ml-2.5'
        >
          {selectedOption.text}
        </span>
        <Icon
          style={{ color: selectedOption.color, display: 'inline-block' }}
          icon={selectedOption.icon}
          width={iconSize / 2}
          height={iconSize / 2}
        />
      </p>
      <p>
        接受反馈，帮助
        <a className='text-green-500' href='https://gitee.com/pkmer/50days50projects-use-next-js'>
          Pkmer
        </a>
        做得更好！
      </p>
      <Button onClick={back} className='w-full'>
        再次评价
      </Button>
    </>
  )
}

interface FeedbackUiProps {
  /**
   * 图标大小
   */
  iconSize: number
  /**
   * 当前选中的选项
   */
  currentSelectedOption: number
  /**
   * 选中选项的回调函数
   */
  onSelectedOption: (option: number) => void
  /**
   * 提交反馈的回调函数
   */
  onFeedbackSubmit: () => void
}

/**
 * 用户满意度评价UI组件
 */
const FeedbackUi: React.FC<FeedbackUiProps> = ({
  iconSize,
  currentSelectedOption,
  onSelectedOption,
  onFeedbackSubmit
}) => {
  const size = {
    width: iconSize,
    height: iconSize
  }

  return (
    <>
      <strong className='px-2 py-3 text-center text-lg'>
        您对此次案例
        <br />
        分享的视频观看体验满意度如何？
      </strong>
      <ul className='flex w-full flex-nowrap justify-between gap-10'>
        {satisfactionOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelectedOption(index)}
            className={clsx(Styles.Item, index === currentSelectedOption && Styles.Choose)}
          >
            <Icon icon={option.icon} {...size} style={{ color: option.color }} />
            <small>{option.text}</small>
          </li>
        ))}
      </ul>
      <Button onClick={onFeedbackSubmit} className='w-full' isEnable={currentSelectedOption !== -1}>
        提交反馈
      </Button>
    </>
  )
}

const FeedbackUiDesignMemo = memo(FeedbackUiDesign)
FeedbackUiDesignMemo.displayName = 'FeedbackUiDesign'
FeedbackResultUi.displayName = 'FeedbackResultUi'
FeedbackUi.displayName = 'FeedbackUi'
export default FeedbackUiDesignMemo
