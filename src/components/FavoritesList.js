import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Recipe from './Recipe';
import { removeFromFavorites } from '../features/favorites/favoritesSlice';
import { fetchRecipes, selectLastSearch } from '../features/recipes/recipesSlice';

const FavoritesList = ({ onNotification }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const lastSearch = useSelector(selectLastSearch);

  const handleRemoveFromFavorites = (recipe) => {
    dispatch(removeFromFavorites(recipe));
    onNotification('Recipe removed from favorites', 'success');
    
    if (lastSearch.query) {
      dispatch(fetchRecipes(lastSearch));
    }
  };

  return (
    <Box sx={{
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      p: 2,
      mb: 4,
    }}>
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Favorite Recipes
      </Typography>

      <AnimatePresence mode="popLayout">
        {favorites.length > 0 ? (
          <Grid container spacing={3}>
            {favorites.map((item, index) => (
              <Grid
                item
                key={item.recipe.uri}
                xs={12}
                sm={6}
                md={4}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
              >
                <Recipe
                  recipe={item}
                  isFavorite={true}
                  onFavoriteClick={() => handleRemoveFromFavorites(item.recipe)}
                  onNotification={onNotification}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No favorite recipes yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add recipes to your favorites and they will appear here
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default FavoritesList;
