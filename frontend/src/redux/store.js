import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books/reducer';
import filterReducer from './slices/filterSlice.js';
import booksReducer from './slices/booksSlices.js';

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
});

export default store;
