import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error;
    }
  }
);

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
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithId(action.payload, 'API'));
  //     }
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
});

export default booksSlice.reducer;

export const selectBooks = (state) => {
  return state.books;
};

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;

// export const thunkFunction = async (dispatch, getState) => {
//   // async action
//   try {
//     const res = await axios.get('http://localhost:4000/random-book');
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(createBookWithId(res.data, 'API')));
//     }
//   } catch (error) {
//     console.log('Error fetching random book', error);
//   }
// };
