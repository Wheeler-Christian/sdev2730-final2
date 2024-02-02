import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteProjectIds, setFavoriteProjectIds] = useState([]);

  function addFavorite(id) {
    setFavoriteProjectIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id) {
    setFavoriteProjectIds((currentFavIds) =>
      currentFavIds.filter((projectId) => projectId !== id)
    );
  }

  const value = {
    ids: favoriteProjectIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
