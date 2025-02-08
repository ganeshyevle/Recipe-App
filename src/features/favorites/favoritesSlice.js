import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      const recipe = action.payload;
      if (!state.items.some(item => item.recipe.uri === recipe.recipe.uri)) {
        state.items.push(recipe);
        try {
          localStorage.setItem('favorites', JSON.stringify(state.items));
        } catch (error) {
          console.error('Error saving favorites:', error);
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const recipeToRemove = action.payload;
    
      const recipeUri = recipeToRemove.recipe ? recipeToRemove.recipe.uri : recipeToRemove.uri;
      state.items = state.items.filter(item => item.recipe.uri !== recipeUri);
  
      try {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
