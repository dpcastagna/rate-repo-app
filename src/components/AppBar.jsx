import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';

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
  }
});

const onPressFunction = () => {
  console.log('Pressed!');
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction} >
        <Text style={styles.item}>
          Repositories
        </Text>
      </Pressable>
    </View>
  )
};

export default AppBar;