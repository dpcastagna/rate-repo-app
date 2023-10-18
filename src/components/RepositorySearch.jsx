import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const RepositorySearch = ({ setFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500);

  const onChangeSearch = query => setSearchQuery(query);
  setFilter(value);

  console.log('query, debounced text: ', searchQuery, value);

  return (
    <Searchbar
      style={{ marginBottom: 10 }}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default RepositorySearch;