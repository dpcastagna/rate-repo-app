import { FlatList, View, StyleSheet } from 'react-native';
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


  // console.log(selected);

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

export const RepositoryListContainer = ({ repositories, header, onEndReach }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [sorter, setSorter] = useState('latest');
  const [filter,setFilter] = useState('');
  const variables = sorter === 'latest'
    ? { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: filter }
    : sorter === 'highest'
      ? { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: filter }
      : { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: filter };
  
  const { repositories, fetchMore } = useRepositories({first: 5, ...variables});

  // console.log('repositorylist sorter, filter: ', sorter, filter);

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      header={<RepositoryListHeader setSorter={setSorter} setFilter={setFilter} />}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;