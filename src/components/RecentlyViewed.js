import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RecipeModal from './RecipeModal';

const RecentlyViewed = ({ onNotification }) => {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentRecipes(JSON.parse(stored));
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentRecipes([]);
    onNotification('History cleared', 'success');
  };

  const handleRemoveRecipe = (recipeUri) => {
    const updated = recentRecipes.filter(recipe => recipe.recipe.uri !== recipeUri);
    setRecentRecipes(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    onNotification('Recipe removed from history', 'success');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{
      borderRadius: '8px', 
      overflow: 'hidden',
      backgroundColor: '#f5f5f5',
      p: 2,
      mb: 4,
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          component={motion.h4}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{ fontWeight: 600 }}
        >
          Recently Viewed
        </Typography>
        {recentRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <IconButton
              onClick={handleClearHistory}
              color="error"
              sx={{ '&:hover': { transform: 'scale(1.1)' } }}
            >
              <DeleteIcon />
            </IconButton>
          </motion.div>
        )}
      </Box>

      <AnimatePresence mode="popLayout">
        {recentRecipes.length > 0 ? (
          <Grid container spacing={3}>
            {recentRecipes.map((item, index) => (
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                  }}
                >
                  <CardActionArea onClick={() => setSelectedRecipe(item)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.recipe.image}
                      alt={item.recipe.label}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        {item.recipe.label}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {item.recipe.totalTime > 0 && (
                          <Chip
                            icon={<AccessTimeIcon />}
                            label={`${item.recipe.totalTime} min`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        <Chip
                          icon={<RestaurantIcon />}
                          label={`${item.recipe.yield} servings`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          icon={<LocalDiningIcon />}
                          label={`${Math.round(item.recipe.calories)} cal`}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        Viewed: {formatTimestamp(item.viewedAt)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveRecipe(item.recipe.uri)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'error.light',
                        color: 'error.contrastText',
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Card>
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
              No recently viewed recipes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Recipes you view will appear here
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      {selectedRecipe && (
        <RecipeModal
          open={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
        />
      )}
    </Box>
  );
};

export default RecentlyViewed;
