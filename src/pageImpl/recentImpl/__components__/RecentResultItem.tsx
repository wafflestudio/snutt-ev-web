import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import SvgPersonBlack from '@/lib/components/atoms/Icons/SvgPersonBlack';
import SvgTagBlack from '@/lib/components/atoms/Icons/SvgTagBlack';
import SvgWrite from '@/lib/components/atoms/Icons/SvgWrite';
import { Subheading01 } from '@/lib/components/atoms/Typography';
import { LatestLectureDTO } from '@/lib/dto/latestLecture';

interface Props {
  className?: string;
  content: LatestLectureDTO;
}

export const RecentLectureItem = ({ content, className }: Props) => {
  const router = useRouter();

  return (
    <Wrapper
      className={className}
      onClick={() => router.push(`/detail?id=${content.id}`)}
      data-testid="recent-lecture-item"
    >
      <ItemTop>
        <SubjectText>{content.title}</SubjectText>
      </ItemTop>

      <ItemBottom>
        <ItemBottomLeft>
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
        </ItemBottomLeft>
        <ItemBottomRight>
          <WriteButton
            data-testid="recent-lecture-write-btn"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/create?id=${content.id}`);
            }}
          >
            <SvgWrite height={30} width={30} />
          </WriteButton>
        </ItemBottomRight>
      </ItemBottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0 12px 0;
  margin: 0 20px 0 20px;
  cursor: pointer;
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
  justify-content: space-between;

  margin-top: 12px;
`;

const ItemBottomLeft = styled.div`
  display: flex;
  height: 39px;
`;

const ItemBottomRight = styled.div``;

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

const InfoText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;

  color: ${({ theme }) => theme.colors.text.default};
`;

const LecturerText = styled.div`
  font-family: AppleSDGothicNeo;
  font-weight: normal;

  font-size: 12px;
  line-height: 16.5px;

  color: ${({ theme }) => theme.colors.text.default};
`;

const WriteButton = styled.button`
  width: 30px;
  height: 30px;
  z-index: 9999;
  background: transparent;
  border: none;
  padding: 0;
`;
