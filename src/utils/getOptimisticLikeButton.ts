export const getOptimisticLikeButton = (
  likeCount: number,
  likeByMe: boolean,
  isMutating: boolean,
): {
  likeCount: number;
  likeByMe: boolean;
} => {
  return isMutating
    ? { likeCount: likeByMe ? likeCount - 1 : likeCount + 1, likeByMe: !likeByMe }
    : { likeCount, likeByMe };
};
