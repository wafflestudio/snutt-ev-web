import styled from '@emotion/styled';

import SvgStarSmallEmpty from '../Icons/SvgStarSmallEmpty';
import SvgStarSmallFilled from '../Icons/SvgStarSmallFilled';
import SvgStarSmallHalf from '../Icons/SvgStarSmallHalf';

interface Props {
  rating: number;
  size: number;
}

export const Rating = ({ rating, size }: Props) => {
  const stars = [];

  for (let i = 1; i < 6; i++) {
    if (rating - i > -0.25) {
      stars.push(<SvgStarSmallFilled height={size} width={size} style={{ marginRight: 1 }} key={i} />);
    } else if (rating - i <= -0.25 && rating - i >= -0.75) {
      stars.push(<SvgStarSmallHalf height={size} width={size} style={{ marginRight: 1 }} key={i} />);
    } else {
      stars.push(<SvgStarSmallEmpty height={size} width={size} style={{ marginRight: 1 }} key={i} />);
    }
  }

  return <Wrapper>{stars}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
