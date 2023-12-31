import { useMutation, /* useApolloClient */ } from '@apollo/client';

// import useAuthStorage  from '../hooks/useAuthStorage';

import { CREATEREVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  // const authStorage = useAuthStorage();
  // const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATEREVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments
    // console.log(ownerName, repositoryName, rating, text);
    const repository = await mutate({ variables: {review: { ownerName, repositoryName, rating, text }} });
    // console.log(authStorage, token.data.authenticate.accessToken);

    // await authStorage.setAccessToken(token.data.authenticate.accessToken);
    // apolloClient.resetStore();

    console.log(repository);

    return repository;
  };

  return [createReview, result];
};

export default useCreateReview;