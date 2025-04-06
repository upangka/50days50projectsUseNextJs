import type { Ref } from 'react'
import { noop } from '@/utils/debounce'
import clsx from 'clsx'
interface CodeInputProps {
  ref?: Ref<HTMLInputElement>
  value: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const CodeInput: React.FC<CodeInputProps> = ({ ref, value, onKeyDown = noop }) => {
  return (
    <input
      ref={ref}
      onKeyDown={onKeyDown}
      maxLength={1}
      placeholder='0'
      type='text'
      className={clsx(
        value !== '' && 'border-green-400',
        'h-[120px] w-[100px] rounded-lg border-2 text-center text-6xl !outline-none placeholder:text-gray-200/20 focus:border-amber-400'
      )}
    />
  )
}

CodeInput.displayName = 'CodeInput'
export default CodeInput
