import React from 'react';
import {
  Dialog,
  IconButton,
  Typography,
  Box,
  Chip,
  Grid,
  Link,
} from '@mui/material';  // Removed Button import
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Favorite,
  FavoriteBorder,
  Share as ShareIcon,
} from '@mui/icons-material';

const RecipeModal = ({ open, onClose, recipe, isFavorite, onFavoriteClick, dispatch, addToFavorites, removeFromFavorites }) => {
 
  if (!recipe || !recipe.recipe) {
    return null;
  }

  const {
    label = '',
    image = '',
    source = '',
    url = '',
    ingredientLines = [],
    totalTime = 0,
    yield: servings = 0,
    cuisineType = [],
    mealType = [],
    dietLabels = [],
    healthLabels = [],
    cautions = [],
  } = recipe.recipe;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 0,
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#fff',
        },
      }}
    >
      <Box sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1, display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: label,
                url: window.location.href,
              })
              .then(() => console.log('Share successful'))
              .catch((error) => console.error('Error sharing:', error));
            } else {
              alert('Sharing is not supported in this browser.');
            }
          }}
          sx={{
            color: 'black',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={() => {
           
            if (isFavorite) {
              dispatch(removeFromFavorites(recipe));
              console.log('Recipe removed from favorites');
            } else {
              dispatch(addToFavorites(recipe));
              console.log('Recipe added to favorites');
            }
          }}
          sx={{
            color: 'black',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'black',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ position: 'relative', bgcolor: '#f5f5f5', p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={image}
              alt={label}
              sx={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '8px', 
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" component="h2" gutterBottom>
              {label}
            </Typography>
            <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Ingredients
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {ingredientLines.map((ingredient, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ mb: 1 }}
                  >
                    {ingredient}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Source
              </Typography>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{
                  display: 'inline-block',
                  mt: 0.5,
                  '&:hover': {
                    textDecoration: 'none',
                    opacity: 0.8,
                  }
                }}
              >
                {source}
              </Link>
            </Box>
            {totalTime > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cooking Time
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {totalTime} min
                </Typography>
              </Box>
            )}
            {servings > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Servings
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {servings} servings
                </Typography>
              </Box>
            )}
            {dietLabels.length > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Diet Labels
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {dietLabels.map((label) => (
                    <Chip key={label} label={label} size="small" />
                  ))}
                </Box>
              </Box>
            )}
            {cuisineType.length > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cuisine Type
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {cuisineType.map((type) => (
                    <Chip key={type} label={type} size="small" />
                  ))}
                </Box>
              </Box>
            )}
            {mealType.length > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Meal Type
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {mealType.map((type) => (
                    <Chip key={type} label={type} size="small" />
                  ))}
                </Box>
              </Box>
            )}
            {healthLabels.length > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Health Labels
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {healthLabels.map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
            {cautions.length > 0 && (
              <Box sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f5f5f5', p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Cautions
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                  {cautions.map((caution) => (
                    <Chip
                      key={caution}
                      label={caution}
                      size="small"
                      color="error"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default RecipeModal;
