import { useMutation, /* useApolloClient */ } from '@apollo/client';

// import useAuthStorage  from '../hooks/useAuthStorage';

import { CREATEUSER } from '../graphql/mutations';


const useSignUp = () => {
  // const authStorage = useAuthStorage();
  // const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATEUSER);

  const signup = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const user = await mutate({ variables: {user: { username, password }} });
    // console.log(authStorage, token.data.authenticate.accessToken);

    // await authStorage.setAccessToken(token.data.authenticate.accessToken);
    // apolloClient.resetStore();

    // console.log(authStorage, token.data.authenticate.accessToken);

    return user;
  };

  return [signup, result];
};

export default useSignUp;