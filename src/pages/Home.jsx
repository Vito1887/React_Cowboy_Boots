import React from 'react';

import Card from '../components/Card';

const Home = ({
  goods,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filtredItems = goods.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-35">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все ковбойские сапоги'}</h1>
        <div className="search-block d-flex align-center">
          <img width={25} height={25} src="img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear remove-btn cu-p"
              width={12}
              height={12}
              src="img/remove2.svg"
              alt="Clear"
            />
          )}
          <input
            maxLength={25}
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск ... "
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
