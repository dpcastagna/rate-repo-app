import { Image, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    // width: 0,
    // flexGrow: 1,
    // flex: 1,
    backgroundColor: 'white',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  logo: {
    width: 66,
    height: 58,
  },
  topBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  logoBox: {
    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    // paddingRight: Constants.statusBarHeight,
    flex: 1,
    // flexShrink: 1, //prevents text going offscreen
  },
  box: {
    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingRight: Constants.statusBarHeight,
    flex: 5,
    flexShrink: 1, //prevents text going offscreen
  },
  descBox: {
    display: 'flex',
    // flexShrink: 1,
    // flexWrap: 'wrap',
  },
  langBox: {
    display: 'flex',
    // flex: 0,
    // flexGrow: 0,
    // flexShrink: 1,
    // marginEnd: '90%',
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignContent: 'flex-start',
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#FFFFFF',
    backgroundColor: theme.colors.primary,
    
  },
});


const RepositoryItem = ({item}) => {
  // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
  // const color = item.id === selectedId ? 'white' : 'black';

  return (
    // <Item
    //   item={item}
    //   onPress={() => setSelectedId(item.id)}
    //   backgroundColor={backgroundColor}
    //   textColor={color}
    // />
    <View style={styles.container} >
      <View style={styles.topBox} >
        <View style={styles.logoBox} >
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }} 
          />
        </View>
        <View style={styles.box} >
          <Text fontWeight="bold" fontSize="subheading" >
            {item.fullName}{"\n"}
          </Text>
          <Text style={styles.descBox} >
            {item.description}{"\n"}
          </Text>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.langBox}>
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.box} >
        Stars: {item.stargazersCount}{"\n"}
        Forks: {item.forksCount}{"\n"}
        Reviews: {item.reviewCount}{"\n"}
        Rating: {item.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem