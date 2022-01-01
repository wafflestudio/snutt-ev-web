import styled from "@emotion/styled"
import { ReviewCard } from "./__components__/ReviewCard"
import {
  useMainRecentContainer,
  useMainReviewContainer,
} from "./__containers__"
import { Detail, Subheading02, Title02, Tag } from "@lib/components/Text"
import { RecentCarousel } from "./__components__/RecentCarousel"
import { useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "@mui/material/"

enum LectureCategory {
  RECOMMEND,
  FAMOUS,
  HONEY,
  BITTERSWEET,
}

const lectureCategoryText = {
  [LectureCategory.RECOMMEND]: "학우들의 추천 강의",
  [LectureCategory.FAMOUS]: "졸업하기 전에 꼭 한번 들어볼만한 강의",
  [LectureCategory.HONEY]: "수업 부담이 크지 않고, 성적도 잘 주는 강의",
  [LectureCategory.BITTERSWEET]: "공과 시간을 들인 만큼 거두는 것이 많은 강의",
}

export const MainImpl = () => {
  const [lectureCategory, setLectureCategory] = useState(
    LectureCategory.RECOMMEND,
  )

  const onClickCategory = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    category: LectureCategory,
  ) => {
    e.preventDefault()
    if (category !== null) {
      setLectureCategory(category)
    }
  }

  const { curationData } = useMainReviewContainer()
  const { recentLectureData } = useMainRecentContainer()

  return (
    <Wrapper>
      {recentLectureData ? (
        <RecentCarousel lectureList={recentLectureData} />
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}

      <CategoryPicker>
        <Title02 style={{ marginBottom: 10 }}>교양 강의평 둘러보기</Title02>
        <StyledToggleButtonGroup
          value={lectureCategory}
          exclusive
          onChange={onClickCategory}
        >
          <ToggleButton value={LectureCategory.RECOMMEND}>추천</ToggleButton>
          <ToggleButton value={LectureCategory.FAMOUS}>명강</ToggleButton>
          <ToggleButton value={LectureCategory.HONEY}>꿀강</ToggleButton>
          <ToggleButton value={LectureCategory.BITTERSWEET}>
            고진감래
          </ToggleButton>
        </StyledToggleButtonGroup>
        <CategoryDetail>{lectureCategoryText[lectureCategory]}</CategoryDetail>
      </CategoryPicker>

      {curationData ? (
        curationData.map((it) => <ReviewCard review={it} key={it.id} />)
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const CategoryPicker = styled.div`
  padding: 20px 20px 0 20px;
`

const CategoryDetail = styled(Detail)`
  margin-top: 10px;
  color: #b3b3b3;
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  & .MuiToggleButtonGroup-grouped {
    margin-right: 10px;
    border: 0;
    &.Mui-disabled {
      border: 1px solid #777777;
      height: 30px;
    }
    &.Mui-selected {
      border: 1px solid #777777;
      background-color: #777777;
      color: #ffffff;
    }
    &:not(:first-of-type) {
      border: 1px solid #777777;
      border-radius: 15px;
      height: 30px;
    }
    &:first-of-type {
      border: 1px solid #777777;
      border-radius: 15px;
      height: 30px;
    }
  }
`
