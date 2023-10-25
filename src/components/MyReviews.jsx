import { View, Text, StyleSheet, FlatList, Pressable, Alert } from "react-native"
import { Link } from "react-router-native";
import Constants from 'expo-constants';
// import { useEffect, useState } from 'react';
import { useQuery, useMutation /* useApolloClient */ } from '@apollo/client';
import { DELETE_REVIEW } from "../graphql/mutations";

// import useAuthStorage  from '../hooks/useAuthStorage';
import { GET_ME } from '../graphql/queries';

import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    padding: Constants.statusBarHeight * 0.5,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  reviewTop: {
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
  reviewButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // flexGrow: 1,
    // flexShrink: 1,
    marginTop: 10,
  },
  linkButton: {
    // display: 'flex',
    // flexDirection: 'column',
    flex: 1,
    // width: 500,
    paddingTop: Constants.statusBarHeight * 0.8,
    paddingBottom: Constants.statusBarHeight * 0.8,
    paddingLeft: Constants.statusBarHeight * 1.2,
    paddingRight: Constants.statusBarHeight * 1.2,
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
  deleteButton: {
    // display: 'flex',
    // flexDirection: 'column',
    flex: 1,
    // width: 500,
    paddingTop: Constants.statusBarHeight * 0.8,
    paddingBottom: Constants.statusBarHeight * 0.8,
    paddingLeft: Constants.statusBarHeight * 1.2,
    paddingRight: Constants.statusBarHeight * 1.2,
    margin: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.error,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.textLightGray,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ item, refetch }) => {
  console.log(item);
  const createdAt = item.createdAt.split('T')[0].split('-').reverse().join('.');
  const id = item.id;
  const repositoryId = item.repositoryId;
  const rating = item.rating;
  const reponame = item.repository.fullName;
  const text = item.text;
  const [mutate, result] = useMutation(DELETE_REVIEW);

  // console.log(createdAt, id, rating, username);

  const createTwoButtonAlert = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: async () => {
        console.log('Delete Pressed')
        await mutate({variables: { deleteReviewId: id}})
        refetch()
      }},
    ]);
  
  return (
    <View style={styles.reviewContainer} >
      <View style={styles.reviewTop}> 
        <View style={styles.reviewLeft} >
          <View style={styles.scoreBox} >
            <Text style={styles.scoreText} >
              {rating}
            </Text>
          </View>
        </View>
        <View style={styles.reviewRight} >
          <Text style={styles.reviewName} >
            {reponame}
          </Text>
          <Text style={styles.reviewDate} >
            {createdAt}
          </Text>
          <Text>
            {text}
          </Text>
        </View>
      </View>
      <View style={styles.reviewButtons}>
        <Pressable>
          <Link to={`/${repositoryId}`}>
            <View style={styles.linkButton}>
              <Text style={styles.linkText}>
                View repository
              </Text>
            </View>
          </Link>
        </Pressable>
        <Pressable onPress={createTwoButtonAlert}>
          <View style={styles.deleteButton}>
            <Text style={styles.linkText}>
              Delete review
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const { data, error, loading, refetch } = useQuery(GET_ME, {
    variables: { "includeReviews": true, },
    fetchPolicy: 'cache-and-network',
  });

  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  // console.log('MyReviews ME: ', data, reviewNodes);

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View style={{ flex: 1 }} >
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem item={item} refetch={refetch} />}
      />
    </View>
  )
}

export default MyReviews;