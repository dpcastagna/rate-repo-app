import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, Text, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  linkButton: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  linkText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const SingleRepository = () => {
  const id = useParams().id;
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {variables: {repositoryId: id}});
  console.log(id, data, error, loading);

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <Text>
        <RepositoryItem item={data.repository} />;
        {id
        ? <View style={styles.linkButton}>
            <Text style={styles.linkText}>
              Open in GitHub
            </Text>
          </View>
        : <></>
        }
      </Text>
    </View>
  )
}

export default SingleRepository;