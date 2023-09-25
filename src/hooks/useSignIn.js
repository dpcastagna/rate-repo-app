import { useMutation, useApolloClient } from '@apollo/client';

import useAuthStorage  from '../hooks/useAuthStorage';

import { AUTHENTICATE } from '../graphql/mutations';


const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const token = await mutate({ variables: {credentials: { username, password }} });
    console.log(authStorage, token.data.authenticate.accessToken);

    await authStorage.setAccessToken(token.data.authenticate.accessToken);
    apolloClient.resetStore();

    // console.log(authStorage, token.data.authenticate.accessToken);

    return token;
  };

  return [signIn, result];
};

export default useSignIn;