import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { postService } from '../services/post';

export const usePost = () => {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ['postService.getExplorePosts'],
    ({ pageParam = 1, size = 9 }) =>
      postService.getExplorePosts({ page: pageParam, size }).then((res) => res.data),
    {
      getNextPageParam: (lastPage) => {
        const previousPage = lastPage.hasPrevPage ? +lastPage.prevPage : 0;
        const currentPage = previousPage + 1;

        if (currentPage === lastPage.totalPages) return false;
        return currentPage + 1;
      },
    }
  );

  const posts = useMemo(
    () =>
      data?.pages.reduce((prev, page) => {
        return {
          totalDocs: page.totalDocs,
          totalPages: page.totalPages,
          hasNextPage: page.hasNextPage,
          hasPrevPage: page.hasPrevPage,
          docs: [...prev.docs, ...page.docs],
        };
      }),
    [data]
  );

  return {
    error,
    fetchNextPage,
    status,
    hasNextPage,
    posts,
  };
};
