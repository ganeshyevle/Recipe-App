import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box, Card } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Recipe from './Recipe';
import { selectRecipes, selectRecipesStatus, selectLastSearch } from '../features/recipes/recipesSlice';

const RecipeList = ({ onNotification }) => {
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const lastSearch = useSelector(selectLastSearch);
  
  const filteredRecipes = recipes.filter(recipe => {
    const { mealType, cuisineType, diet } = lastSearch;
    
    if (!mealType && !cuisineType && !diet) return true;
    
    const matchMealType = !mealType || (recipe.recipe.mealType && 
      recipe.recipe.mealType.some(type => type.toLowerCase() === mealType.toLowerCase()));
    
    const matchCuisineType = !cuisineType || (recipe.recipe.cuisineType && 
      recipe.recipe.cuisineType.some(type => type.toLowerCase() === cuisineType.toLowerCase()));
    
    const matchDiet = !diet || (recipe.recipe.dietLabels && 
      recipe.recipe.dietLabels.some(label => label.toLowerCase() === diet.toLowerCase()));
    
    return matchMealType && matchCuisineType && matchDiet;
  });

  if (status === 'loading') {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Loading recipes...</Typography>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">Failed to load recipes. Please try again.</Typography>
      </Box>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
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
          No recipes found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search or filters
        </Typography>
      </Box>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe, index) => (
          <Grid
            item
            key={recipe.recipe.uri}
            xs={12}
            sm={6}
            md={4}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              sx={{
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: 2,
              }}
            >
              <Recipe
                recipe={recipe}
                onNotification={onNotification}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </AnimatePresence>
  );
};

export default RecipeList;
