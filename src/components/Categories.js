import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRecipes } from '../features/recipes/recipesSlice';

const categories = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
    description: 'Start your day right',
    query: 'breakfast',
    mealType: 'breakfast'
  },
  {
    id: 'quick-meals',
    name: 'Quick Meals',
    image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98',
    description: 'Ready in 30 minutes or less',
    query: 'quick easy',
    time: 30
  },
  {
    id: 'healthy',
    name: 'Healthy',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    description: 'Nutritious and delicious',
    query: 'healthy',
    diet: 'balanced'
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    description: 'Plant-based goodness',
    query: 'vegetarian',
    diet: 'vegetarian'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    description: 'Sweet treats',
    query: 'dessert',
    dishType: 'dessert'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    description: 'Mediterranean cuisine',
    query: 'mediterranean',
    cuisineType: 'mediterranean'
  },
  {
    id: 'asian',
    name: 'Asian',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
    description: 'Asian flavors',
    query: 'asian',
    cuisineType: 'asian'
  },
  {
    id: 'italian',
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b',
    description: 'Italian classics',
    query: 'italian',
    cuisineType: 'italian'
  },
  {
    id: 'mexican',
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f',
    description: 'Mexican favorites',
    query: 'mexican',
    cuisineType: 'mexican'
  },
  {
    id: 'low-carb',
    name: 'Low Carb',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
    description: 'Low carb options',
    query: 'low carb',
    diet: 'low-carb'
  },
  {
    id: 'gluten-free',
    name: 'Gluten Free',
    image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94',
    description: 'Gluten-free recipes',
    query: 'gluten free',
    health: 'gluten-free'
  },
  {
    id: 'dinner',
    name: 'Dinner',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
    description: 'Dinner ideas',
    query: 'dinner',
    mealType: 'dinner'
  }
];

const CategoryCard = ({ category, onSelect }) => {
  return (
    <Card
      component={motion.div}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
      }}
      whileTap={{ scale: 0.98 }}
      sx={{
        borderRadius: '8px', // Add border radius to category cards
        overflow: 'hidden',
        boxShadow: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea 
        onClick={onSelect}
        sx={{ height: '100%' }}
      >
        <CardMedia
          component="img"
          height="140"
          image={category.image}
          alt={category.name}
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
            }
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const Categories = ({ onNotification }) => {
  const dispatch = useDispatch();

  const handleCategorySelect = (category) => {
    dispatch(fetchRecipes({
      query: category.query,
      mealType: category.mealType,
      cuisineType: category.cuisineType,
      diet: category.diet,
      health: category.health,
    }));
    onNotification(`Showing ${category.name} recipes`);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 4, fontWeight: 600 }}
      >
        Recipe Categories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid
            item
            key={category.id}
            xs={12}
            sm={6}
            md={4}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categories.indexOf(category) * 0.1 }}
          >
            <CategoryCard
              category={category}
              onSelect={() => handleCategorySelect(category)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
