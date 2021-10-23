import { ReviewDTO } from "@lib/dto/review"
import { SearchResultDTO } from "@lib/dto/searchResult"

export function fetchRecentReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "an", name: "최근 리뷰다 a", point: 1 },
          { id: "bn", name: "최근 리뷰다 b", point: 2 },
          { id: "cn", name: "최근 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}

export function fetchMyReviews(): Promise<ReviewDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { id: "am", name: "내 리뷰다 a", point: 1 },
          { id: "bm", name: "내 리뷰다 b", point: 2 },
          { id: "cm", name: "내 리뷰다 c", point: 3 },
        ]),
      3000,
    )
  })
}


export function requestSearch(): Promise<SearchResultDTO[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => 
      // dummy data
        resolve([
          {
            id: "aa",
            subject: "소프트웨어 개발의 원리와 실습",
            department: "컴퓨터공학부",
            grade: "3학년",
            lecturer: "최한결",
            rating: 3.8,
          },
          {
            id: "bb",
            subject: "편집디자인",
            department: "디자인학부(디자인전공)",
            grade: "3학년",
            lecturer: "서정민",
            rating: 2.8,
          },
          {
            id: "cc",
            subject: "데이터사이언티스트를 위한 금융공학",
            department: "데이터사이언스대학원",
            grade: "석사",
            lecturer: "서정록",
            rating: 1.8,
          },
        ]), 
        1000,
    )
  })
}