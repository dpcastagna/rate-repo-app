import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";

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
  },
  item: {
    color: '#FFFFFF',
    fontSize: 18,
    // fontWeight: '3000',
    // paddingLeft: Constants.statusBarHeight,
  }
});

const onPressFunction = () => {
  console.log('Pressed!');
};

const AppBar = () => {
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