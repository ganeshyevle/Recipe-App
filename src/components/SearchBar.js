import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchRecipes, selectLastSearch } from '../features/recipes/recipesSlice';

const SearchBar = ({ onNotification }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const lastSearch = useSelector(selectLastSearch);

  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [mealType, setMealType] = useState('');
  const [diet, setDiet] = useState('');

  useEffect(() => {
    if (lastSearch) {
      setSearchQuery(lastSearch.query || '');
      setCuisineType(lastSearch.cuisineType || '');
      setMealType(lastSearch.mealType || '');
      setDiet(lastSearch.diet || '');
    }
  }, [lastSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchRecipes({
        query: searchQuery,
        cuisineType,
        mealType,
        diet,
      }));
      if (onNotification) {
        onNotification('Searching for recipes...', 'info');
      }
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCuisineType('');
    setMealType('');
    setDiet('');
  
    dispatch(fetchRecipes({
      query: '',
      cuisineType: '',
      mealType: '',
      diet: '',
    }));
    if (onNotification) {
      onNotification('Filters cleared', 'success');
    }
  };

  const cuisineTypes = [
    'American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese',
    'Eastern Europe', 'French', 'Indian', 'Italian', 'Japanese', 'Korean',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'Thai'
  ];

  const mealTypes = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Teatime'
  ];

  const dietTypes = [
    'Balanced', 'High-Fiber', 'High-Protein', 'Low-Carb', 'Low-Fat', 'Low-Sodium'
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        width: '100%',
        mb: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          p: 2,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', flex: 1, gap: 1 }}>
          <InputBase
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            sx={{ flex: 1, fontSize: '1rem' }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            flex: isMobile ? 1 : 2,
          }}
        >
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Cuisine Type</InputLabel>
            <Select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              label="Cuisine Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {cuisineTypes.map((type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Meal Type</InputLabel>
            <Select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              label="Meal Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {mealTypes.map((type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Diet</InputLabel>
            <Select
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              label="Diet"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {dietTypes.map((type) => (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            sx={{ 
              minWidth: isMobile ? '100%' : 'auto',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                borderColor: theme.palette.error.main,
              },
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchBar;
