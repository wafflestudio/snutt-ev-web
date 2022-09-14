export function SemesterIntToString(semester: number | undefined) {
  switch (semester) {
    case 1:
      return "1"
    case 2:
      return "여름"
    case 3:
      return "2"
    case 4:
      return "겨울"
    default:
      return ""
  }
}
