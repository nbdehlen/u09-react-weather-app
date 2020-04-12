import React, { useContext } from 'react';
import { FavoritesContext } from '../services/state';
import { Card } from './Card';

interface Props {
  onClick: (event?: any) => void;
}
export const FavoritesList: React.FC<Props> = ({ onClick }: Props) => {
  const [favorites] = useContext(FavoritesContext);
  return (
    <>
      <Card title="Favorite locations" titleSmall>
        <ul>
          {favorites.map((location: string) => (
            <li className="hover:text-white" key={location}>
              <button type="button" value={location} onClick={onClick}>
                {location}
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};
