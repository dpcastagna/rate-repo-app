import { useQuery } from '@apollo/client';

import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  // console.log('useSingleRepository: ', data, error, loading, variables);
  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    // console.log('handleFetchMore: ', canFetchMore)
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useSingleRepository;