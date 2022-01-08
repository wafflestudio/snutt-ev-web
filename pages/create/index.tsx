import React from "react"
import { CreateImpl } from "@pageImpl/createImpl"

// TODO param 넘겨주는 걸로 바꾸기
const sampleLecture = {
  id: "1",
  name: "소프트웨어 개발의 원리와 실습",
  department: "컴퓨터공학부",
  grade: "3학년",
  semester: "2022-2학기",
  lecturer: "최한결",
  location: "301-314",
}

export default function SearchView() {
  return <CreateImpl lecture={sampleLecture} />
}
