import { useMutation } from '@apollo/client';

import { AUTHENTICATE } from '../graphql/mutations';

import { useAuthStorage } from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage;

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    // console.log(username, password);
    const token = await mutate({ variables: {credentials: { username, password }} });
    console.log(authStorage, token);
    return token;
  };

  return [signIn, result];
};

export default useSignIn;