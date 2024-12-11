import { useState } from 'react';
import { fetchBook } from '../../redux/slices/booksSlices';
import './BookForm.css';
import { useDispatch } from 'react-redux';
// import { addBook } from '../../redux/books/actionCreators';
import booksData from '../../data/books.json';
import createBookWithId from '../../utils/createBookWithId';
import { addBook } from '../../redux/slices/booksSlices';
import { setError } from '../../redux/slices/errorSlice';
import { FaSpinner } from 'react-icons/fa';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispatch action
      const book = createBookWithId({ title, author }, 'manual');

      dispatch(addBook(book));

      setAuthor('');
      setTitle('');
    } else {
      dispatch(setError('You must fill title and author!'));
    }
  };

  const addRandomBookHandler = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = createBookWithId(randomBook, 'random');

    dispatch(addBook(randomBookWithId));
  };

  const addRandomBookViaAPIHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook('http://localhost:4000/random-book-delay'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={addRandomBookHandler}>
          Add Random
        </button>
        <button
          type="button"
          onClick={addRandomBookViaAPIHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random by API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
