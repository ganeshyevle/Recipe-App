import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const APP_ID = '900da95e';
const APP_KEY = '40698503668e0bb3897581f4766d77f9';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async ({ query, cuisineType, mealType, diet }, { rejectWithValue, getState }) => {
    try {
    
      if (!query && !cuisineType && !mealType && !diet) {
        return [];
      }

      let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }
      if (cuisineType) {
        url += `&cuisineType=${encodeURIComponent(cuisineType)}`;
      }
      if (mealType) {
        url += `&mealType=${encodeURIComponent(mealType)}`;
      }
      if (diet) {
        url += `&diet=${encodeURIComponent(diet)}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      return {
        hits: data.hits,
        searchParams: { query, cuisineType, mealType, diet }
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    lastSearch: {
      query: '',
      cuisineType: '',
      mealType: '',
      diet: '',
    },
  },
  reducers: {
    clearRecipes: (state) => {
      state.items = [];
      state.lastSearch = {
        query: '',
        cuisineType: '',
        mealType: '',
        diet: '',
      };
      state.status = 'idle';
      state.error = null;
    },
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (Array.isArray(action.payload)) {
          state.items = [];
          state.lastSearch = {
            query: '',
            cuisineType: '',
            mealType: '',
            diet: '',
          };
        } else {
          state.items = action.payload.hits;
          state.lastSearch = action.payload.searchParams;
        }
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch recipes';
      
      });
  },
});

export const { clearRecipes, setLastSearch } = recipesSlice.actions;
export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectLastSearch = (state) => state.recipes.lastSearch;

export default recipesSlice.reducer;
