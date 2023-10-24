import { View, Text, StyleSheet, FlatList } from "react-native"
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';

import useAuthStorage  from '../hooks/useAuthStorage';
import { GET_ME } from '../graphql/queries';

import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    padding: Constants.statusBarHeight * 0.5,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
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

const ReviewItem = ({ item }) => {
  console.log(item);
  const createdAt = item.createdAt.split('T')[0].split('-').reverse().join('.');
  // const id = review.id;
  const rating = item.rating;
  const reponame = item.repository.fullName;
  const text = item.text;
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
  )
}

const MyReviews = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    variables: { "includeReviews": true, },
    fetchPolicy: 'cache-and-network',
  });

  const reviewNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  console.log('MyReviews ME: ', data, reviewNodes);

  if (loading) {
    return <View><Text>Loading...</Text></View>
  }

  return (
    <View style={{ flex: 1 }} >
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem item={item} />}
      />
    </View>
  )
}

export default MyReviews;