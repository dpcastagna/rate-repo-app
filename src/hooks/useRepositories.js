import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorter) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables:  sorter === 'latest'
      ? { orderBy: 'CREATED_AT', orderDirection: 'DESC'}
      : sorter === 'highest'
        ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
        : { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
  });
  console.log('useRepositories: ', data, error, loading, sorter);
  
  return { repositories: data?.repositories, loading };
};

export default useRepositories;