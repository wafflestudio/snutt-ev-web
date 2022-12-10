import styled from '@emotion/styled';

import { CircularLoader } from '@/components/atoms/CircularLoader';

export const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled(CircularLoader)`
  color: #cccccc;
`;
