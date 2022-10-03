import styled from '@emotion/styled';

import { SearchResultLoading } from '@/lib/components/Miscellaneous/Loading';
import useScrollLoader from '@/lib/hooks/useScrollLoader';

import { MyEvaluationCard, MyEvaluationEmpty, MyEvaluationsAppBar } from './__components__';
import { useMyEvaluations } from './__queries__';

export const MyEvaluationsImpl = () => {
  const { data: evaluationPages, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useMyEvaluations();

  const evaluations = evaluationPages?.pages.flatMap((p) => p.content);
  const isEmpty = evaluations?.length === 0;

  const { loaderRef } = useScrollLoader(fetchNextPage);

  return (
    <Wrapper>
      <MyEvaluationsAppBar totalCount={evaluationPages?.pages[0]?.total_count} />
      {isLoading || !evaluations ? (
        <SearchResultLoading />
      ) : isEmpty ? (
        <StyledMyEvaluationEmpty />
      ) : (
        <>
          {evaluations.map((e) => (
            <MyEvaluationCard key={e.id} evaluation={e} />
          ))}
          {isFetchingNextPage && <SearchResultLoading />}
          {hasNextPage && !isFetchingNextPage && <div ref={loaderRef} />}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const StyledMyEvaluationEmpty = styled(MyEvaluationEmpty)`
  margin-top: calc(50vh - 128px);
`;
