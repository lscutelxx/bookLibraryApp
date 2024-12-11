import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavourite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
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
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithId(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export default booksSlice.reducer;

export const selectBooks = (state) => {
  return state.books.books;
};

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

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
