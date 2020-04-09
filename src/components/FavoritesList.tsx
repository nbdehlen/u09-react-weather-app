import React, { ReactNode, useState } from 'react';

export const FavoritesList: React.FC<any> = () => {
  const [btnValue, setBtnValue] = useState('');
  const storageFavorites: any = localStorage.getItem('favorites');
  const favorites: any = storageFavorites ? JSON.parse(storageFavorites) : [];

  const fetchFavLocation = () => {
    console.log('test');
  };

  return (
    <div>
      <ul>
        {favorites.map((item: string) => (
          <li>
            <button type="button" value={item} onClick={fetchFavLocation}>
              {' '}
              {item}{' '}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
