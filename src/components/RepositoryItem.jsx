import { Text, Image, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  box: {
    paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingRight: Constants.statusBarHeight,
  },
  bigBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  descBox: {
    flexShrink: 1,
    // flexWrap: 'wrap',
  },
  langBox: {
    display: 'flex',
    flexGrow: 0,
    color: '#FFFFFF',
    backgroundColor: '#0000FF'
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
    <View>
      <View style={styles.bigBox}>
        <View style={styles.box}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }} 
          />
        </View>
        <View style={styles.box}>
          <Text>
            {item.fullName}{"\n"}
          </Text>
          <Text style={styles.descBox}>
            {item.description}{"\n"}
          </Text>
          <Text style={styles.langBox}>
            {item.language}
          </Text>
        </View>
      </View>
      <Text style={styles.box}>
        Stars: {item.stargazersCount}{"\n"}
        Forks: {item.forksCount}{"\n"}
        Reviews: {item.reviewCount}{"\n"}
        Rating: {item.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem