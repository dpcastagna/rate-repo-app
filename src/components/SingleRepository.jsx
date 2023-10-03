import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";

const SingleRepository = () => {
  const id = useParams(id);
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {variables: {id: id}, fetchPolicy: 'cache-and-network',});
  console.log(data, error, loading);

  return <RepositoryItem item={data} />;
}

export default SingleRepository;