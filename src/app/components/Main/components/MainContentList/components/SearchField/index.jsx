import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const SearchField = ({ setSearchFieldData, searchFieldData }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [searchIcon, setSearchIcon] = useState('blackGold');
  const [searchClear, setSearchClear] = useState('blackGold');

  useEffect(() => {
    setSearchIcon(currTheme);
    setSearchClear(currTheme);
  }, [currTheme]);

  const handleSearchChange = (e) => {
    setSearchFieldData(e.target.value);
  };

  return (
    <div className={styles.searchBg}>
      <input
        value={searchFieldData}
        type='text'
        placeholder='搜索游戏'
        onChange={handleSearchChange}
      />
      {searchFieldData.length === 0 ? (
        <img src={require(`src/app/assets/${searchIcon}/main/search-icon.png`)} alt='Search Icon' />
      ) : (
        <img
          src={require(`src/app/assets/${searchClear}/main/search-clear.png`)}
          onClick={() => setSearchFieldData('')}
          alt='Search Clear'
        />
      )}
    </div>
  );
};

export default SearchField;
