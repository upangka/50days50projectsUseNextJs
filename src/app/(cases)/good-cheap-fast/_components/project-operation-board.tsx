import type { Ref } from 'react'
import { HistoryTerminal } from './history-terminal'
import ToggleBall from '@/components/toggle-ball/toggle-ball'

interface ProjectOperationBoardProps {
  chooseStates: boolean[]
  history: string[]
  projectPriorities: string[]
  ref?: Ref<HTMLUListElement>
  onToggleBallChange: (isOpen: boolean, index: number) => void
}
const ProjectOperationBoard: React.FC<ProjectOperationBoardProps> = ({
  chooseStates,
  history,
  projectPriorities,
  ref,
  onToggleBallChange
}) => {
  return (
    <div className='relative -translate-x-1/2 rounded-lg bg-white p-10 text-black shadow-lg shadow-white'>
      <h1 className='mb-3 text-xl font-bold'>
        甲方の终极难题：
        <br /> 快、好、省，您想放弃哪一个？
      </h1>
      <ul className='flex flex-col items-start justify-start gap-2.5'>
        {projectPriorities.map((project, index) => (
          <li key={index} className='flex items-center gap-2'>
            <ToggleBall
              isOpen={chooseStates[index]}
              onChange={isOpen => {
                onToggleBallChange(isOpen, index)
              }}
            />
            <span className='text-xl'>{project}</span>
          </li>
        ))}
      </ul>

      {/* 操作日志start */}
      {history.length >= 0 && <HistoryTerminal ref={ref} history={history} />}
      {/* 操作日志end */}
    </div>
  )
}

ProjectOperationBoard.displayName = 'ProjectOperationBoard'
export default ProjectOperationBoard
