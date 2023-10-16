import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import { useState, useRef } from 'react';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textLightGray,
  },
  picker: {
    padding: 20,
    backgroundColor: theme.colors.textLightGray,
  },
  pickerText: {
    fontSize: 40,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = () => {
  const [selected, setSelected] = useState('latest');
  
  // const pickerRef = useRef();

  // function open() {
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }

  console.log(selected);

  return (
    <View style={styles.picker} >
      <Picker
        // ref={pickerRef}
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) =>
          setSelected(itemValue)
        }
        prompt="Select an item"
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, header }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={header}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories('CREATED_AT', 'DESC');

  return <RepositoryListContainer repositories={repositories} header={RepositoryListHeader} />;
};

export default RepositoryList;