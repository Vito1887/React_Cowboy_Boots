import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, imageUrl, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="84" y="7" rx="0" ry="0" width="8" height="19" />
          <rect x="109" y="45" rx="0" ry="0" width="1" height="9" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="230" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                width={30}
                height={30}
                src={isFavorite ? '/img/star-liked.svg' : '/img/star-unliked.svg'}
                alt="Unliked"
              />
            </div>
          )}
          <img width={133} height={112} src={imageUrl} alt="Boots" />
          <h5>{title}</h5>
          <div className="plusik d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <button className="button" onClick={onClickPlus}>
                <img
                  width={14}
                  height={14}
                  src={isItemAdded(id) ? '/img/checked.svg' : '/img/plus.svg'}
                  alt="Plus"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
