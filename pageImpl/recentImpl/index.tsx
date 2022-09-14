import styled from "@emotion/styled/"
import { AppBar } from "@/lib/components/Appbar"
import SvgArrowBack from "@/lib/components/Icons/SvgArrowBack"
import { Title01, Title02 } from "@/lib/components/Text"
import { useRouter } from "next/router"
import { RecentLectureItem } from "./__components__/RecentResultItem"
import { useMainLatestLectureContainer } from "@/pageImpl/mainImpl/__containers__"
import { SemesterIntToString } from "@/lib/util"
import { Fragment } from "react"

export const RecentImpl = () => {
  const router = useRouter()

  const { recentLectureData } = useMainLatestLectureContainer()

  return (
    <Wrapper>
      <AppBar
        LeftImage={() => (
          <BackButton onClick={() => router.back()}>
            <SvgArrowBack width={30} height={30} />
          </BackButton>
        )}
      >
        <Title01 style={{ marginLeft: 12 }}>최근 강의 목록</Title01>
      </AppBar>
      <RecentLectureList>
        {recentLectureData ? (
          recentLectureData.map((it, i, array) => (
            <Fragment key={it.id}>
              {array[i - 1]?.taken_year + array[i - 1]?.taken_semester ===
              it.taken_year + it.taken_semester ? (
                <></>
              ) : (
                <SemesterDivider>
                  {it.taken_year}년 {SemesterIntToString(it.taken_semester)}학기
                </SemesterDivider>
              )}
              <RecentLectureItem content={it} key={it.id} />
            </Fragment>
          ))
        ) : (
          <Title02>최근 학기에 수강한 강의가 없습니다</Title02>
        )}
      </RecentLectureList>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const BackButton = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  padding: 0;
`

const RecentLectureList = styled.div``

const SemesterDivider = styled(Title01)`
  background-color: rgba(0, 0, 0, 0.03);
  height: 40px;
  padding-left: 20px;
  line-height: 40px;
`
