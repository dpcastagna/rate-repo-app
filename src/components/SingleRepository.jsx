import RepositoryItem from "./RepositoryItem";
// import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import useSingleRepository from "../hooks/useSingleRepository";
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
    backgroundColor: theme.colors.textLightGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
  // console.log(repository);
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
      {repository.reviewCount > 0
        ? <ItemSeparator />
        : null
      }
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
  const variables = {
    repositoryId: id,
    first: 5,
  }
  const { repository, loading, fetchMore } = useSingleRepository({
    fetchPolicy: 'cache-and-network',
    ...variables,
  });
  // console.log('singleRepository data: ', repository);
  // const handleFetchMore = () => {
  //   const canFetchMore = !loading && data?.repository.pageInfo.hasNextPage;
  //   // console.log('handleFetchMore: ', canFetchMore)
  //   if (!canFetchMore) {
  //     return [];
  //   }

  //   fetchMore({
  //     variables: {
  //       after: data.repository.pageInfo.endCursor,
  //       ...variables,
  //     },
  //   });
  // };

  const onEndReach = () => {
    // console.log('You have reached the end of the reviews');
    fetchMore();
  };

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  // const repository = data;
  const reviews = repository.reviews.edges.map((edge) => edge.node);
  // console.log(id, data, error, loading, repository, reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository;