import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);
  
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // if (data) {
  //   console.log(data.repositories, error, loading);
  //   setRepositories(data.repositories);
  // }
  console.log('useRepositories: ', data, error, loading);

  // const fetchRepositories = async () => {
  //   // setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://10.127.66.126:5000/api/repositories');
  //   const json = await response.json();

  //   // setLoading(false);
  //   setRepositories(data.repositories);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, [data]);
  
  return { repositories: data?.repositories, loading };
};

export default useRepositories;