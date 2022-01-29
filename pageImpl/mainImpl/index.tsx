import styled from "@emotion/styled"
import { ReviewCard } from "./__components__/ReviewCard"
import {
  useContainer,
  useMainRecentContainer,
  useMainReviewContainer,
} from "./__containers__"
import { Subheading02, Title01 } from "@lib/components/Text"
import { RecentCarousel } from "./__components__/RecentCarousel"
import { useEffect, useState } from "react"
import { ToggleButton, ToggleButtonGroup } from "@mui/material/"
import { AppBar } from "@lib/components/Appbar"

import SvgTimetableOn from "@lib/components/Icons/SvgTimetableOn"
import SvgSearchOff from "@lib/components/Icons/SvgSearchOff"
import { useRouter } from "next/router"
import { TagDTO } from "@lib/dto/core/tag"

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
  const router = useRouter()

  const [selectedTag, setSelectedTag] = useState<TagDTO | undefined>(undefined)
  const { recommendationTags } = useContainer()
  const { curationData } = useMainReviewContainer()
  const { recentLectureData } = useMainRecentContainer()

  useEffect(() => {
    setSelectedTag(recommendationTags[0])
  }, [recommendationTags])

  const handleClickRecommendationTag = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    tag?: TagDTO,
  ) => {
    e.preventDefault()
    if (tag) {
      setSelectedTag(tag)
    }
  }

  return (
    <Wrapper>
      <AppBar LeftImage={() => <SvgTimetableOn height={30} width={30} />}>
        <AppBarContent>
          <Title01 style={{ marginLeft: 12 }}>강의평</Title01>
          <SvgSearchOff
            height={30}
            width={30}
            onClick={() => router.push("/search")}
          />
        </AppBarContent>
      </AppBar>

      {recentLectureData ? (
        <RecentCarousel lectureList={recentLectureData} />
      ) : (
        <Subheading02>데이터 로딩 OR 에러</Subheading02>
      )}

      <CategoryPicker>
        <Title01 style={{ marginBottom: 10 }}>교양 강의평 둘러보기</Title01>
        <StyledToggleButtonGroup
          value={selectedTag}
          exclusive
          onChange={handleClickRecommendationTag}
        >
          {recommendationTags.map((it) => (
            <ToggleButton value={it}>{it.name}</ToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <CategoryDetail>{selectedTag?.name}</CategoryDetail>
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

const AppBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 12px;
`

const CategoryPicker = styled.div`
  padding: 20px 20px 0 20px;
  position: sticky;
  top: 45px;
  background-color: white;
  z-index: 50;
`

const CategoryDetail = styled(Subheading02)`
  margin-top: 10px;
  padding-bottom: 10px;
  color: #b3b3b3;
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  margin-top: 6px;

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
    &.Mui-selected :hover {
      border: 1px solid #777777;
      background-color: #777777;
      color: #ffffff;
    }
  }
`
