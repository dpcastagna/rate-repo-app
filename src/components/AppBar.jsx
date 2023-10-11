import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

import { useEffect, useState } from 'react';
import useAuthStorage  from '../hooks/useAuthStorage';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#24292e',
    font: theme.fonts.main,
  },
  item: {
    color: '#FFFFFF',
    fontSize: 18,
    // fontWeight: '3000',
    paddingRight: Constants.statusBarHeight,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const [token, setToken] = useState(null);
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });
  // console.log('AppBar ME: ', data);

  const checkToken = async () => {
    const oldToken = await authStorage.getAccessToken();
    if (oldToken !== '') {
      setToken(oldToken);
    }
  };

  useEffect(() => {
    checkToken();
  });

  const onPressFunction = () => {
    console.log('Pressed!');
  };

  const reviewFunction = () => {
    console.log('Pressed review!');
  };

  const signOutFunction = async () => {
    // console.log('signOutFunction');
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  // console.log('AppBar token: ', token);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable onPress={onPressFunction} >
          <Link to="/">
            <Text style={styles.item}>
              Repositories
            </Text>
          </Link>
        </Pressable>
        {data?.me
        ? <View>
            <Pressable onPress={reviewFunction} >
              <Link to="/review">
                <Text style={styles.item}>
                  Create a review
                </Text>
              </Link>
            </Pressable>
          </View>
        : <></>
        }
        {data?.me
        ? <View>
            <Pressable onPress={signOutFunction} >
              <Text style={styles.item}>
                Sign out
              </Text>
            </Pressable>
          </View>
        : <Pressable onPress={onPressFunction} >
            <Link to="/signin">
              <Text style={styles.item}>
                Sign In
              </Text>
            </Link>
          </Pressable>
        }
        {data?.me
        ? <></>
        : <Pressable onPress={onPressFunction} >
            <Link to="/signup">
              <Text style={styles.item}>
                Sign Up
              </Text>
            </Link>
          </Pressable>
        }
      </ScrollView>
    </View>
  )
};

export default AppBar;