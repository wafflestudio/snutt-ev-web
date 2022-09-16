import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

export const SearchResultLoading = () => {
  return (
    <Wrapper>
      <CircularProgress sx={{ color: '#cccccc' }} />
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
