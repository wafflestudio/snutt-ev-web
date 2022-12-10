import styled from '@emotion/styled';

import SvgFilter from '@/components/atoms/Icons/SvgFilter';
import SvgSearchOff from '@/components/atoms/Icons/SvgSearchOff';
import { AppBar } from '@/components/molecules/AppBar';

interface Props {
  toggleOpenSearchSheet: () => void;
  textQuery: string;
  onChangeTextQuery: (text: string) => void;
  onRefreshQuery: () => void;
}

export const Searchbar = ({ toggleOpenSearchSheet, textQuery, onChangeTextQuery, onRefreshQuery }: Props) => {
  return (
    <AppBar left={<AppBar.BackButton />}>
      <InputBar>
        <SearchButton>
          <SvgSearchOff height={30} width={30} stroke-witdh={1} onClick={onRefreshQuery} />
        </SearchButton>
        <Input
          placeholder="검색어를 입력하세요"
          value={textQuery}
          onChange={(e) => {
            onChangeTextQuery(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === 'Enter' && onRefreshQuery();
          }}
        />
        <TagButton onClick={toggleOpenSearchSheet}>
          <SvgFilter height={30} width={30} />
        </TagButton>
      </InputBar>
    </AppBar>
  );
};

const InputBar = styled.div`
  height: 36px;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg.form};
  border-radius: 6px;
  border-width: 0px;
  margin: 5px 20px 5px 6px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  font-family: AppleSDGothicNeo;
  font-weight: normal;
  font-size: 18px;

  background: transparent;
  border: 0px;
  height: 100%;
  width: 100%;

  margin-left: 8px;
  margin-right: 8px;

  padding: 0 0 0 0;

  color: ${({ theme }) => theme.colors.text.form};
`;

const SearchButton = styled.button`
  background: transparent;
  border-radius: 6px 0px 0px 6px;
  margin-left: 6px;
  padding: 0 0 0 0;
  border: 0;

  display: flex;
  align-items: center;
`;

const TagButton = styled.button`
  background: transparent;
  border-radius: 0px 6px 6px 0px;
  margin-right: 6px;
  border: 0px;
  padding: 0 0 0 0;

  display: flex;
  align-items: center;
`;
