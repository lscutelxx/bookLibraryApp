import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavourite: (state, action) => {
      state.map((book) => {
        book.id === action.payload
          ? { ...book, isFavourite: !book.isFavourite }
          : book;
      });
    },
  },
});

export default booksSlice.reducer;

export const selectBooks = (state) => {
  return state.books;
};

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;
