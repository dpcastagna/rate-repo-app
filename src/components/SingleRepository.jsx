import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import * as Linking from 'expo-linking';

import theme from "../theme";

const styles = StyleSheet.create({
  linkButton: {
    // display: 'flex',
    // flexDirection: 'column',
    // flex: 1,
    // width: 500,
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
    // display: 'flex',
    // flexDirection: 'column',
  }
});

const RepositoryInfo = ({ data }) => {
  // Repository's information implemented in the previous exercise
  return (
    <View>
      <View>
          <RepositoryItem item={data.repository} />
      </View>
      <View>
        <Pressable onPress={() => Linking.openURL(data.repository.url)}>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>
              Open in GitHub
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
};

const ReviewItem = ({ review }) => {
  // Single review item
};

const SingleRepository = () => {
  const id = useParams().id;
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {variables: {repositoryId: id}});
  console.log(id, data, error, loading);

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View>
      <View>
          <RepositoryItem item={data.repository} />
      </View>
      <View>
        <Pressable onPress={() => Linking.openURL(data.repository.url)}>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>
              Open in GitHub
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
    // <FlatList
    //   data={reviews}
    //   renderItem={({ item }) => <ReviewItem review={item} />}
    //   keyExtractor={({ id }) => id}
    //   ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    // // ...
    // />
  )
}

export default SingleRepository;