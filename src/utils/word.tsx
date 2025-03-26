export const originColors = [
  '#3A7B9F',
  '#E1C340',
  '#6D8F42',
  '#B45A12',
  '#9F3D7B',
  '#42C5F0',
  '#8E24AA',
  '#1F6E43',
  '#F0B723',
  '#7C4DFF',
  '#388E3C',
  '#FF5722',
  '#607D8B',
  '#E91E63',
  '#009688',
  '#795548',
  '#CDDC39',
  '#2196F3',
  '#FF9800',
  '#9C27B0'
]

export function toColorsWords(msg: string, colors: string[] = originColors): React.JSX.Element {
  return (
    <>
      {msg.split('').map((letter, index) => {
        return (
          <span
            key={index}
            style={{
              color: colors[index % colors.length]
            }}
          >
            {letter}
          </span>
        )
      })}
    </>
  )
}
