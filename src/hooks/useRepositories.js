import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sorter, filter) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables:  sorter === 'latest'
      ? { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: filter }
      : sorter === 'highest'
        ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: filter }
        : { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: filter }
  });
  console.log('useRepositories: ', data, error, loading, sorter, filter);
  
  return { repositories: data?.repositories, loading };
};

export default useRepositories;