export type Config = {
  key: React.Key
  [name: string]: any
}

interface ChildrenListProps {
  keys: Config[]
  children: (config: Config) => React.ReactElement
}

const ChildList: React.FC<ChildrenListProps> = ({ keys, children }) => {
  return (
    <div className='flex flex-col gap-3'>
      {keys.map(({ key, ...props }) => children({ key, ...props }))}
    </div>
  )
}

ChildList.displayName = 'ChildList'
export default ChildList
