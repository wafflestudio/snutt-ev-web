import styled from "@emotion/styled";
import { useRouter } from "next/router";

import SvgPersonBlack from "@/lib/components/Icons/SvgPersonBlack";
import SvgStarCyan from "@/lib/components/Icons/SvgStarCyan";
import SvgTagBlack from "@/lib/components/Icons/SvgTagBlack";
import { Subheading01 } from "@/lib/components/Text";
import { LectureDTO } from "@/lib/dto/core/lecture";

interface Props {
  content: LectureDTO;
}

export const SearchResultItem: React.FC<Props> = ({ content }) => {
  const router = useRouter();

  const rating = content.evaluation.avg_rating
    ? content.evaluation.avg_rating.toFixed(1)
    : 0;

  return (
    <Wrapper onClick={() => router.push(`/detail?id=${content.id}`)}>
      <ItemTop>
        <SubjectText>{content.title}</SubjectText>
        <Rating>
          <SvgStarCyan height={15} width={15} />
          <RatingText>{rating}</RatingText>
        </Rating>
      </ItemTop>

      <ItemBottom>
        <Icons>
          <SvgTagBlack height={15} width={15} />
          <SvgPersonBlack height={15} width={15} />
        </Icons>
        <Texts>
          <InfoText>
            {content.department}, {content.academic_year}
          </InfoText>
          <LecturerText>{content.instructor}</LecturerText>
        </Texts>
      </ItemBottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 10px;
  padding-bottom: 12px;

  border-bottom: solid 1px rgba(196, 196, 196, 0.3);
`;

const ItemTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;
`;

const ItemBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 12px;
  height: 39px;
`;

const Icons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  padding-top: 1px;
  padding-bottom: 1px;
`;

const Texts = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: space-between;
`;

const SubjectText = styled(Subheading01)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Rating = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 17px;

  align-items: center;
`;

const RatingText = styled(Subheading01)`
  margin-left: 2px;
`;

const InfoText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`;

const LecturerText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;
`;
