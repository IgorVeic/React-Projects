import { createContext, useState, ReactNode, useEffect } from "react";
import { Country } from "../common/types/country.interface";

export interface FavoriteContextProps {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (country: Country) => void;
  clearFavorites: () => void;
}

export const FavoriteContext = createContext<FavoriteContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  clearFavorites: () => {},
});

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Country[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country: Country) => {
    setFavorites((prevFavorites) => [...prevFavorites, country]);
  };

  const removeFavorite = (country: Country) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.name.common !== country.name.common)
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
