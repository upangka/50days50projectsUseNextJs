import type { Msg } from '../../config'
interface ProjectMsgPromptProps {
  msg: Msg
}

const ProjectMsgPrompt: React.FC<ProjectMsgPromptProps> = ({ msg }) => {
  return (
    <div className='flex w-fit flex-col items-center justify-center gap-3.5'>
      <h1 className='text-2xl font-bold'>{msg.mark}</h1>
      <p className='text-xl text-green-500'>{msg.description}</p>
    </div>
  )
}
ProjectMsgPrompt.displayName = 'ProjectMsgPrompt'
export default ProjectMsgPrompt
