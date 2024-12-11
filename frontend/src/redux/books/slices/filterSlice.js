import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavourite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
    setFilterAuthor: (state, action) => {
      state.author = action.payload;
    },
    setOnlyFavouriteFilter: (state) => {
      state.onlyFavourite = !state.onlyFavourite;
    },
  },
});

export const {
  setTitleFilter,
  resetFilters,
  setFilterAuthor,
  setOnlyFavouriteFilter,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavouriteFilter = (state) => state.filter.onlyFavourite;

export default filterSlice.reducer;

console.log(filterSlice.actions);
console.log(filterSlice.reducer);
