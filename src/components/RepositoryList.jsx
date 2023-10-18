import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import RepositorySearch from './RepositorySearch';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.textLightGray,
  },
  picker: {
    padding: 10,
    backgroundColor: theme.colors.textLightGray,
  },
  pickerText: {
    fontSize: 40,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ setSorter, setFilter }) => {
  const [selected, setSelected] = useState('latest');


  console.log(selected);

  return (
    <View style={styles.picker} >
      <RepositorySearch setFilter={setFilter} />
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) =>
          {
            setSelected(itemValue)
            setSorter(itemValue)
          }
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
  const [sorter, setSorter] = useState('latest');
  const [filter,setFilter] = useState('');
  const { repositories } = useRepositories(sorter, filter);

  console.log('repositorylist sorter, filter: ', sorter, filter);

  return <RepositoryListContainer repositories={repositories} header={<RepositoryListHeader setSorter={setSorter} setFilter={setFilter} />} />;
};

export default RepositoryList;