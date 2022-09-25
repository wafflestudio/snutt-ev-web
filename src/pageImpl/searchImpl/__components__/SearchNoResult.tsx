import styled from '@emotion/styled';

import SvgSearchBig from '@/assets/icons/img_search_big.svg';
import { Title02 } from '@/lib/components/Text';

export const SearchNoResult = () => {
  return (
    <Wrapper>
      <SvgSearchBig />
      <Text style={{ marginTop: 40 }}>검색 결과가 없습니다.</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  margin-top: 25vh;
`;

const Text = styled(Title02)`
  color: rgba(119, 119, 119, 0.7);
`;
