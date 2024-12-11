import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';

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

export const thunkFunction = async (dispatch, getState) => {
  // async action
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithId(res.data, 'API')));
    }
  } catch (error) {
    console.log('Error fetching random book', error);
  }
};
