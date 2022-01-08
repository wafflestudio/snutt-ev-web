interface Props {
  gradeSatisfaction: number // int 1~5
  lifeBalance: number // int 1~5
  gains: number // int 1~5
  teachingSkill: number // int 1~5
  height: number
  width: number
}

export const RatingGraph = ({
  gradeSatisfaction,
  lifeBalance,
  gains,
  teachingSkill,
  height,
  width,
}: Props) => {
  const xMid = width / 2
  const yMid = height / 2

  const gradeSatisfactionY = yMid - gradeSatisfaction * (yMid / 5)
  const lifeBalanceX = xMid + lifeBalance * (xMid / 5)
  const gainsY = yMid + gains * (yMid / 5)
  const teachingSkillX = xMid - teachingSkill * (xMid / 5)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${height} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M ${teachingSkillX} ${yMid} L ${xMid} ${gradeSatisfactionY} L ${lifeBalanceX} ${yMid} L ${xMid} ${gainsY} L ${teachingSkillX} ${yMid} Z`}
        fill="#1BD0C8"
        fillOpacity="0.4"
        stroke="#1BD0C8"
      />
    </svg>
  )
}
