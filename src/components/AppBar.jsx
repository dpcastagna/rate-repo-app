import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

import { useEffect, useState } from 'react';
import useAuthStorage  from '../hooks/useAuthStorage';
import { useQuery } from '@apollo/client';
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
    // paddingLeft: Constants.statusBarHeight,
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const [token, setToken] = useState('');
  const { data } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
  });
  console.log('AppBar ME: ', data);

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

  console.log('AppBar token: ', token);
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
        <Text>   </Text>
        <Pressable onPress={onPressFunction} >
          <Link to="/signin">
            <Text style={styles.item}>
              Sign In
            </Text>
          </Link>
        </Pressable>
        <Text>   </Text>
      </ScrollView>
    </View>
  )
};

export default AppBar;