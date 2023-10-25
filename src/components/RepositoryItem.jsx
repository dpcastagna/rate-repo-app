import { Image, Pressable, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

import theme from '../theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    // width: 0,
    // flexShrink: 1,
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
    // flexShrink: 1,
    paddingBottom: Constants.statusBarHeight,
  },
  topLeft: {
    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    // paddingRight: Constants.statusBarHeight,
    flex: 1,
    // flexShrink: 1, //prevents text going offscreen
  },
  topRight: {
    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingRight: Constants.statusBarHeight,
    flex: 5,
    // flexShrink: 1, //prevents text going offscreen
  },
  descBox: {
    // display: 'flex',
    // flexDirection: 'row',
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
    // justifyContent: 'start',
    alignContent: 'flex-start',
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    color: '#FFFFFF',
    backgroundColor: theme.colors.primary,
  },
  bottomBox: {
    display: 'flex',
    flexDirection: 'row',
    // paddingBottom: Constants.statusBarHeight,
    justifyContent: 'space-evenly',
  },
  bottomItem: {
    // paddingTop: Constants.statusBarHeight,
    // paddingBottom: Constants.statusBarHeight,
    // paddingLeft: Constants.statusBarHeight,
    // paddingRight: Constants.statusBarHeight,
    // flex: 1,
    // flexShrink: 1, //prevents text going offscreen
    // justifyContent: 'center',
    textAlign: 'center',
  },
});

const ParseItem = (props) => {
  const itemData = props.itemData;
  const itemText = props.itemText;

  if (itemData > 1000) {
    return (
      <View >
        <Text style={styles.bottomItem} fontWeight="bold" fontSize="subheading" >
          {Number.parseFloat(itemData / 1000).toFixed(1)}k
        </Text>
        <Text style={styles.bottomItem}>
          {itemText}
        </Text>
      </View>
    )
  }

  return (
    <View >
      <Text style={styles.bottomItem} fontWeight="bold" fontSize="subheading" >
        {itemData}
      </Text>
      <Text>
        {itemText}
      </Text>
    </View>
  )
}

const RepositoryItem = ({item}) => {
  const navigate = useNavigate();
  // console.log(item);

  const onPressFunction = () => {
    // console.log('RepositoryItem onPressFunction', item?.id);
    navigate(`/${item?.id}`);
  }

  return (
    <View testID="repositoryItem" style={styles.container} >
      <Pressable onPress={onPressFunction} >
        <View style={styles.topBox} >
          <View style={styles.topLeft} >
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.ownerAvatarUrl,
              }} 
            />
          </View>
          <View style={styles.topRight} >
            <Text fontWeight="bold" fontSize="subheading" >
              {item.fullName}{"\n"}
            </Text>
            <Text style={styles.descBox} >
              {item.description}{"\n"}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }} >
              <Text style={styles.langBox}>
                {item.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomBox} >
          <ParseItem itemData={item.stargazersCount} itemText={"Stars"} />
          <ParseItem itemData={item.forksCount} itemText={"Forks"} />
          <ParseItem itemData={item.reviewCount} itemText={"Reviews"} />
          <ParseItem itemData={item.ratingAverage} itemText={"Rating"} />
        </View>
      </Pressable>
    </View>
  );
};

export default RepositoryItem