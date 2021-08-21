import { ReviewDTO } from "../dto/review"

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
