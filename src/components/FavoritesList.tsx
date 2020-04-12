import React, { useContext } from 'react';
import { FavoritesContext } from '../services/state';

interface Props {
  onClick: (event?: any) => void;
}
export const FavoritesList: React.FC<Props> = ({ onClick }: Props) => {
  const [favorites] = useContext(FavoritesContext);
  return (
    <div>
      <ul>
        {favorites.map((location: string) => (
          <li key={location}>
            <button type="button" value={location} onClick={onClick}>
              {location}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
