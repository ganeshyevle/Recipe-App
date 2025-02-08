import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import RecipeModal from './RecipeModal';

const Recipe = ({ recipe, onNotification }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(
    (fav) => fav.recipe.uri === recipe.recipe.uri
  );

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(recipe));
      onNotification('Recipe removed from favorites', 'info');
    } else {
      dispatch(addToFavorites(recipe));
      onNotification('Recipe added to favorites', 'success');
    }
  };

  return (
    <>
      <Card
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <CardActionArea onClick={() => setModalOpen(true)}>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <CardMedia
              component="img"
              image={recipe.recipe.image}
              alt={recipe.recipe.label}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              size="small"
            >
              {isFavorite ? (
                <Favorite color="error" />
              ) : (
                <FavoriteBorder color="error" />
              )}
            </IconButton>
          </Box>

          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.2,
                minHeight: '2.4em',
              }}
            >
              {recipe.recipe.label}
            </Typography>

            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {recipe.recipe.dietLabels?.map((label) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
              {recipe.recipe.cuisineType?.map((cuisine) => (
                <Chip
                  key={cuisine}
                  label={cuisine}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <RecipeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        recipe={recipe}
        isFavorite={isFavorite}
        dispatch={dispatch}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        onFavoriteClick={handleFavoriteClick}
      />
    </>
  );
};

export default Recipe;
