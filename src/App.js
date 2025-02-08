import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Fab,
  useScrollTrigger,
  Zoom,
  Snackbar,
  Alert,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ThemeProvider,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  RestaurantMenu as RecipesIcon,
  Favorite as FavoriteIcon,
  Category as CategoryIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import Categories from './components/Categories';
import RecentlyViewed from './components/RecentlyViewed';
import LoadingSkeletons from './components/LoadingSkeletons';
import { lightTheme, darkTheme } from './theme';
import { selectLastSearch, fetchRecipes } from './features/recipes/recipesSlice';

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function App() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(() => localStorage.getItem('themeMode') || 'light');
  const [currentView, setCurrentView] = useState('recipes');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const recipesStatus = useSelector((state) => state.recipes.status);
  const lastSearch = useSelector(selectLastSearch);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleViewChange = (newView) => {
    setCurrentView(newView);
    
    if (newView === 'recipes' && lastSearch.query) {
      dispatch(fetchRecipes(lastSearch));
    }
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar>
            <Typography
              variant="h6"
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => handleViewChange('recipes')}
            >
              Recipe Explorer
            </Typography>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, flex: 1 }}>
          <AnimatePresence mode="wait">
            {currentView === 'recipes' && (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <SearchBar onNotification={showNotification} />
                {recipesStatus === 'loading' ? (
                  <LoadingSkeletons />
                ) : (
                  <RecipeList onNotification={showNotification} />
                )}
              </motion.div>
            )}

            {currentView === 'favorites' && (
              <motion.div
                key="favorites"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <FavoritesList onNotification={showNotification} />
              </motion.div>
            )}

            {currentView === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Categories onNotification={showNotification} />
              </motion.div>
            )}

            {currentView === 'recent' && (
              <motion.div
                key="recent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <RecentlyViewed onNotification={showNotification} />
              </motion.div>
            )}
          </AnimatePresence>
        </Container>

        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            borderTop: 1,
            borderColor: 'divider'
          }}
          elevation={3}
        >
          <BottomNavigation
            value={currentView}
            onChange={(_, newValue) => handleViewChange(newValue)}
            showLabels
          >
            <BottomNavigationAction
              label="Recipes"
              value="recipes"
              icon={<RecipesIcon />}
            />
            <BottomNavigationAction
              label="Categories"
              value="categories"
              icon={<CategoryIcon />}
            />
            <BottomNavigationAction
              label="Favorites"
              value="favorites"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
              label="Recent"
              value="recent"
              icon={<HistoryIcon />}
            />
          </BottomNavigation>
        </Paper>

        <ScrollTop>
          <Fab 
            color="secondary" 
            size="small" 
            aria-label="scroll back to top"
            sx={{ 
              position: 'fixed',
              bottom: 80,
              right: 16,
              zIndex: 999
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
