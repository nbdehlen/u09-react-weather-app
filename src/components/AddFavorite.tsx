import React, { ReactNode, useState, useEffect } from 'react';
interface Props {
  location?: string;
}
export const AddFavorite: React.FC<Props> = ({ location }: Props) => {
  let [favorites, setFavorites] = useState((): any[] =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const favorite = favorites.includes(location);
  // const [favorite, setFavorite] = useState(false);
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
      // setFavorite(false);
    } else {
      newFavorites.push(location);
      // setFavorite(true);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };
  return (
    <div>
      <button type="button" onClick={toggleFavoriteBtn}>
        {favorite ? 'favorited' : 'not favorited'}
      </button>
    </div>
  );
};
