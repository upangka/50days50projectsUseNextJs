import HoverBoard from '@/components/hoverboard/hoverborder'

const hoverColors = [
  '#DAE56D',
  '#CF81E4',
  '#455A65',
  '#8E7816',
  '#526C32',
  '#EEB010',
  '#BBCB23',
  '#98AEB8',
  '#65D397',
  '#681A7C',
  '#3B9740',
  '#EC417B',
  '#8D2100',
  '#FFA92C',
  '#49CB85',
  '#FFA726',
  '#FF7C53',
  '#13B6EC',
  '#E3165B',
  '#BD9C90',
  '#755246',
  '#7A5649',
  '#0966AF',
  '#5399C0',
  '#4F97BE',
  '#FF7145',
  '#D81557',
  '#A1770B',
  '#EAD57B',
  '#5B7837',
  '#3D00E9',
  '#8822A3',
  '#EA8534',
  '#C044D5',
  '#E7D06B',
  '#C95FDB',
  '#5EB3F6',
  '#8FA7B2',
  '#0D82A8',
  '#38FFEC',
  '#EFA163',
  '#4C95BD',
  '#EDAF10',
  '#096AB7',
  '#AD5611',
  '#6E3AFF',
  '#D38CB9',
  '#00E4CF',
  '#AE6700',
  '#9A3B77'
]

export default function HoverBoardPage() {
  return (
    <section className='flex h-screen w-full items-center justify-center'>
      <div className='max-w-[1024px] min-w-[1024px] rounded-lg border-4 border-green-600/50 p-4 pr-3 shadow-lg shadow-green-600/50'>
        <HoverBoard count={570} hoverColors={hoverColors} size={22} hoverColorDuration={1} />
      </div>
    </section>
  )
}
