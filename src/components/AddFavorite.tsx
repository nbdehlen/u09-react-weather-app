import React, {
  ReactNode, useState, useEffect, useContext,
} from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { FavoritesContext } from '../services/state';

interface Props {
  location?: string;
}
export const AddFavorite: React.FC<Props> = ({ location }: Props) => {
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const favorite = favorites.includes(location);

  useEffect(() => {
    const funct = () => {
      setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    };
    window.addEventListener('storage', funct);
    return () => {
      window.removeEventListener('storage', funct);
    };
  }, []);
  const toggleFavoriteBtn = () => {
    const index: number = favorites.indexOf(location);
    const newFavorites = favorites.slice();
    if (index > -1) {
      newFavorites.splice(index, 1);
    } else {
      newFavorites.push(location);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  return (
    <button type="button" onClick={toggleFavoriteBtn}>
      {favorite ? <MdStar /> : <MdStarBorder />}
    </button>
  );
};
