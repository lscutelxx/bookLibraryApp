import * as actionTypes from './actionTypes';

export const addBook = (newBook) => {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};

export const deleteBook = (id) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  };
};

export const toggleFavourite = (id) => {
  return {
    type: actionTypes.TOGGLE_FAVOURITE,
    payload: id,
  };
};
