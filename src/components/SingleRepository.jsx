import RepositoryItem from "./RepositoryItem";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import * as Linking from 'expo-linking';

import theme from "../theme";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  reviewContainer: {
    padding: Constants.statusBarHeight * 0.5,
    display: 'flex',
    flexDirection: 'row',
  },
  reviewLeft: {
    flex: 1,
  },
  scoreBox: {
    width: Constants.statusBarHeight * 2.8,
    height: Constants.statusBarHeight * 2.8,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: Constants.statusBarHeight * 1.4,
  },
  scoreText: {
    paddingTop: Constants.statusBarHeight * 0.5,
    color: theme.colors.primary,
    fontSize: 25, //theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    // textAlignVertical: 'center',
  },
  reviewRight: {
    flex: 5,
    paddingLeft: Constants.statusBarHeight,
  },
  reviewName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  reviewDate: {
    color: theme.colors.textSecondary,
    paddingBottom: 5,
  },
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
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textSecondary,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  return (
    <View>
      <View>
          <RepositoryItem item={repository} />
      </View>
      <View>
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>
              Open in GitHub
            </Text>
          </View>
        </Pressable>
      </View>
      <ItemSeparator />
    </View>
  )
};

const ReviewItem = ({ review }) => {
  const createdAt = review.createdAt.split('T')[0].split('-').reverse().join('.');
  // const id = review.id;
  const rating = review.rating;
  const username = review.user.username;
  const text = review.text;
  // console.log(createdAt, id, rating, username);

  return (
    <View style={styles.reviewContainer} >
      <View style={styles.reviewLeft} >
        <View style={styles.scoreBox} >
          <Text style={styles.scoreText} >
            {rating}
          </Text>
        </View>
      </View>
      <View style={styles.reviewRight} >
        <Text style={styles.reviewName} >
          {username}
        </Text>
        <Text style={styles.reviewDate} >
          {createdAt}
        </Text>
        <Text>
          {text}
        </Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  const id = useParams().id;
  const { data, error, loading } = useQuery(GET_SINGLE_REPOSITORY, {variables: {repositoryId: id}});

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  const repository = data.repository;
  const reviews = data.repository.reviews.edges.map((edge) => edge.node);
  console.log(id, data, error, loading, repository, reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository;